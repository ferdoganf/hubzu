package com.hubzu.api.service;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.dto.request.search.SearchBuyerDTO;
import com.hubzu.api.model.buyer.Buyer;

import java.util.List;

public interface BuyerQueryService {

    Buyer getBuyer(Long id);

    Buyer checkAndGetBuyer(Long id);

    Buyer checkAndGetBuyer(String code);

    BuyerDTO getBuyerDTO(String code);

    List<BuyerDTO> getBuyerDTOs();

    List<UserLightDTO> getBuyersHasWarrantForRealEstate(String realEstateCode);

    ResponseOfPagedList<BuyerDTO> searchBuyer(SearchBuyerDTO searchBuyerDTO);

    void checkBuyerExists(String identityNumber, String emailAddress);

    void checkBuyerExistsByIdentityNumber(String identityNumber);

    void checkBuyerExistsByEmailAddress(String emailAddress);

    List<RealEstateLightDTO> getBuyersWarrantedRealEstates(String buyerCode);

    boolean buyerHasWarrantForRealestate(String buyerCode, String realEstateCode);

    List<CodeBaseDTO> getBuyerWarrantedRealEstates(Long userId);
}
