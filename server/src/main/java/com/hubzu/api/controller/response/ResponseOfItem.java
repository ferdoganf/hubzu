package com.hubzu.api.controller.response;

import com.hubzu.api.controller.response.base.BaseResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ResponseOfItem<T> extends BaseResponse {

    private T value;

    public ResponseOfItem(T value) {
        super();
        this.value = value;
    }
}