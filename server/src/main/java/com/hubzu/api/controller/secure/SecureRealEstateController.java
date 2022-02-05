package com.hubzu.api.controller.secure;

import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.buyer.UserFavouriteDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.dto.request.realestate.*;
import com.hubzu.api.dto.request.search.SearchRealEstateDTO;
import com.hubzu.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/rest/secure/realestates")
public class SecureRealEstateController {

    @Autowired
    private RealEstateCommandService realEstateCommandService;

    @Autowired
    private ResidentialQueryService residentialQueryService;

    @Autowired
    private CommercialQueryService commercialQueryService;

    @Autowired
    private LandQueryService landQueryService;

    @Autowired
    private RealEstatePhotoCommandService realEstatePhotoCommandService;

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void createRealEstate(@RequestBody @Valid CreateRealEstateDTO createRealEstateDTO) {
        this.realEstateCommandService.createRealEstate(createRealEstateDTO);
    }

    @PutMapping("/{realEstateCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateRealEstate(@PathVariable("realEstateCode") String realEstateCode, @RequestBody @Valid UpdateRealEstateDTO updateRealEstateDTO) {
        this.realEstateCommandService.updateRealEstate(realEstateCode, updateRealEstateDTO);
    }

    @DeleteMapping("/{realEstateCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void deleteRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        this.realEstateCommandService.deleteRealEstate(realEstateCode);
    }

    @PostMapping("/{realEstateCode}/copy")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void copyRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        this.realEstateCommandService.copyRealEstate(realEstateCode);
    }

    @GetMapping("/{realEstateCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public ResponseOfItem<RealEstateDTO> getRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.realEstateQueryService.getRealEstate(realEstateCode));
    }

    @PutMapping("/{realEstateCode}/RESIDENTIAL")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateResidential(@PathVariable("realEstateCode") String realEstateCode, @RequestBody @Valid UpsertResidentialDTO upsertResidentialDTO) {
        this.realEstateCommandService.updateResidential(realEstateCode, upsertResidentialDTO);
    }

    @PutMapping("/{realEstateCode}/COMMERCIAL")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateCommercial(@PathVariable("realEstateCode") String realEstateCode, @RequestBody @Valid UpsertCommercialDTO upsertCommercialDTO) {
        this.realEstateCommandService.updateCommercial(realEstateCode, upsertCommercialDTO);
    }

    @PutMapping("/{realEstateCode}/LAND")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateLand(@PathVariable("realEstateCode") String realEstateCode, @RequestBody @Valid UpsertLandDTO createLandDTO) {
        this.realEstateCommandService.updateLand(realEstateCode, createLandDTO);
    }

    @PutMapping("/{realEstateCode}/address")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateRealEstateAddress(@PathVariable("realEstateCode") String realEstateCode, @RequestBody @Valid UpdateRealEstateAddressDTO updateRealEstateAddressDTO) {
        this.realEstateCommandService.updateRealEstateAddress(realEstateCode, updateRealEstateAddressDTO);
    }

    @PutMapping("/{realEstateCode}/status/FINISHED")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void completeRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        this.realEstateCommandService.completeRealEstate(realEstateCode);
    }

    @PutMapping("/{realEstateCode}/status/{statusCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateStatus(@PathVariable("realEstateCode") String realEstateCode, @PathVariable("statusCode") String statusCode) {
        this.realEstateCommandService.updateStatus(realEstateCode, statusCode);
    }

    @PutMapping("/{realEstateCode}/enddate")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void updateStatus(@PathVariable("realEstateCode") String realEstateCode,
                             @RequestParam("enddate")
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                                     LocalDateTime enddate) {
        this.realEstateCommandService.updateEndDate(realEstateCode, enddate);
    }


    @PostMapping("/{realEstateCode}/photo")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void uploadRealEstatePhoto(@PathVariable("realEstateCode") String realEstateCode, @RequestBody @Valid UploadPhotoDTO uploadPhotoDTO) {
        this.realEstatePhotoCommandService.uploadRealEstatePhoto(realEstateCode, uploadPhotoDTO);
    }

    @DeleteMapping("/{realEstateCode}/photo/{photoCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public void deleteRealEstatePhoto(@PathVariable("realEstateCode") String realEstateCode, @PathVariable("photoCode") String photoCode) {
        this.realEstatePhotoCommandService.deleteRealEstatePhoto(realEstateCode, photoCode);
    }

    @PostMapping("/search")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public ResponseOfPagedList<RealEstateLightDTO> searchRealEstate(@RequestBody @Valid SearchRealEstateDTO searchRealEstateDTO) {
        return this.realEstateQueryService.searchRealEstate(searchRealEstateDTO);
    }

    @GetMapping("/{realEstateCode}/favorites")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public ResponseOfList<UserFavouriteDTO> favorites(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfList(this.realEstateQueryService.favorites(realEstateCode));
    }

}