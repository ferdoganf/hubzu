package com.hubzu.api.service;

import com.hubzu.api.dto.request.realestate.*;
import com.hubzu.api.model.realestate.RealEstate;

import java.time.LocalDateTime;

public interface RealEstateCommandService {

    void createRealEstate(CreateRealEstateDTO createRealEstateDTO);

    void updateCommercial(String realEstateCode, UpsertCommercialDTO upsertCommercialDTO);

    void updateLand(String realEstateCode, UpsertLandDTO createLandDTO);

    void updateRealEstateAddress(String realEstateCode, UpdateRealEstateAddressDTO updateRealEstateAddressDTO);

    void updateResidential(String realEstateCode, UpsertResidentialDTO upsertResidentialDTO);

    void checkRealEstateForUpdate(RealEstate realEstate);

    void updateRealEstate(String realEstateCode, UpdateRealEstateDTO updateRealEstateDTO);

    void updateStatus(String realEstateCode, String statusCode);

    void completeRealEstate(String realEstateCode);

    void deleteRealEstate(String realEstateCode);

    void copyRealEstate(String realEstateCode);

    void updateEndDate(String realEstateCode, LocalDateTime enddate);
}
