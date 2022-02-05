package com.hubzu.api.service;

import com.hubzu.api.dto.request.bid.CreateAutoBidDTO;
import com.hubzu.api.dto.request.bid.CreateBidDTO;

public interface BidCommandService {

    void createBid(Long buyerId, CreateBidDTO createBidDTO);

    void createAutoBid(Long buyerCode, CreateAutoBidDTO createAutoBidDTO);

    void updateAutoBid(Long buyerCode, CreateAutoBidDTO createAutoBidDTO);

    void deleteAutoBid(Long userId, String realEstateCode);

    void createInAdvanceBid(Long buyerId, CreateBidDTO createBidDTO);
}
