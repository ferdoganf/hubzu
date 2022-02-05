package com.hubzu.api.service.impl;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.dto.metadata.UserMetadataDTO;
import com.hubzu.api.dto.secure.SecureUserDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.user.User;
import com.hubzu.api.model.user.UserStatus;
import com.hubzu.api.model.user.UserType;
import com.hubzu.api.repository.user.UserRepository;
import com.hubzu.api.repository.user.UserStatusRepository;
import com.hubzu.api.repository.user.UserTypeRepository;
import com.hubzu.api.service.UserQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class UserQueryServiceImpl implements UserQueryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Autowired
    private UserStatusRepository userStatusRepository;


    @Override
    public SecureUserDTO getUserByEmailAddress(String emailAddress) {
        User user = this.userRepository.findOneByEmailAddress(emailAddress);
        if (user != null) {
            return new SecureUserDTO(user);
        } else {
            return null;
        }
    }

    @Override
    public List<SecureUserDTO> getUsers() {
        return this.userRepository.findAll().stream().map(SecureUserDTO::new).collect(Collectors.toList());
    }


    @Override
    public UserType checkAndGetUserType(String code) {
        return this.userTypeRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_USER_TYPE_NOT_FOUND));
    }

    @Override
    public UserStatus checkAndGetUserStatus(String code) {
        return this.userStatusRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_USER_STATUS_NOT_FOUND));
    }

    @Override
    public User checkAndGetUser(Long id) {
        return this.userRepository.findById(id).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_USER_NOT_FOUND));
    }

    @Override
    public User checkAndGetUser(String code) {
        return this.userRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_USER_NOT_FOUND));
    }

    @Override
    public UserLightDTO getUser(Long id) {
        return new UserLightDTO(this.checkAndGetUser(id));
    }

    @Override
    public UserLightDTO getUser(String code) {
        return new UserLightDTO(this.checkAndGetUser(code));
    }

    @Override
    public List<CodeBaseDTO> getUserStatusDTOs() {
        return this.userStatusRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public UserMetadataDTO getUserMetadataDTO() {
        UserMetadataDTO userMetadataDTO = new UserMetadataDTO();
        userMetadataDTO.setUserStatus(this.getUserStatusDTOs());
        return userMetadataDTO;
    }
}
