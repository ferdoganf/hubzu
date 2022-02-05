package com.hubzu.api.repository.dto;

public class ViewsCountDTO {
    private String createdClientIp;
    private Long total;

    public ViewsCountDTO(String createdClientIp, Long total) {
        this.createdClientIp = createdClientIp;
        this.total = total;
    }
}
