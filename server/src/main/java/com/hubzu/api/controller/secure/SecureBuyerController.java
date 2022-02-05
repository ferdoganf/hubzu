package com.hubzu.api.controller.secure;

import com.hubzu.api.config.HubzuUserDetails;
import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.dto.request.buyer.BuyersCodeListDTO;
import com.hubzu.api.dto.request.realestate.RealestatesCodeListDTO;
import com.hubzu.api.dto.request.search.SearchBuyerDTO;
import com.hubzu.api.dto.request.user.CreateBuyerDTO;
import com.hubzu.api.service.BuyerCommandService;
import com.hubzu.api.service.BuyerQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rest/secure/buyers")
public class SecureBuyerController {

    @Autowired
    private BuyerCommandService buyerCommandService;

    @Autowired
    private BuyerQueryService buyerQueryService;

    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> createBuyer(@RequestBody @Valid CreateBuyerDTO createBuyerDTO) {
        return new ResponseOfItem(this.buyerCommandService.createBuyer(createBuyerDTO));
    }

    @PutMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> updateBuyer(@PathVariable("code") String code, @RequestBody CreateBuyerDTO createBuyerDTO) {
        return new ResponseOfItem(this.buyerCommandService.updateBuyer(code, createBuyerDTO));
    }

    @DeleteMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void deleteBuyer(@PathVariable("code") String code) {
        this.buyerCommandService.deleteBuyer(code);
    }

    @GetMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<BuyerDTO> getBuyer(@PathVariable("code") String code) {
        return new ResponseOfItem(this.buyerQueryService.getBuyerDTO(code));
    }

    @PostMapping("/search")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfPagedList<BuyerDTO> searchBuyer(@RequestBody @Valid SearchBuyerDTO searchBuyerDTO) {
        return this.buyerQueryService.searchBuyer(searchBuyerDTO);
    }


    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/warrant/realEstates/{realEstateCode}/buyers")
    public ResponseOfList<UserLightDTO> getBuyersHasWarrantForRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfList(this.buyerQueryService.getBuyersHasWarrantForRealEstate(realEstateCode));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PutMapping("/warrant/realEstates/{realEstateCode}/buyers")
    public void updateBuyersWarrantForRealEstate(@PathVariable("realEstateCode") String realEstateCode, @RequestBody BuyersCodeListDTO buyersCodeListDTO) {
        this.buyerCommandService.updateBuyersWarrantForRealEstate(realEstateCode, buyersCodeListDTO);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PutMapping("/warrant/buyers/{buyerCode}/realEstates")
    public void updateRealEstateWarrantsOfBuyer(@PathVariable("buyerCode") String buyerCode, @RequestBody RealestatesCodeListDTO realestatesCodeListDTO) {
        this.buyerCommandService.updateRealEstateWarrantsOfBuyer(buyerCode, realestatesCodeListDTO);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/warrant/buyers/{buyerCode}/realEstates")
    public ResponseOfList<RealEstateLightDTO> getBuyersWarrantedRealEstates(@PathVariable("buyerCode") String buyerCode) {
        return new ResponseOfList(this.buyerQueryService.getBuyersWarrantedRealEstates(buyerCode));
    }

    @PreAuthorize("hasAnyAuthority('BUYER', 'ADMIN')")
    @GetMapping("/warrant/buyer/realEstates")
    public ResponseOfList<CodeBaseDTO> getBuyerWarrantedRealEstates(Authentication authentication) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        return new ResponseOfList(this.buyerQueryService.getBuyerWarrantedRealEstates(userId));
    }
}
