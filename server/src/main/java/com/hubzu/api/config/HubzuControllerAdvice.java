package com.hubzu.api.config;

import com.hubzu.api.exception.HubzuBusinessApiError;
import com.hubzu.api.exception.HubzuBusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HubzuControllerAdvice {

    @ExceptionHandler(HubzuBusinessException.class)
    public ResponseEntity<HubzuBusinessApiError> handleHubzuBusinessException(HubzuBusinessException ex) {
        final HubzuBusinessApiError error = new HubzuBusinessApiError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage(),
                ex.getParameters()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
