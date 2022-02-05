package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.metadata.CreateUpdateBankDTO;
import com.hubzu.api.model.bank.Bank;
import com.hubzu.api.repository.bank.BankRepository;
import com.hubzu.api.service.BankCommandService;
import com.hubzu.api.service.BankQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BankCommandServiceImpl implements BankCommandService {

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private BankQueryService bankQueryService;


    @Override
    public String createBank(CreateUpdateBankDTO createUpdateBankDTO) {
        this.bankQueryService.checkBankExists(createUpdateBankDTO.getCode());
        Bank bank = new Bank();
        bank.setCode(createUpdateBankDTO.getCode());
        bank.setName(createUpdateBankDTO.getName());
        bank.setDepositRate(createUpdateBankDTO.getDepositRate());
        bank.setServiceFeeRate(createUpdateBankDTO.getServiceFeeRate());
        bank.setBuyerWarrantAlert(createUpdateBankDTO.getBuyerWarrantAlert());
        bank.setEnabled(createUpdateBankDTO.isEnabled());
        bank.setFinishedAuctionsShown(createUpdateBankDTO.isFinishedAuctionsShown());
        return this.bankRepository.save(bank).getCode();
    }

    @Override
    public String updateBank(String code, CreateUpdateBankDTO createUpdateBankDTO) {
        Bank bank = this.bankQueryService.checkAndGetBank(code);
        bank.setCode(createUpdateBankDTO.getCode());
        bank.setName(createUpdateBankDTO.getName());
        bank.setDepositRate(createUpdateBankDTO.getDepositRate());
        bank.setServiceFeeRate(createUpdateBankDTO.getServiceFeeRate());
        bank.setBuyerWarrantAlert(createUpdateBankDTO.getBuyerWarrantAlert());
        bank.setEnabled(createUpdateBankDTO.isEnabled());
        bank.setFinishedAuctionsShown(createUpdateBankDTO.isFinishedAuctionsShown());
        return this.bankRepository.save(bank).getCode();
    }
}
