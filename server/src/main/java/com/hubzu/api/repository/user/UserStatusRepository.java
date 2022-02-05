package com.hubzu.api.repository.user;

import com.hubzu.api.model.user.UserStatus;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserStatusRepository extends CodeBaseRepository<UserStatus, Long> {

}
