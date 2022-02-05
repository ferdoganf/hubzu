package com.hubzu.api.service.impl;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.user.UserFavourite;
import com.hubzu.api.repository.user.UserFavouriteRepository;
import com.hubzu.api.service.UserFavoriteQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class UserFavoriteQueryServiceImpl implements UserFavoriteQueryService {

    @Autowired
    private UserFavouriteRepository userFavouriteRepository;

    @Override
    public List<CodeBaseDTO> getUserFavorites(Long userId) {
        List<UserFavourite> userFavourites = this.userFavouriteRepository.findAllByUserId(userId);
        return userFavourites.stream().map(UserFavourite::getRealEstate).map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public boolean userHasFavoriteRealEstate(Long userId, String realEstateCode) {
        return this.userFavouriteRepository.existsByUserIdAndRealEstateCode(userId, realEstateCode);
    }

    @Override
    public UserFavourite getUserFavoriteRealEstate(Long userId, String realEstateCode) {
        return this.userFavouriteRepository.findOneByUserIdAndRealEstateCode(userId, realEstateCode);
    }
}
