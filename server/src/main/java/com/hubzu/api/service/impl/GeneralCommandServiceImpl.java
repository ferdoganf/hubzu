package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.general.ContactUsDTO;
import com.hubzu.api.service.GeneralCommandService;
import com.hubzu.api.service.GoogleQueryService;
import com.hubzu.api.service.MailCommandAsyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GeneralCommandServiceImpl implements GeneralCommandService {

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Autowired
    private GoogleQueryService googleQueryService;

    @Override
    public void contactus(ContactUsDTO contactUsDTO) {
        this.googleQueryService.checkReCaptcha(contactUsDTO.getRecaptchaToken());
        this.mailCommandAsyncService.contactusMail(contactUsDTO.getName(), contactUsDTO.getSurname(), contactUsDTO.getPhoneCountryCode(), contactUsDTO.getPhone(), contactUsDTO.getEmailAddress(), contactUsDTO.getMessage());
    }
}
