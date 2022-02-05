package com.hubzu.api.service.impl;

import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.user.User;
import com.hubzu.api.model.user.UserFavourite;
import com.hubzu.api.repository.user.UserFavouriteRepository;
import com.hubzu.api.service.RealEstateQueryService;
import com.hubzu.api.service.UserFavoriteCommandService;
import com.hubzu.api.service.UserFavoriteQueryService;
import com.hubzu.api.service.UserQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserFavoriteCommandServiceImpl implements UserFavoriteCommandService {

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private UserQueryService userQueryService;

    @Autowired
    private UserFavoriteQueryService userFavoriteQueryService;

    @Autowired
    private UserFavouriteRepository userFavouriteRepository;

    @Override
    public void addRealEstateToFavorites(Long userId, String realEstateCode) {
        if (!this.userFavoriteQueryService.userHasFavoriteRealEstate(userId, realEstateCode)) {
            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
            User user = this.userQueryService.checkAndGetUser(userId);
            UserFavourite userFavourite = new UserFavourite();
            userFavourite.setUser(user);
            userFavourite.setRealEstate(realEstate);
            this.userFavouriteRepository.save(userFavourite);
        }
    }

    @Override
    public void removeRealEstateFromFavorites(Long userId, String realEstateCode) {
        UserFavourite userFavourite = this.userFavoriteQueryService.getUserFavoriteRealEstate(userId, realEstateCode);
        if (userFavourite != null) {
            userFavourite.delete();
            this.userFavouriteRepository.save(userFavourite);
        }

    }

}
