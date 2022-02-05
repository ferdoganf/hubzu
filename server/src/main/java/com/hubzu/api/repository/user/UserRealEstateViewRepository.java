package com.hubzu.api.repository.user;

import com.hubzu.api.model.user.UserRealEstateView;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface UserRealEstateViewRepository extends BaseRepository<UserRealEstateView, Long> {

    @Query(value =
            "SELECT COUNT(*) \n" +
                    "FROM user_real_estate_view ursw \n" +
                    "WHERE ursw.real_estate_code = :realEstateCode"
            , nativeQuery = true
    )
    long countByRealEstateCode(@Param("realEstateCode") String realEstateCode);

    @Query(value =
            "SELECT COUNT(*) \n" +
                    "FROM user_real_estate_view ursw \n" +
                    "WHERE ursw.real_estate_code = :realEstateCode \n" +
                    "AND ursw.created_date between :startDateTime and :endDateTime"
            , nativeQuery = true
    )
    long countByRealEstateCodeAndCreatedDateBetween(@Param("realEstateCode") String realEstateCode, @Param("startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTime, @Param("endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTime);

    @Query(value =
        "SELECT COUNT(*) \n" +
            "FROM (\n" +
            "SELECT ursw.created_client_ip, COUNT(ursw.created_client_ip) \n" +
            "FROM user_real_estate_view ursw\n" +
            "WHERE ursw.real_estate_code = :realEstateCode\n" +
            "GROUP BY  ursw.created_client_ip) sq"
        , nativeQuery = true
    )
    long countByRealEstateCodeIpFiltered(@Param("realEstateCode") String realEstateCode);

    @Query(value =
        "SELECT COUNT(*) \n" +
            "FROM (\n" +
            "SELECT ursw.created_client_ip, COUNT(ursw.created_client_ip) \n" +
            "FROM user_real_estate_view ursw\n" +
            "WHERE ursw.real_estate_code = :realEstateCode\n" +
            "AND ursw.created_date between :startDateTime and :endDateTime\n" +
            "GROUP BY  ursw.created_client_ip) sq"
        , nativeQuery = true
    )
    long countByRealEstateCodeAndCreatedDateBetweenIpFiltered(@Param("realEstateCode") String realEstateCode, @Param("startDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTime, @Param("endDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTime);
}
