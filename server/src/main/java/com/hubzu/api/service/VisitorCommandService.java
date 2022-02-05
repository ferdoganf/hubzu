package com.hubzu.api.service;

import com.hubzu.api.dto.request.user.CreateVisitorDTO;

public interface VisitorCommandService {

    String createVisitor(CreateVisitorDTO createVisitorDTO);

    String activateVisitor(String code);
}
