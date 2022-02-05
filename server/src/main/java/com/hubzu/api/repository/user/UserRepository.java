package com.hubzu.api.repository.user;

import com.hubzu.api.model.user.User;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CodeBaseRepository<User, Long> {
    User findOneByEmailAddress(String emailAddress);
}
