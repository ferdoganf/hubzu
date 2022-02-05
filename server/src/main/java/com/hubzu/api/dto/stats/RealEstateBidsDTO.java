package com.hubzu.api.dto.stats;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
@Data
public class RealEstateBidsDTO {

    private long total;
    private long last12;
    private long last24;

}
