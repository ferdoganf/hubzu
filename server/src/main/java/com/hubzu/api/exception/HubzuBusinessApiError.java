package com.hubzu.api.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HubzuBusinessApiError {

    private int status;
    private String message;
    private Map<String, String> parameters;

}
