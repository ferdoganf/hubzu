package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.bid.CreateAutoBidDTO;
import com.hubzu.api.dto.request.bid.CreateBidDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.buyer.BuyerAutoBid;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.repository.buyer.BidRepository;
import com.hubzu.api.repository.buyer.BuyerAutoBidRepository;
import com.hubzu.api.repository.realestate.RealEstateRepository;
import com.hubzu.api.service.*;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class BidCommandServiceImpl implements BidCommandService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BidCommandServiceImpl.class);

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private BuyerQueryService buyerQueryService;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private RealEstateRepository realEstateRepository;

    @Autowired
    private BidQueryService bidQueryService;

    @Autowired
    private MailCommandService mailCommandService;

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Autowired
    private BuyerAutoBidRepository buyerAutoBidRepository;

    @Autowired
    private RealEstateCommandService realEstateCommandService;

    @Autowired
    private CalendarQueryService calendarQueryService;

    @Override
    public void createBid(Long buyerId, CreateBidDTO createBidDTO) {
        synchronized (("bid" + createBidDTO.getRealestateCode()).intern()) {
            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(createBidDTO.getRealestateCode());
            Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerId);
            if (!BusinessConstants.UserStatus.ACTIVE.equals(buyer.getUserStatus().getCode())) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_USER_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
                if (realEstate.getEndDate().isBefore(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC))) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_AUCTION_END_DATE_NOT_APPROPRIATE_FOR_BID);
                }
            }

            this.checkBuyerWarrantForRealEstate(realEstate, buyer);

            if (createBidDTO.getBidAmount().compareTo(realEstate.getStartingAmount()) < 0) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT);
            }

            if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
                if (createBidDTO.getBidAmount().compareTo(realEstate.getCurrentBid().getBidAmount()) < 0) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT_BIG);
                }
                if (createBidDTO.getBidAmount().compareTo(realEstate.getCurrentBid().getBidAmount()) == 0) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT_EQUAL);
                }
            }

            BigDecimal diff = createBidDTO.getBidAmount().subtract(realEstate.getStartingAmount());
            if (diff.remainder(realEstate.getBidStep()).compareTo(BigDecimal.ZERO) > 0) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_STEP_INVALID);
            }

            boolean firstBid = false;
            if (BusinessConstants.RealEstateStatus.ACTIVE.equals(realEstate.getRealEstateStatus().getCode())) {
                firstBid = true;
            }

            List<Long> oldBidders = new ArrayList<>();

            Long oldBidder = ((realEstate.getCurrentBid() != null) && (realEstate.getCurrentBid().getBuyer() != null) && (!realEstate.getCurrentBid().getBuyer().getCode().equalsIgnoreCase(buyer.getCode()))) ? realEstate.getCurrentBid().getBuyer().getId() : null;
            realEstate = this.setBid(realEstate, buyer, createBidDTO.getBidAmount());
            if (oldBidder != null) {
                oldBidders.add(oldBidder);
            }

            BuyerAutoBid buyerAutoBid = this.buyerAutoBidRepository.findTopByRealEstateCodeAndBuyerCodeNotAndUpperLimitGreaterThanEqualOrderByCreatedDateAsc(realEstate.getCode(), realEstate.getCurrentBid().getBuyer().getCode(), realEstate.getCurrentBid().getBidAmount().add(realEstate.getBidStep()));
            if (buyerAutoBid != null) {
                while (buyerAutoBid != null) {
                    if (realEstate.getCurrentBid() != null && (!realEstate.getCurrentBid().getBuyer().getCode().equalsIgnoreCase(buyer.getCode()))) {
                        oldBidders.add(realEstate.getCurrentBid().getId());
                    }
                    realEstate = this.setBid(realEstate, buyerAutoBid.getBuyer(), realEstate.getCurrentBid().getBidAmount().add(realEstate.getBidStep()));
                    buyerAutoBid = this.buyerAutoBidRepository.findTopByRealEstateCodeAndBuyerCodeNotAndUpperLimitGreaterThanEqualOrderByCreatedDateAsc(realEstate.getCode(), realEstate.getCurrentBid().getBuyer().getCode(), realEstate.getCurrentBid().getBidAmount().add(realEstate.getBidStep()));
                }
            }

            for (Long oldBidId : oldBidders) {
                this.mailCommandAsyncService.sendNotificationToOldBidder(oldBidId);
            }

            if (firstBid) {
                this.mailCommandAsyncService.sendNotificationToFavoriteOwners(buyer.getCode(), realEstate.getCode());
                this.mailCommandAsyncService.sendNotificationToAdmins(buyer.getCode(), realEstate.getCode());
            }
        }
    }


    private RealEstate setBid(RealEstate realEstate, Buyer buyer, BigDecimal amount) {

        Bid bid = new Bid();
        bid.setBidAmount(amount);
        bid.setRealEstate(realEstate);
        bid.setBuyer(buyer);
        bid = this.bidRepository.save(bid);
        realEstate.setCurrentBid(bid);
        realEstate.getBids().add(bid);

        if (BusinessConstants.RealEstateStatus.ACTIVE.equals(realEstate.getRealEstateStatus().getCode())) {
            realEstate.setRealEstateStatus(this.realEstateQueryService.checkAndGetRealEstateStatus(BusinessConstants.RealEstateStatus.STARTED.name()));
            LocalDateTime now = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);
            realEstate.setStartDate(now);
            realEstate.setEndDate(this.calendarQueryService.nextBusinessDate(now.plusHours(realEstate.getAuctionPeriod())));
        } else if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
            LocalDateTime nowPlus30Minutes = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC).plusMinutes(30);
            if (realEstate.getEndDate().isBefore(nowPlus30Minutes)) {
                realEstate.setEndDate(nowPlus30Minutes);
            }
        }

        realEstate = this.realEstateRepository.save(realEstate);
        return realEstate;
    }

    private void checkBuyerWarrantForRealEstate(RealEstate realEstate, Buyer buyer) {
        if (!this.buyerQueryService.buyerHasWarrantForRealestate(buyer.getCode(), realEstate.getCode())) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_USER_HAS_NO_WARRANT_FOR_REAL_ESTATE);
        }
    }

    @Override
    public void createAutoBid(Long buyerId, CreateAutoBidDTO createAutoBidDTO) {
        synchronized (("bid" + createAutoBidDTO.getRealestateCode()).intern()) {
            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(createAutoBidDTO.getRealestateCode());
            Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerId);
            if (!BusinessConstants.UserStatus.ACTIVE.equals(buyer.getUserStatus().getCode())) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_USER_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            this.checkBuyerWarrantForRealEstate(realEstate, buyer);

            if (createAutoBidDTO.getUpperLimit().compareTo(realEstate.getStartingAmount()) < 0) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT);
            }

            if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
                if (createAutoBidDTO.getUpperLimit().compareTo(realEstate.getCurrentBid().getBidAmount()) < 0) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT_BIG);
                }
                if (createAutoBidDTO.getUpperLimit().compareTo(realEstate.getCurrentBid().getBidAmount()) == 0) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT_EQUAL);
                }
            }

            BuyerAutoBid buyerAutoBidCheck = this.buyerAutoBidRepository.findOneByBuyerIdAndRealEstateId(buyer.getId(), realEstate.getId()).orElse(null);
            if (buyerAutoBidCheck != null) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_BUYER_HAS_ALREADY_AUTO_BID_FOR_THIS_REALESTATE);
            }

            BuyerAutoBid buyerAutoBid = new BuyerAutoBid();
            buyerAutoBid.setRealEstate(realEstate);
            buyerAutoBid.setBuyer(buyer);
            buyerAutoBid.setUpperLimit(createAutoBidDTO.getUpperLimit());
            this.buyerAutoBidRepository.save(buyerAutoBid);


            if (realEstate.getCurrentBid() == null) {
                CreateBidDTO createBidDTO = new CreateBidDTO();
                createBidDTO.setRealestateCode(realEstate.getCode());
                createBidDTO.setBidAmount(realEstate.getStartingAmount());
                this.createBid(buyer.getId(), createBidDTO);
            } else if (realEstate.getCurrentBid().getBuyer() != null &&
                    (!realEstate.getCurrentBid().getBuyer().getCode().equalsIgnoreCase(buyer.getCode())) &&
                    createAutoBidDTO.getUpperLimit().compareTo(realEstate.getCurrentBid().getBidAmount()) > 0) {
                CreateBidDTO createBidDTO = new CreateBidDTO();
                createBidDTO.setRealestateCode(realEstate.getCode());
                createBidDTO.setBidAmount(realEstate.getCurrentBid().getBidAmount().add(realEstate.getBidStep()));
                this.createBid(buyer.getId(), createBidDTO);
            }

        }
    }

    @Override
    public void updateAutoBid(Long buyerId, CreateAutoBidDTO createAutoBidDTO) {
        synchronized (("bid" + createAutoBidDTO.getRealestateCode()).intern()) {
            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(createAutoBidDTO.getRealestateCode());
            Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerId);
            if (!BusinessConstants.UserStatus.ACTIVE.equals(buyer.getUserStatus().getCode())) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_USER_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            this.checkBuyerWarrantForRealEstate(realEstate, buyer);

            if (createAutoBidDTO.getUpperLimit().compareTo(realEstate.getStartingAmount()) < 0) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT);
            }

            if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
                if (createAutoBidDTO.getUpperLimit().compareTo(realEstate.getCurrentBid().getBidAmount()) < 0) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT_BIG);
                }
                if (createAutoBidDTO.getUpperLimit().compareTo(realEstate.getCurrentBid().getBidAmount()) == 0) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_BID_AMOUNT_SUFFICIENT_EQUAL);
                }
            }

            BuyerAutoBid buyerAutoBid = this.bidQueryService.checkAndGetAutoBid(buyer.getId(), realEstate.getCode());
            buyerAutoBid.setUpperLimit(createAutoBidDTO.getUpperLimit());
            this.buyerAutoBidRepository.save(buyerAutoBid);

            if (realEstate.getCurrentBid() == null) {
                CreateBidDTO createBidDTO = new CreateBidDTO();
                createBidDTO.setRealestateCode(realEstate.getCode());
                createBidDTO.setBidAmount(realEstate.getStartingAmount());
                this.createBid(buyer.getId(), createBidDTO);
            } else if (realEstate.getCurrentBid().getBuyer() != null &&
                    (!realEstate.getCurrentBid().getBuyer().getCode().equalsIgnoreCase(buyer.getCode())) &&
                    createAutoBidDTO.getUpperLimit().compareTo(realEstate.getCurrentBid().getBidAmount()) > 0) {
                CreateBidDTO createBidDTO = new CreateBidDTO();
                createBidDTO.setRealestateCode(realEstate.getCode());
                createBidDTO.setBidAmount(realEstate.getCurrentBid().getBidAmount().add(realEstate.getBidStep()));
                this.createBid(buyer.getId(), createBidDTO);
            }
        }
    }

    @Override
    public void deleteAutoBid(Long buyerId, String realEstateCode) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerId);
        BuyerAutoBid buyerAutoBid = this.bidQueryService.checkAndGetAutoBid(buyer.getId(), realEstate.getCode());
        buyerAutoBid.delete();
        this.buyerAutoBidRepository.save(buyerAutoBid);
    }

    @Override
    public void createInAdvanceBid(Long buyerId, CreateBidDTO createBidDTO) {
        synchronized (("bid" + createBidDTO.getRealestateCode()).intern()) {
            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(createBidDTO.getRealestateCode());
            Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerId);
            if (!BusinessConstants.UserStatus.ACTIVE.equals(buyer.getUserStatus().getCode())) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_USER_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            this.checkBuyerWarrantForRealEstate(realEstate, buyer);

            if (!BusinessConstants.RealEstateStatus.ACTIVE.equals(realEstate.getRealEstateStatus().getCode())) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            if (realEstate.getCurrentBid() != null) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            if (!realEstate.isInAdvance()) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }
            if (realEstate.getInAdvanceAmount() == null || realEstate.getInAdvanceAmount().compareTo(BigDecimal.ZERO) <= 0) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_IS_NOT_APPROPRIATE_FOR_BID);
            }

            createBidDTO.setBidAmount(realEstate.getInAdvanceAmount());
            this.createBid(buyer.getId(), createBidDTO);

            realEstate = this.realEstateQueryService.checkAndGetRealEstate(createBidDTO.getRealestateCode());
            LocalDateTime now = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);
            realEstate.setEndDate(now);
            realEstate = this.realEstateRepository.save(realEstate);

            this.realEstateCommandService.completeRealEstate(realEstate.getCode());
        }
    }
}
