package com.hubzu.api.repository.content;

import com.hubzu.api.model.template.Contract;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends CodeBaseRepository<Contract, Long> {

}
