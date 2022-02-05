package com.hubzu.api.controller.secure;

import com.hubzu.api.service.VisitorCommandService;
import com.hubzu.api.service.VisitorQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/secure/visitors")
public class SecureVisitorController {

    @Autowired
    private VisitorCommandService visitorCommandService;

    @Autowired
    private VisitorQueryService visitorQueryService;

    /*
    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<String> createVisitor(@RequestBody @Valid CreateVisitorDTO createVisitorDTO) {
        return new ResponseOfItem(this.visitorCommandService.createVisitor(createVisitorDTO));
    }

    @GetMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<VisitorDTO> getVisitor(@PathVariable("code") String code) {
        return new ResponseOfItem(this.visitorQueryService.getVisitorDTO(code));
    }


    @PostMapping("/search")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfPagedList<VisitorDTO> searchVisitor(@RequestBody @Valid SearchVisitorDTO searchVisitorDTO) {
        return this.visitorQueryService.searchVisitor(searchVisitorDTO);
    }
    */
}
