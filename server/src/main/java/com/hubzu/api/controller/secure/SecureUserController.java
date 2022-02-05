package com.hubzu.api.controller.secure;

import com.hubzu.api.config.HubzuUserDetails;
import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.dto.request.user.UpdateMyPasswordDTO;
import com.hubzu.api.dto.request.user.UpdatePasswordDTO;
import com.hubzu.api.service.UserCommandService;
import com.hubzu.api.service.UserFavoriteCommandService;
import com.hubzu.api.service.UserFavoriteQueryService;
import com.hubzu.api.service.UserQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/rest/secure/users")
public class SecureUserController {

    @Autowired
    private UserQueryService userQueryService;

    @Autowired
    private UserFavoriteCommandService userFavoriteCommandService;

    @Autowired
    private UserFavoriteQueryService userFavoriteQueryService;

    @Autowired
    private UserCommandService userCommandService;

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('ADMIN','BUYER', 'VISITOR', 'OPERATION')")
    public ResponseOfItem<UserLightDTO> getUser(Authentication authentication, Principal principal) {
        Long id = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        return new ResponseOfItem<>(this.userQueryService.getUser(id));
    }


    @PreAuthorize("hasAnyAuthority('BUYER', 'VISITOR')")
    @PutMapping("/favorites/realEstates/{realEstateCode}")
    public void addRealEstateToFavorites(Authentication authentication, @PathVariable("realEstateCode") String realEstateCode) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.userFavoriteCommandService.addRealEstateToFavorites(userId, realEstateCode);
    }

    @PreAuthorize("hasAnyAuthority('BUYER', 'VISITOR')")
    @DeleteMapping("/favorites/realEstates/{realEstateCode}")
    public void removeRealEstateFromFavorites(Authentication authentication, @PathVariable("realEstateCode") String realEstateCode) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.userFavoriteCommandService.removeRealEstateFromFavorites(userId, realEstateCode);
    }

    @PreAuthorize("hasAnyAuthority('BUYER', 'VISITOR')")
    @GetMapping("/favorites")
    public ResponseOfList<CodeBaseDTO> getUserFavorites(Authentication authentication) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        return new ResponseOfList(this.userFavoriteQueryService.getUserFavorites(userId));
    }

    @PutMapping("/password")
    @PreAuthorize("hasAnyAuthority('BUYER', 'VISITOR', 'ADMIN', 'OPERATION')")
    public void updateMyPassword(Authentication authentication, @RequestBody UpdateMyPasswordDTO updateMyPasswordDTO) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.userCommandService.updateMyPassword(userId, updateMyPasswordDTO);
    }

    @PutMapping("/{code}/password")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void updatePassword(@PathVariable("code") String code, @RequestBody UpdatePasswordDTO updatePasswordDTO) {
        this.userCommandService.updatePassword(code, updatePasswordDTO);
    }

    @GetMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfItem<UserLightDTO> getVisitor(@PathVariable("code") String code) {
        return new ResponseOfItem(this.userQueryService.getUser(code));
    }


    @PutMapping("/{code}/status/active")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void activateUser(@PathVariable("code") String code) {
        this.userCommandService.activateUser(code);
    }

    @PutMapping("/{code}/status/passive")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void passivateUser(@PathVariable("code") String code) {
        this.userCommandService.passivateUser(code);
    }


}
