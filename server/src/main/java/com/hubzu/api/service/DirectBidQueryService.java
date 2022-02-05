package com.hubzu.api.service;

import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.model.buyer.DirectBid;

import java.util.List;

public interface DirectBidQueryService {
    List<RealEstateBidDTO> getBidsOfRealEstate(String realEstateCode);

    DirectBid checkAndGetDirectBid(Long directBidId);
}
