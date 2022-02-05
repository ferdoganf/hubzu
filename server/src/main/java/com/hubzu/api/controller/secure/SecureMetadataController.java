package com.hubzu.api.controller.secure;

import com.hubzu.api.config.HubzuUserDetails;
import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.metadata.BankDTO;
import com.hubzu.api.dto.metadata.RealEstateSubTypeDTO;
import com.hubzu.api.dto.metadata.SmsDTO;
import com.hubzu.api.dto.request.metadata.CreateUpdateBankDTO;
import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;
import com.hubzu.api.dto.request.metadata.UpdateContractDTO;
import com.hubzu.api.dto.request.metadata.UpdateSmsDTO;
import com.hubzu.api.dto.request.search.SearchLightDTO;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rest/secure/metadata")
public class SecureMetadataController {

    @Autowired
    private BankCommandService bankCommandService;

    @Autowired
    private BankQueryService bankQueryService;

    @Autowired
    private ContentQueryService contentQueryService;

    @Autowired
    private ContentCommandService contentCommandService;

    @Autowired
    private BuyerQueryService buyerQueryService;

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private MetadataQueryService metadataQueryService;

    @Autowired
    private MetadataCommandService metadataCommandService;


    @PostMapping("/banks/search")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfPagedList<BankDTO> searchBank(@RequestBody @Valid SearchLightDTO searchLightDTO) {
        return this.bankQueryService.searchBank(searchLightDTO);
    }

    @GetMapping("/banks/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    public ResponseOfItem<BankDTO> getBank(@PathVariable("code") String code) {
        return new ResponseOfItem(this.bankQueryService.getBankDTO(code));
    }


    @PostMapping("/banks")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> createBank(@RequestBody @Valid CreateUpdateBankDTO createUpdateBankDTO) {
        return new ResponseOfItem(this.bankCommandService.createBank(createUpdateBankDTO));
    }

    @PutMapping("/banks/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> updateBank(@PathVariable("code") String code, @RequestBody CreateUpdateBankDTO createUpdateBankDTO) {
        return new ResponseOfItem(this.bankCommandService.updateBank(code, createUpdateBankDTO));
    }


    @PutMapping("/contracts")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> updateContract(@RequestBody @Valid UpdateContractDTO updateContractDTO) {
        return new ResponseOfItem(this.contentCommandService.updateContract(updateContractDTO));
    }

    @PreAuthorize("hasAnyAuthority('BUYER','ADMIN')")
    @GetMapping(value = "/contracts/{code}/{realEstateCode}/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getContractPdf(Authentication authentication, @PathVariable("code") String code, @PathVariable("realEstateCode") String realEstateCode) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        Buyer buyer = this.buyerQueryService.getBuyer(buyerId);
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);

        byte[] bytes = this.contentQueryService.getContractPdf(code, buyer, realEstate);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "pdf"));
        headers.setContentDispositionFormData("attachment", code + "_Contract.pdf");
        headers.setContentLength(bytes.length);
        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }


    @PutMapping("/sms")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> updateSms(@RequestBody @Valid UpdateSmsDTO updateSmsDTO) {
        return new ResponseOfItem(this.contentCommandService.updateSms(updateSmsDTO));
    }

    @GetMapping("/sms/{code}")
    public ResponseOfItem<SmsDTO> getSms(@PathVariable("code") String code) {
        return new ResponseOfItem(this.contentQueryService.getSmsDTO(code));
    }

    @GetMapping("/sms")
    public ResponseOfList<SmsDTO> getSms() {
        return new ResponseOfList(this.contentQueryService.getSmsDTOs());
    }


    @GetMapping("/realestatesubtypes/{realestateTypeCode}/{realestateSubTypeCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<RealEstateSubTypeDTO> getRealestateSubType(@PathVariable("realestateTypeCode") String realestateTypeCode, @PathVariable("realestateSubTypeCode") String realestateSubTypeCode) {
        return new ResponseOfItem(this.metadataQueryService.getRealEstateSubTypeDTO(realestateTypeCode, realestateSubTypeCode));
    }


    @PostMapping("/realestatesubtypes")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> createRealestateSubType(@RequestBody @Valid CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        return new ResponseOfItem(this.metadataCommandService.createRealestateSubType(createUpdateRealestateSubTypeDTO));
    }

    @PutMapping("/realestatesubtypes/{realestateTypeCode}/{realestateSubTypeCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> updateRealestateSubType(@PathVariable("realestateTypeCode") String realestateTypeCode, @PathVariable("realestateSubTypeCode") String realestateSubTypeCode, @RequestBody CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        return new ResponseOfItem(this.metadataCommandService.updateRealestateSubType(realestateTypeCode, realestateSubTypeCode, createUpdateRealestateSubTypeDTO));
    }

    @DeleteMapping("/realestatesubtypes/{realestateTypeCode}/{realestateSubTypeCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void deleteRealestateSubType(@PathVariable("realestateTypeCode") String realestateTypeCode, @PathVariable("realestateSubTypeCode") String realestateSubTypeCode) {
        this.metadataCommandService.deleteRealestateSubType(realestateTypeCode, realestateSubTypeCode);
    }
}
