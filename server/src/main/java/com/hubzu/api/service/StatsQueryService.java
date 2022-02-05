package com.hubzu.api.service;

import com.hubzu.api.dto.stats.RealEstateBidsDTO;
import com.hubzu.api.dto.stats.RealEstateBuyersFavoritesDTO;
import com.hubzu.api.dto.stats.RealEstateBuyersWarrantsDTO;
import com.hubzu.api.dto.stats.RealEstateUserViewsDTO;

public interface StatsQueryService {
    RealEstateBuyersWarrantsDTO getRealestateBuyersWarrants(String realEstateCode);

    RealEstateBuyersFavoritesDTO getRealestateBuyersFavorites(String realEstateCode);

    RealEstateBidsDTO getRealestateBids(String realEstateCode);

    long getRealestateBidsCount(String realEstateCode);

    long getRealestateFavoritesCount(String realEstateCode);

    long getRealestateBuyersCount(String realEstateCode);

    RealEstateUserViewsDTO getRealestateUserViews(String realEstateCode);
}
