package com.hubzu.api.dto.stats;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
@Data
public class RealEstateBuyersWarrantsDTO {

    private long warranted;
    private long active;
    private long total;
}
