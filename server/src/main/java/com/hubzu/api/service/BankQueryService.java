package com.hubzu.api.service;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.dto.metadata.BankDTO;
import com.hubzu.api.dto.request.search.SearchLightDTO;
import com.hubzu.api.model.bank.Bank;

import java.util.List;

public interface BankQueryService {

    List<CodeNameBaseDTO> getBankCodeNameBaseDTOs();

    Bank checkAndGetBank(String bank);

    ResponseOfPagedList<BankDTO> searchBank(SearchLightDTO searchLightDTO);

    BankDTO getBankDTO(String code);

    void checkBankExists(String code);

    BankDTO getBankCodeNameBaseDTO(String code);

    boolean exists(String bankCode);
}
