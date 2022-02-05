package com.hubzu.api.service.impl;

import com.hubzu.api.dto.bid.AutoBidDTO;
import com.hubzu.api.dto.bid.BidDTO;
import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.model.buyer.BuyerAutoBid;
import com.hubzu.api.repository.buyer.BidRepository;
import com.hubzu.api.repository.buyer.BuyerAutoBidRepository;
import com.hubzu.api.service.BidQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BidQueryServiceImpl implements BidQueryService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private BuyerAutoBidRepository buyerAutoBidRepository;

    @Override
    public List<BidDTO> getBids(Long buyerId) {
        return this.bidRepository.findAllByBuyerIdOrderByIdDesc(buyerId).stream().map(BidDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<RealEstateBidDTO> getBidsOfRealEstate(String realEstateCode) {
        return this.bidRepository.findAllByRealEstateCodeOrderByIdDesc(realEstateCode).stream().map(RealEstateBidDTO::new).collect(Collectors.toList());
    }

    @Override
    public Bid getBid(Long bidId) {
        return this.bidRepository.findById(bidId).orElse(null);
    }

    @Override
    public List<AutoBidDTO> getAutoBids(Long buyerId) {
        return this.buyerAutoBidRepository.findAllByBuyerIdOrderByIdDesc(buyerId).stream().map(AutoBidDTO::new).collect(Collectors.toList());
    }

    @Override
    public BuyerAutoBid checkAndGetAutoBid(Long buyerId, String realEstateCode) {
        return this.buyerAutoBidRepository.findByBuyerIdAndRealEstateCode(buyerId, realEstateCode).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_AUTO_BID_NOT_FOUND));
    }

    @Override
    public AutoBidDTO getAutoBid(Long buyerId, String realEstateCode) {
        BuyerAutoBid buyerAutoBid = this.checkAndGetAutoBid(buyerId, realEstateCode);
        return new AutoBidDTO(buyerAutoBid);
    }
}
