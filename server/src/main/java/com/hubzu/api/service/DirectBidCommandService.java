package com.hubzu.api.service;

import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.request.bid.CreateBidDTO;

public interface DirectBidCommandService {

    void createDirectBid(BuyerDTO buyerDTO, CreateBidDTO createBidDTO, String description);
}
