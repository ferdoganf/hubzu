package com.hubzu.api.controller;

import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.dto.request.user.CreateVisitorDTO;
import com.hubzu.api.service.VisitorCommandService;
import com.hubzu.api.service.VisitorQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rest/visitors")
public class VisitorController {

    @Autowired
    private VisitorCommandService visitorCommandService;

    @Autowired
    private VisitorQueryService visitorQueryService;

    @PostMapping("")
    public ResponseOfItem<String> createVisitor(@RequestBody @Valid CreateVisitorDTO createVisitorDTO) {
        return new ResponseOfItem(this.visitorCommandService.createVisitor(createVisitorDTO));
    }

    @GetMapping("/verify/{code}")
    public ResponseOfItem<String> activateVisitor(@PathVariable("code") String code) {
        return new ResponseOfItem<>(this.visitorCommandService.activateVisitor(code));
    }
}
