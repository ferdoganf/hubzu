package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.metadata.UpdateContractDTO;
import com.hubzu.api.dto.request.metadata.UpdateSmsDTO;
import com.hubzu.api.model.template.Contract;
import com.hubzu.api.model.template.Sms;
import com.hubzu.api.repository.content.ContractRepository;
import com.hubzu.api.repository.content.SmsRepository;
import com.hubzu.api.service.ContentCommandService;
import com.hubzu.api.service.ContentQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ContentCommandServiceImpl implements ContentCommandService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ContentQueryService contentQueryService;

    @Autowired
    private SmsRepository smsRepository;


    @Override
    public String updateContract(UpdateContractDTO updateContractDTO) {
        Contract contract = this.contentQueryService.getContract(updateContractDTO.getCode());
        contract.setContent(updateContractDTO.getContent());
        return this.contractRepository.save(contract).getCode();
    }

    @Override
    public String updateSms(UpdateSmsDTO updateSmsDTO) {
        Sms sms = this.contentQueryService.checkAndGetSms(updateSmsDTO.getCode());
        sms.setContent(updateSmsDTO.getContent());
        return this.smsRepository.save(sms).getCode();
    }
}
