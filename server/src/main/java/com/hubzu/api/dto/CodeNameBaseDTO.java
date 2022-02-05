package com.hubzu.api.dto;

import com.hubzu.api.model.base.CodeNameBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class CodeNameBaseDTO extends CodeBaseDTO {

    @NonNull
    private String name;

    public CodeNameBaseDTO(CodeNameBaseEntity codeNameBaseEntity) {
        super(codeNameBaseEntity);
        this.setName(codeNameBaseEntity.getName());
    }
}
