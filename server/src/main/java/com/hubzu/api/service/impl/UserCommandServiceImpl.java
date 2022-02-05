package com.hubzu.api.service.impl;

import com.hubzu.api.config.HubzuWebSecurityConfigurerAdapter;
import com.hubzu.api.dto.request.user.UpdateMyPasswordDTO;
import com.hubzu.api.dto.request.user.UpdatePasswordDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.user.User;
import com.hubzu.api.repository.user.UserRepository;
import com.hubzu.api.service.MailCommandAsyncService;
import com.hubzu.api.service.UserCommandService;
import com.hubzu.api.service.UserQueryService;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserCommandServiceImpl implements UserCommandService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserQueryService userQueryService;

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Override
    public void updateMyPassword(Long userId, UpdateMyPasswordDTO updateMyPasswordDTO) {
        User user = this.userQueryService.checkAndGetUser(userId);
        if (StringUtils.isNotEmpty(updateMyPasswordDTO.getPassword()) && StringUtils.isNotEmpty(updateMyPasswordDTO.getNewPassword())) {
            if (!HubzuWebSecurityConfigurerAdapter.passwordEncoder().matches(updateMyPasswordDTO.getPassword(), user.getPassword())) {
                throw new HubzuBusinessException(ErrorCodes.ERROR_INVALID_PASSWORD);
            } else {
                user.setPassword(HubzuWebSecurityConfigurerAdapter.passwordEncoder().encode(updateMyPasswordDTO.getNewPassword()));
                this.userRepository.save(user);
            }
        } else {
            throw new HubzuBusinessException(ErrorCodes.ERROR_INVALID_PASSWORD);
        }
    }

    @Override
    public void updatePassword(String code, UpdatePasswordDTO updatePasswordDTO) {
        User user = this.userQueryService.checkAndGetUser(code);
        user.setPassword(HubzuWebSecurityConfigurerAdapter.passwordEncoder().encode(updatePasswordDTO.getPassword()));
        user.setFirstPassword(updatePasswordDTO.getPassword());
        this.userRepository.save(user);

    }

    @Override
    public void activateUser(String code) {
        User user = this.userQueryService.checkAndGetUser(code);
        String oldStatus = user.getUserStatus().getCode();
        user.setUserStatus(this.userQueryService.checkAndGetUserStatus(BusinessConstants.UserStatus.ACTIVE.name()));
        user = this.userRepository.save(user);
        if (BusinessConstants.UserStatus.PENDING.equals(oldStatus)) {
            this.mailCommandAsyncService.sendWelcomeMailToNewBuyer(user.getName(), user.getSurname(), user.getEmailAddress(), user.getFirstPassword());
        }
    }

    @Override
    public void passivateUser(String code) {
        User user = this.userQueryService.checkAndGetUser(code);
        user.setUserStatus(this.userQueryService.checkAndGetUserStatus(BusinessConstants.UserStatus.PASSIVE.name()));
        this.userRepository.save(user);
    }
}
