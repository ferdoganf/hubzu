package com.hubzu.api.dto.request.buyer;

import lombok.Data;

import java.util.List;

@Data
public class BuyersCodeListDTO {
    private List<String> buyers;
}
