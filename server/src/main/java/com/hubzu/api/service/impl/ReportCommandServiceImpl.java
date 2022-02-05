package com.hubzu.api.service.impl;

import com.hubzu.api.model.user.UserRealEstateView;
import com.hubzu.api.repository.user.UserRealEstateViewRepository;
import com.hubzu.api.service.ReportCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReportCommandServiceImpl implements ReportCommandService {

    @Autowired
    private UserRealEstateViewRepository userRealEstateViewRepository;

    @Override
    public void addUserRealEstateView(String realEstateCode, String userId, String clientIp) {
        UserRealEstateView userRealEstateView = new UserRealEstateView();
        userRealEstateView.setRealEstateCode(realEstateCode);
        userRealEstateView.setCreatedBy(userId);
        userRealEstateView.setCreatedClientIp(clientIp);
        this.userRealEstateViewRepository.save(userRealEstateView);

    }
}
