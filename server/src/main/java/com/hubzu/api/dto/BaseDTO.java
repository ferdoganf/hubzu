package com.hubzu.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class BaseDTO {

    @NonNull
    private Long id;

    public BaseDTO(Long id) {
        this.setId(id);
    }
}
