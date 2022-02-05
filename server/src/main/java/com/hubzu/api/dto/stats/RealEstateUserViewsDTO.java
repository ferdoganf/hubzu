package com.hubzu.api.dto.stats;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
@Data
public class RealEstateUserViewsDTO {

    private long total;
    private long last12;
    private long last24;


    private long totalIpFiltered;
    private long last12IpFiltered;
    private long last24IpFiltered;


}
