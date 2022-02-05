package com.hubzu.api.exception;

public class HubzuTechnicalException extends RuntimeException {

    public HubzuTechnicalException(String message) {
        super(message);
    }

    public HubzuTechnicalException() {
    }
}
