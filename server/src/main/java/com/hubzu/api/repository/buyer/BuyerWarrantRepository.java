package com.hubzu.api.repository.buyer;

import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.buyer.BuyerWarrant;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyerWarrantRepository extends BaseRepository<BuyerWarrant, Long> {
    BuyerWarrant findOneByBuyerAndRealEstate(Buyer buyer, RealEstate realEstate);

    long countByRealEstateCode(String realEstateCode);

    List<BuyerWarrant> findAllByRealEstateCode(String realEstateCode);

    BuyerWarrant findOneByBuyerCodeAndRealEstateCode(String buyerCode, String realEstateCode);

    List<BuyerWarrant> findAllByBuyerCode(String buyerCode);

    boolean existsByBuyerCodeAndRealEstateCode(String buyerCode, String realEstateCode);

    List<BuyerWarrant> findAllByBuyerIdAndRealEstateRealEstateStatusCodeIn(Long userId, List<String> realEstateCodes);
}
