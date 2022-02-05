package com.hubzu.api.controller;

import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.dto.metadata.BankDTO;
import com.hubzu.api.dto.metadata.ContractDTO;
import com.hubzu.api.dto.metadata.RealEstateMetadataDTO;
import com.hubzu.api.dto.metadata.UserMetadataDTO;
import com.hubzu.api.service.BankQueryService;
import com.hubzu.api.service.ContentQueryService;
import com.hubzu.api.service.RealEstateQueryService;
import com.hubzu.api.service.UserQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@RestController
@RequestMapping("/rest/metadata")
public class MetadataController {

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private BankQueryService bankQueryService;

    @Autowired
    private ContentQueryService contentQueryService;

    @Autowired
    private UserQueryService userQueryService;

    @GetMapping("/realestate")
    public ResponseOfItem<RealEstateMetadataDTO> getRealEstateMetadata() {
        return new ResponseOfItem(this.realEstateQueryService.getRealEstateMetadata());
    }

    @GetMapping("/user")
    public ResponseOfItem<UserMetadataDTO> getUserMetadataDTO() {
        return new ResponseOfItem(this.userQueryService.getUserMetadataDTO());
    }

    @GetMapping("/system/date")
    public ResponseOfItem<LocalDateTime> getSystemDate() {
        return new ResponseOfItem(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC));
    }

    @GetMapping("/system/bank")
    public ResponseOfItem<BankDTO> getSystemBank(
            @RequestHeader(value = "X-Bank", required = false) String bankCode) {
        return new ResponseOfItem(this.bankQueryService.getBankCodeNameBaseDTO(bankCode));
    }

    @GetMapping("/system/banks")
    public ResponseOfList<CodeNameBaseDTO> getSystemBanks() {
        return new ResponseOfList(this.bankQueryService.getBankCodeNameBaseDTOs());
    }

    @GetMapping("/contracts/{code}")
    public ResponseOfItem<ContractDTO> getContract(@PathVariable("code") String code) {
        return new ResponseOfItem(this.contentQueryService.getContractDTO(code));
    }
}
