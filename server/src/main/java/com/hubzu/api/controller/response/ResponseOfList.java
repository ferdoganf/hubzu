package com.hubzu.api.controller.response;

import com.hubzu.api.controller.response.base.BaseResponse;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ResponseOfList<T> extends BaseResponse {

    @NonNull
    private List<T> value;
}