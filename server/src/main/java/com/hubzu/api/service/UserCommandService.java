package com.hubzu.api.service;

import com.hubzu.api.dto.request.user.UpdateMyPasswordDTO;
import com.hubzu.api.dto.request.user.UpdatePasswordDTO;

public interface UserCommandService {

    void updateMyPassword(Long userId, UpdateMyPasswordDTO updateMyPasswordDTO);

    void updatePassword(String code, UpdatePasswordDTO updatePasswordDTO);

    void activateUser(String code);

    void passivateUser(String code);
}
