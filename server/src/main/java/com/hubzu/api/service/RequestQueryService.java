package com.hubzu.api.service;

import javax.servlet.http.HttpServletRequest;

public interface RequestQueryService {

    String getClientIp(HttpServletRequest request);
}
