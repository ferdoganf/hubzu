package com.hubzu.api.service.impl;

import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.request.bid.CreateBidDTO;
import com.hubzu.api.model.buyer.DirectBid;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.repository.buyer.DirectBidRepository;
import com.hubzu.api.service.DirectBidCommandService;
import com.hubzu.api.service.RealEstateQueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DirectBidCommandServiceImpl implements DirectBidCommandService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DirectBidCommandServiceImpl.class);

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private DirectBidRepository directBidRepository;


    @Override
    public void createDirectBid(BuyerDTO buyerDTO, CreateBidDTO createBidDTO, String description) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(createBidDTO.getRealestateCode());

        DirectBid directBid = new DirectBid();
        directBid.setRealEstate(realEstate);

        directBid.setName(buyerDTO.getName());
        directBid.setSurname(buyerDTO.getSurname());
        directBid.setIdentityNumber(buyerDTO.getIdentityNumber());
        directBid.setEmailAddress(buyerDTO.getEmailAddress());
        directBid.setPhoneCountryCode(buyerDTO.getPhoneCountryCode());
        directBid.setPhone(buyerDTO.getPhone());

        directBid.setBidAmount(createBidDTO.getBidAmount());
        directBid.setDescription(description);

        this.directBidRepository.save(directBid);
    }
}
