package com.hubzu.api.service;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.buyer.UserFavouriteDTO;
import com.hubzu.api.dto.metadata.RealEstateMetadataDTO;
import com.hubzu.api.dto.realestate.RealEstateChangeDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateDTO;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.realestate.RealEstateStatus;

import java.math.BigDecimal;
import java.util.List;

public interface RealEstateQueryService {

    RealEstateMetadataDTO getRealEstateMetadata();

    void checkRealEstateAlreadyExists(String code);

    RealEstate checkAndGetRealEstate(String code);

    RealEstateStatus checkAndGetRealEstateStatus(String code);

    RealEstateDTO getRealEstate(String code);

    List<CodeBaseDTO> getRealEstateStatusDTOs();

    ResponseOfPagedList<RealEstateLightDTO> searchRealEstate(SearchRealEstateDTO searchRealEstateDTO);

    ResponseOfPagedList<RealEstateDTO> searchRealEstatePublic(SearchRealEstateDTO searchRealEstateDTO);

    List<UserFavouriteDTO> favorites(String realEstateCode);

    BigDecimal getRealEstateDepositAmount(String realEstateCode);

    RealEstateChangeDTO getRealEstateCurrentBidAmount(String realEstateCode);
}
