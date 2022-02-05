package com.hubzu.api.repository.user;

import com.hubzu.api.model.visitor.Visitor;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends CodeBaseRepository<Visitor, Long> {

    boolean existsByEmailAddress(String emailAddress);

    long countByUserStatusCode(String name);
}
