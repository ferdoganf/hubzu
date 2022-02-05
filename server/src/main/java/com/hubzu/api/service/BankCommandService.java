package com.hubzu.api.service;

import com.hubzu.api.dto.request.metadata.CreateUpdateBankDTO;

public interface BankCommandService {

    String createBank(CreateUpdateBankDTO createUpdateBankDTO);

    String updateBank(String code, CreateUpdateBankDTO createUpdateBankDTO);
}
