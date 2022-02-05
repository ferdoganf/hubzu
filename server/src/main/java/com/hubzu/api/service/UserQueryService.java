package com.hubzu.api.service;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.dto.metadata.UserMetadataDTO;
import com.hubzu.api.dto.secure.SecureUserDTO;
import com.hubzu.api.model.user.User;
import com.hubzu.api.model.user.UserStatus;
import com.hubzu.api.model.user.UserType;

import java.util.List;

public interface UserQueryService {

    SecureUserDTO getUserByEmailAddress(String emailAddress);

    List<SecureUserDTO> getUsers();

    UserType checkAndGetUserType(String code);

    UserStatus checkAndGetUserStatus(String code);

    UserLightDTO getUser(Long id);

    User checkAndGetUser(Long id);

    User checkAndGetUser(String code);

    UserLightDTO getUser(String code);

    List<CodeBaseDTO> getUserStatusDTOs();

    UserMetadataDTO getUserMetadataDTO();
}
