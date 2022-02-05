package com.hubzu.api.repository.audit;

import com.hubzu.api.model.audit.RealEstateStatusHistory;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateStatusHistoryRepository extends BaseRepository<RealEstateStatusHistory, Long> {
}
