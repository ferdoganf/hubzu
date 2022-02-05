package com.hubzu.api.controller;

import com.hubzu.api.dto.request.general.ContactUsDTO;
import com.hubzu.api.service.GeneralCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/rest/general")
public class GeneralController {

    @Autowired
    private GeneralCommandService generalCommandService;

    @PostMapping("/contactus")
    public void contactus(@RequestBody @Valid ContactUsDTO contactUsDTO) {
        this.generalCommandService.contactus(contactUsDTO);
    }
}
