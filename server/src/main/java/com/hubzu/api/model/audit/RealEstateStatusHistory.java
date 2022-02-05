package com.hubzu.api.model.audit;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class RealEstateStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String userId;

    private Long realEstateId;
    private String realEstateCode;

    private String bankCode;
    private String bankName;

    @Column(length = 255)
    private String title;

    private String realEstateTypeCode;
    private String realEstateTypeName;

    private String cityCode;
    private String cityName;

    private String districtCode;
    private String districtName;

    private String realEstateStatusCodeOld;
    private String realEstateStatusCodeNew;

    @Column(name = "created_date", columnDefinition = "DATETIME")
    private LocalDateTime createdDate;
}
