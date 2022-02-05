package com.hubzu.api.service;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.request.search.SearchLightDTO;
import com.hubzu.api.dto.visitor.VisitorDTO;
import com.hubzu.api.model.visitor.Visitor;

import java.util.List;

public interface VisitorQueryService {

    Visitor checkAndGetVisitor(Long id);

    Visitor checkAndGetVisitor(String code);

    VisitorDTO getVisitorDTO(String code);

    List<VisitorDTO> getVisitorDTOs();

    ResponseOfPagedList<VisitorDTO> searchVisitor(SearchLightDTO searchLightDTO);

    void checkVisitorExists(String emailAddress);

    void checkVisitorExistsByEmailAddress(String emailAddress);
}
