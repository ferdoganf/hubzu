package com.hubzu.api.dto.metadata;

import com.hubzu.api.model.template.Contract;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@EqualsAndHashCode
@Data
@NoArgsConstructor
public class ContractDTO {

    @NonNull
    private String code;

    private String content;

    public ContractDTO(Contract contract) {
        ModelMapperUtil.getInstance().getMapper().map(contract, this);
    }
}
