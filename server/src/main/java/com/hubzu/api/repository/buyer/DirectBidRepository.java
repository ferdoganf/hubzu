package com.hubzu.api.repository.buyer;

import com.hubzu.api.model.buyer.DirectBid;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectBidRepository extends BaseRepository<DirectBid, Long> {
    List<DirectBid> findAllByRealEstateCodeOrderByIdDesc(String realEstateCode);
}
