package com.hubzu.api.dto.request.base;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RequestCodeNameBaseDTO extends RequestCodeBaseDTO {

    private String name;
}
