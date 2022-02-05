package com.hubzu.api.service;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.report.RealEstateStatusHistoryDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateStatusDTO;

public interface ReportQueryService {

    byte[] getRealestateAuctionResultReport(String realEstateCode);

    ResponseOfPagedList<RealEstateStatusHistoryDTO> searchRealEstateStatusChanges(SearchRealEstateStatusDTO searchRealEstateStatusDTO);

    byte[] getBidEvaluationreportReport(String realEstateCode, Long directBidId);
}
