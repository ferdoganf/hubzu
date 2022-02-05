package com.hubzu.api.service;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.user.UserFavourite;

import java.util.List;

public interface UserFavoriteQueryService {

    List<CodeBaseDTO> getUserFavorites(Long userId);

    boolean userHasFavoriteRealEstate(Long userId, String realEstateCode);

    UserFavourite getUserFavoriteRealEstate(Long userId, String realEstateCode);
}
