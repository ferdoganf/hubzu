package com.hubzu.api.repository.buyer;

import com.hubzu.api.model.buyer.BuyerAutoBid;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface BuyerAutoBidRepository extends BaseRepository<BuyerAutoBid, Long> {


    List<BuyerAutoBid> findAllByBuyerIdOrderByIdDesc(Long buyerId);

    Optional<BuyerAutoBid> findByBuyerIdAndRealEstateCode(Long buyerId, String realEstateCode);

    Optional<BuyerAutoBid> findOneByBuyerIdAndRealEstateId(Long id, Long id1);

    BuyerAutoBid findTopByRealEstateCodeAndBuyerCodeNotAndUpperLimitGreaterThanEqualOrderByCreatedDateAsc(String code, String code1, BigDecimal add);

    List<BuyerAutoBid> findAllByBuyerCode(String code);
}
