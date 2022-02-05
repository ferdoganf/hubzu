package com.hubzu.api.repository.user;

import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends CodeBaseRepository<Buyer, Long> {

    boolean existsByIdentityNumberOrEmailAddress(String identityNumber, String emailAddress);

    boolean existsByIdentityNumber(String identityNumber);

    boolean existsByEmailAddress(String emailAddress);

    long countByUserStatusCode(String name);
}
