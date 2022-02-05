package com.hubzu.api.repository.buyer;

import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BidRepository extends BaseRepository<Bid, Long> {
    List<Bid> findAllByBuyerIdOrderByIdDesc(Long buyerId);

    long countByRealEstateCode(String realEstateCode);

    long countByRealEstateCodeAndCreatedDateBetween(String realEstateCode, LocalDateTime minusHours, LocalDateTime now);

    List<Bid> findAllByRealEstateCodeOrderByIdDesc(String realEstateCode);
}
