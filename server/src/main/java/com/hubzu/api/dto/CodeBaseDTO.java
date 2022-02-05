package com.hubzu.api.dto;

import com.hubzu.api.model.base.CodeBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class CodeBaseDTO extends BaseDTO {

    @NonNull
    private String code;

    private String forcedName;

    public CodeBaseDTO(CodeBaseEntity codeBaseEntity) {
        super(codeBaseEntity.getId());
        this.setCode(codeBaseEntity.getCode());
        this.setForcedName(codeBaseEntity.getForcedName());
    }
}
