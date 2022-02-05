package com.hubzu.api.service.impl;

import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.buyer.DirectBid;
import com.hubzu.api.repository.buyer.DirectBidRepository;
import com.hubzu.api.service.DirectBidQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class DirectBidQueryServiceImpl implements DirectBidQueryService {

    @Autowired
    private DirectBidRepository directBidRepository;

    @Override
    public List<RealEstateBidDTO> getBidsOfRealEstate(String realEstateCode) {
        return this.directBidRepository.findAllByRealEstateCodeOrderByIdDesc(realEstateCode).stream().map(RealEstateBidDTO::new).collect(Collectors.toList());
    }

    @Override
    public DirectBid checkAndGetDirectBid(Long directBidId) {
        return this.directBidRepository.findById(directBidId).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_ENTITY_NOT_FOUND));
    }
}
