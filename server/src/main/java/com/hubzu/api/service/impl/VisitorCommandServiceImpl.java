package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.user.CreateVisitorDTO;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.repository.user.BuyerRepository;
import com.hubzu.api.repository.user.VisitorRepository;
import com.hubzu.api.service.*;
import com.hubzu.api.util.BusinessConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class VisitorCommandServiceImpl implements VisitorCommandService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VisitorCommandServiceImpl.class);


    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private BuyerQueryService buyerQueryService;

    @Autowired
    private UserQueryService userQueryService;

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private GoogleQueryService googleQueryService;

    @Autowired
    private MailCommandService mailCommandService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Override
    public String createVisitor(CreateVisitorDTO createVisitorDTO) {

        this.buyerQueryService.checkBuyerExistsByEmailAddress(createVisitorDTO.getEmailAddress());
        this.googleQueryService.checkReCaptcha(createVisitorDTO.getRecaptchaToken());

        Buyer visitor = new Buyer();
        visitor.setCode(UUID.randomUUID().toString());
        visitor.setEmailAddress(createVisitorDTO.getEmailAddress());
        visitor.setName(createVisitorDTO.getName());
        visitor.setSurname(createVisitorDTO.getSurname());
        visitor.setPhone(createVisitorDTO.getPhone());
        visitor.setPhoneCountryCode(createVisitorDTO.getPhoneCountryCode());

        visitor.setPassword(this.bCryptPasswordEncoder.encode(createVisitorDTO.getPassword()));
        visitor.setUserStatus(this.userQueryService.checkAndGetUserStatus(BusinessConstants.UserStatus.PENDING.name()));
        visitor.setUserType(this.userQueryService.checkAndGetUserType(BusinessConstants.UserType.BUYER.name()));
        visitor = this.buyerRepository.save(visitor);

        this.mailCommandAsyncService.sendVerificationMailToNewVisitor(createVisitorDTO.getName(), createVisitorDTO.getSurname(), visitor.getEmailAddress(), visitor.getCode());
        return visitor.getCode();
    }

    @Override
    public String activateVisitor(String code) {

        Buyer visitor = this.buyerQueryService.checkAndGetBuyer(code);
        if (BusinessConstants.UserStatus.PENDING.equals(visitor.getUserStatus().getCode())) {
            visitor.setUserStatus(this.userQueryService.checkAndGetUserStatus(BusinessConstants.UserStatus.ACTIVE.name()));
            visitor = this.buyerRepository.save(visitor);
        }

        this.mailCommandAsyncService.sendActivatedMailToNewVisitor(visitor.getName(), visitor.getSurname(), visitor.getEmailAddress());
        this.mailCommandAsyncService.sendNewVisitorMailToAdmins(visitor.getName(), visitor.getSurname(), visitor.getEmailAddress());
        return visitor.getCode();
    }
}
