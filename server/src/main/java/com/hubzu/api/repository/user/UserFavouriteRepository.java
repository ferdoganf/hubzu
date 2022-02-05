package com.hubzu.api.repository.user;

import com.hubzu.api.model.user.UserFavourite;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserFavouriteRepository extends BaseRepository<UserFavourite, Long> {

    List<UserFavourite> findAllByUserId(Long userId);

    boolean existsByUserIdAndRealEstateCode(Long userId, String realEstateCode);

    UserFavourite findOneByUserIdAndRealEstateCode(Long userId, String realEstateCode);

    List<UserFavourite> findAllByRealEstateCode(String realEstateCode);

    long countByRealEstateCode(String realEstateCode);

    long countByRealEstateCodeAndCreatedDateBetween(String realEstateCode, LocalDateTime minusHours, LocalDateTime now);

    List<UserFavourite> findAllByUserCode(String code);
}
