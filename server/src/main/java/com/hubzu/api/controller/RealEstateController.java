package com.hubzu.api.controller;

import com.hubzu.api.config.HubzuUserDetails;
import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.realestate.RealEstateChangeDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.service.BankQueryService;
import com.hubzu.api.service.RealEstateQueryService;
import com.hubzu.api.service.ReportCommandService;
import com.hubzu.api.service.RequestQueryService;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.math.BigDecimal;

@RestController
@RequestMapping("/rest/realestates")
public class RealEstateController {


    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private BankQueryService bankQueryService;

    @Autowired
    private ReportCommandService reportCommandService;

    @Autowired
    private RequestQueryService requestQueryService;


    @GetMapping("/{realEstateCode}")
    @PreAuthorize("permitAll()")
    public ResponseOfItem<RealEstateDTO> getRealEstate(@PathVariable("realEstateCode") String realEstateCode, HttpServletRequest request) {
        String userId = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() != null) {
            if (authentication.getPrincipal() instanceof HubzuUserDetails) {
                userId = ((HubzuUserDetails) authentication.getPrincipal()).getId().toString();
            }
        }
        this.reportCommandService.addUserRealEstateView(realEstateCode, userId, this.requestQueryService.getClientIp(request));
        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(realEstateCode);
        if ((realEstateDTO.getRealEstateStatus() == null) || (BusinessConstants.RealEstateStatus.CANCELLED.equals(realEstateDTO.getRealEstateStatus().getCode()))) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NOT_FOUND);
        }
        return new ResponseOfItem(realEstateDTO);
    }

    @PostMapping("/search")
    public ResponseOfPagedList<RealEstateDTO> searchRealEstate(@RequestHeader(value = "X-Bank", required = false) String bankCode, @RequestBody @Valid SearchRealEstateDTO searchRealEstateDTO) {
        if (StringUtils.isNotEmpty(bankCode)) {
            if (this.bankQueryService.exists(bankCode)) {
                searchRealEstateDTO.setBank(bankCode);
            }
        }
        return this.realEstateQueryService.searchRealEstatePublic(searchRealEstateDTO);
    }

    @GetMapping("/{realEstateCode}/depositamount")
    public ResponseOfItem<BigDecimal> getRealEstateDepositAmount(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.realEstateQueryService.getRealEstateDepositAmount(realEstateCode));
    }

    @GetMapping("/{realEstateCode}/currentbidamount")
    public ResponseOfItem<RealEstateChangeDTO> getRealEstateCurrentBidAmount(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.realEstateQueryService.getRealEstateCurrentBidAmount(realEstateCode));
    }
}