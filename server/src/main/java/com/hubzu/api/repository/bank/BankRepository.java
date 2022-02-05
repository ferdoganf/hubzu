package com.hubzu.api.repository.bank;

import com.hubzu.api.model.bank.Bank;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankRepository extends CodeBaseRepository<Bank, Long> {

    List<Bank> findByEnabled(boolean b);
}
