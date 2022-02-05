package com.hubzu.api.repository.user;

import com.hubzu.api.model.user.UserType;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserTypeRepository extends CodeBaseRepository<UserType, Long> {

}
