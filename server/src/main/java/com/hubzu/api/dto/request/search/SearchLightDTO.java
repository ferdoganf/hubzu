package com.hubzu.api.dto.request.search;

import lombok.Data;

@Data
public class SearchLightDTO {

    private String searchString;
    private int pageNo;
    private int pageSize;
    private String orderBy;
    private String orderType;

}
