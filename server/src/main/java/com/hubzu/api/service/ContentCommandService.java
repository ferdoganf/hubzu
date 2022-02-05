package com.hubzu.api.service;

import com.hubzu.api.dto.request.metadata.UpdateContractDTO;
import com.hubzu.api.dto.request.metadata.UpdateSmsDTO;

public interface ContentCommandService {

    String updateContract(UpdateContractDTO updateContractDTO);

    String updateSms(UpdateSmsDTO updateSmsDTO);
}
