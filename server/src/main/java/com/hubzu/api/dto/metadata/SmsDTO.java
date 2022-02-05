package com.hubzu.api.dto.metadata;

import com.hubzu.api.model.template.Sms;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@EqualsAndHashCode
@Data
@NoArgsConstructor
public class SmsDTO {

    @NonNull
    private String code;

    private String content;

    public SmsDTO(Sms sms) {
        ModelMapperUtil.getInstance().getMapper().map(sms, this);
    }
}
