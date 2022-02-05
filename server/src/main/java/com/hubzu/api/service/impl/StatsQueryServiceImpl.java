package com.hubzu.api.service.impl;

import com.hubzu.api.dto.stats.RealEstateBidsDTO;
import com.hubzu.api.dto.stats.RealEstateBuyersFavoritesDTO;
import com.hubzu.api.dto.stats.RealEstateBuyersWarrantsDTO;
import com.hubzu.api.dto.stats.RealEstateUserViewsDTO;
import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.repository.buyer.BidRepository;
import com.hubzu.api.repository.buyer.BuyerWarrantRepository;
import com.hubzu.api.repository.user.BuyerRepository;
import com.hubzu.api.repository.user.UserFavouriteRepository;
import com.hubzu.api.repository.user.UserRealEstateViewRepository;
import com.hubzu.api.service.StatsQueryService;
import com.hubzu.api.util.BusinessConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional(readOnly = true)
public class StatsQueryServiceImpl implements StatsQueryService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private BuyerWarrantRepository buyerWarrantRepository;

    @Autowired
    private UserFavouriteRepository userFavouriteRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private UserRealEstateViewRepository userRealEstateViewRepository;

    @Override
    public RealEstateBuyersWarrantsDTO getRealestateBuyersWarrants(String realEstateCode) {
        RealEstateBuyersWarrantsDTO realEstateBuyersWarrantsDTO = new RealEstateBuyersWarrantsDTO();
        realEstateBuyersWarrantsDTO.setTotal(this.buyerRepository.count());
        realEstateBuyersWarrantsDTO.setActive(this.buyerRepository.countByUserStatusCode(BusinessConstants.UserStatus.ACTIVE.name()));
        realEstateBuyersWarrantsDTO.setWarranted(this.buyerWarrantRepository.countByRealEstateCode(realEstateCode));
        return realEstateBuyersWarrantsDTO;
    }

    @Override
    public RealEstateBuyersFavoritesDTO getRealestateBuyersFavorites(String realEstateCode) {
        RealEstateBuyersFavoritesDTO realEstateBuyersFavoritesDTO = new RealEstateBuyersFavoritesDTO();
        realEstateBuyersFavoritesDTO.setTotal(this.userFavouriteRepository.countByRealEstateCode(realEstateCode));
        realEstateBuyersFavoritesDTO.setLast12(this.userFavouriteRepository.countByRealEstateCodeAndCreatedDateBetween(realEstateCode, LocalDateTime.now().minusHours(12), LocalDateTime.now()));
        realEstateBuyersFavoritesDTO.setLast24(this.userFavouriteRepository.countByRealEstateCodeAndCreatedDateBetween(realEstateCode, LocalDateTime.now().minusHours(24), LocalDateTime.now()));
        return realEstateBuyersFavoritesDTO;
    }

    @Override
    public RealEstateBidsDTO getRealestateBids(String realEstateCode) {
        RealEstateBidsDTO realEstateBidsDTO = new RealEstateBidsDTO();
        realEstateBidsDTO.setTotal(this.bidRepository.countByRealEstateCode(realEstateCode));
        realEstateBidsDTO.setLast12(this.bidRepository.countByRealEstateCodeAndCreatedDateBetween(realEstateCode, LocalDateTime.now().minusHours(12), LocalDateTime.now()));
        realEstateBidsDTO.setLast24(this.bidRepository.countByRealEstateCodeAndCreatedDateBetween(realEstateCode, LocalDateTime.now().minusHours(24), LocalDateTime.now()));
        return realEstateBidsDTO;
    }

    @Override
    public long getRealestateBidsCount(String realEstateCode) {
        return this.bidRepository.countByRealEstateCode(realEstateCode);
    }

    @Override
    public long getRealestateFavoritesCount(String realEstateCode) {
        return this.userFavouriteRepository.countByRealEstateCode(realEstateCode);
    }

    @Override
    public long getRealestateBuyersCount(String realEstateCode) {
        List<Bid> bidList = this.bidRepository.findAllByRealEstateCodeOrderByIdDesc(realEstateCode);
        return bidList.stream().map(e -> e.getBuyer().getCode()).distinct().count();
    }

    @Override
    public RealEstateUserViewsDTO getRealestateUserViews(String realEstateCode) {
        RealEstateUserViewsDTO realEstateUserViewsDTO = new RealEstateUserViewsDTO();
        realEstateUserViewsDTO.setTotalIpFiltered(this.userRealEstateViewRepository.countByRealEstateCodeIpFiltered(realEstateCode));
        realEstateUserViewsDTO.setLast12IpFiltered(this.userRealEstateViewRepository.countByRealEstateCodeAndCreatedDateBetweenIpFiltered(realEstateCode,
            LocalDateTime.now().minusHours(12), LocalDateTime.now()));
        realEstateUserViewsDTO.setLast24IpFiltered(this.userRealEstateViewRepository.countByRealEstateCodeAndCreatedDateBetweenIpFiltered(realEstateCode,
            LocalDateTime.now().minusHours(24), LocalDateTime.now()));

        realEstateUserViewsDTO.setTotal(this.userRealEstateViewRepository.countByRealEstateCode(realEstateCode));
        realEstateUserViewsDTO.setLast12(this.userRealEstateViewRepository.countByRealEstateCodeAndCreatedDateBetween(realEstateCode, LocalDateTime.now().minusHours(12), LocalDateTime.now()));
        realEstateUserViewsDTO.setLast24(this.userRealEstateViewRepository.countByRealEstateCodeAndCreatedDateBetween(realEstateCode, LocalDateTime.now().minusHours(24),
            LocalDateTime.now()));
        return realEstateUserViewsDTO;
    }


}
