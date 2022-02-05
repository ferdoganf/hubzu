package com.hubzu.api.controller.response.base;

import lombok.Data;

import java.util.UUID;

@Data
public class BaseResponse {

    private String id;
    private boolean success = true;
    private String errorCode = null;

    public BaseResponse() {
        this.id = UUID.randomUUID().toString();
    }

    public BaseResponse(String errorCode) {
        this.id = UUID.randomUUID().toString();
        this.success = false;
        this.errorCode = errorCode;
    }
}
