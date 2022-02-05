package com.hubzu.api.service;

import com.hubzu.api.dto.metadata.ContractDTO;
import com.hubzu.api.dto.metadata.SmsDTO;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.template.Contract;
import com.hubzu.api.model.template.Sms;

import java.util.List;

public interface ContentQueryService {

    Contract getContract(String code);

    ContractDTO getContractDTO(String code);

    byte[] getContractPdf(String code, Buyer buyer, RealEstate realEstate);

    Sms checkAndGetSms(String code);

    SmsDTO getSmsDTO(String code);

    List<SmsDTO> getSmsDTOs();
}
