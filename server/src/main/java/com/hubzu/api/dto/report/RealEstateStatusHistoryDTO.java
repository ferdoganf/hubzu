package com.hubzu.api.dto.report;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.model.audit.RealEstateStatusHistory;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RealEstateStatusHistoryDTO extends BaseDTO {

    private String userId;

    private Long realEstateId;
    private String realEstateCode;

    private String bankCode;
    private String bankName;

    private String title;

    private String realEstateTypeCode;
    private String realEstateTypeName;

    private String cityCode;
    private String cityName;

    private String districtCode;
    private String districtName;

    private String realEstateStatusCodeOld;
    private String realEstateStatusCodeNew;

    private LocalDateTime createdDate;

    public RealEstateStatusHistoryDTO(RealEstateStatusHistory realEstateStatusHistory) {
        super(realEstateStatusHistory.getId());
        ModelMapperUtil.getInstance().getMapper().map(realEstateStatusHistory, this);

    }
}
