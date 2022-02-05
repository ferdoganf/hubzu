package com.hubzu.api.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashMap;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class HubzuBusinessException extends RuntimeException {

    private static final long serialVersionUID = 1559037418911293281L;
    private Map<String, String> parameters = new HashMap<>();

    public HubzuBusinessException(String message) {
        super(message);
    }

    public HubzuBusinessException(String message, Map<String, String> parameters) {
        super(message);
        this.parameters = parameters;
    }
}
