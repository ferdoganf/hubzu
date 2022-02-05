package com.hubzu.api.controller.secure;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.report.RealEstateStatusHistoryDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateStatusDTO;
import com.hubzu.api.service.ReportQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rest/secure/report")
public class SecureReportController {

    @Autowired
    private ReportQueryService reportQueryService;

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping(value = "/realestate/{realEstateCode}/auctionresultreport", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getRealestateAuctionResultReport(@PathVariable("realEstateCode") String realEstateCode) {

        byte[] bytes = this.reportQueryService.getRealestateAuctionResultReport(realEstateCode);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "pdf"));
        headers.setContentDispositionFormData("attachment", realEstateCode + "_AuctionResultReport.pdf");
        headers.setContentLength(bytes.length);
        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }

    @PostMapping("/realestate/statuschanges")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfPagedList<RealEstateStatusHistoryDTO> searchRealEstateStatusChanges(@RequestBody @Valid SearchRealEstateStatusDTO searchRealEstateStatusDTO) {
        return this.reportQueryService.searchRealEstateStatusChanges(searchRealEstateStatusDTO);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping(value = "/realestate/{realEstateCode}/directbid/{directBidId}/evaluationreport", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getBidEvaluationreportReport(@PathVariable("realEstateCode") String realEstateCode, @PathVariable("directBidId") Long directBidId) {

        byte[] bytes = this.reportQueryService.getBidEvaluationreportReport(realEstateCode, directBidId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "pdf"));
        headers.setContentDispositionFormData("attachment", realEstateCode + "_" + directBidId + "_AuctionResultReport.pdf");
        headers.setContentLength(bytes.length);
        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }
}
