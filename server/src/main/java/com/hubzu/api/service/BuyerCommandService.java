package com.hubzu.api.service;

import com.hubzu.api.dto.request.buyer.BuyersCodeListDTO;
import com.hubzu.api.dto.request.realestate.RealestatesCodeListDTO;
import com.hubzu.api.dto.request.user.CreateBuyerDTO;

public interface BuyerCommandService {

    String createBuyer(CreateBuyerDTO createBuyerDTO);

    String updateBuyer(String code, CreateBuyerDTO createBuyerDTO);

    void updateBuyersWarrantForRealEstate(String realEstateCode, BuyersCodeListDTO buyersCodeListDTO);

    void updateRealEstateWarrantsOfBuyer(String buyerCode, RealestatesCodeListDTO realestatesCodeListDTO);

    void deleteBuyer(String code);
}
