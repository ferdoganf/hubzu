package com.hubzu.api.service.impl;

import com.hubzu.api.dto.external.GoogleReCaptchaResponseDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.service.GoogleQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional(readOnly = true)
public class GoogleQueryServiceImpl implements GoogleQueryService {

    @Autowired
    private RestTemplate restTemplate;


    @Override
    public void checkReCaptcha(String token) {
        if (StringUtils.isEmpty(token)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_RECAPTCHA_TOKEN_NOT_VALID);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("secret", "6LeLC-IZAAAAACSeMMM8YBH3XgcDRfeuyXH53Xeq");
        map.add("response", token);
        //map.add("remoteip", "1");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        ResponseEntity<GoogleReCaptchaResponseDTO> response = this.restTemplate.postForEntity("https://www.google.com/recaptcha/api/siteverify", request, GoogleReCaptchaResponseDTO.class);

        if (!response.hasBody() || (response.getBody() == null) || !response.getBody().isSuccess()) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_RECAPTCHA_TOKEN_NOT_VALID);
        }
    }
}