package com.hubzu.api.service;

public interface UserFavoriteCommandService {

    void addRealEstateToFavorites(Long userId, String realEstateCode);

    void removeRealEstateFromFavorites(Long userId, String realEstateCode);

}
