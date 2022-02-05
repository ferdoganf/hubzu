package com.hubzu.api.controller;

import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.dto.secure.SecureUserDTO;
import com.hubzu.api.service.UserQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/user/controller")
public class UserController {

    @Autowired
    private UserQueryService userQueryService;

    @GetMapping("/users")
    public ResponseOfList<SecureUserDTO> getUsers() {
        return new ResponseOfList<>(this.userQueryService.getUsers());
    }
}
