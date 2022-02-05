package com.hubzu.api.service;

import com.hubzu.api.dto.bid.AutoBidDTO;
import com.hubzu.api.dto.bid.BidDTO;
import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.model.buyer.BuyerAutoBid;

import java.util.List;

public interface BidQueryService {
    List<BidDTO> getBids(Long buyerId);

    List<RealEstateBidDTO> getBidsOfRealEstate(String realEstateCode);

    Bid getBid(Long bidId);

    List<AutoBidDTO> getAutoBids(Long buyerId);

    BuyerAutoBid checkAndGetAutoBid(Long buyerId, String realEstateCode);

    AutoBidDTO getAutoBid(Long buyerId, String realEstateCode);
}
