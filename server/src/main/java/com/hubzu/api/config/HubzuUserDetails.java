package com.hubzu.api.config;

import com.hubzu.api.dto.secure.SecureUserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class HubzuUserDetails implements UserDetails {

    private static final long serialVersionUID = -1195044310381534563L;
    private final SecureUserDTO user;

    public HubzuUserDetails(SecureUserDTO secureUserDTO) {
        this.user = secureUserDTO;
    }

    public Long getId() {
        return this.user.getId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<HubzuUserRole> hubzuUserRoles = new ArrayList<>();
        hubzuUserRoles.add(new HubzuUserRole(this.user.getUserType()));
        return hubzuUserRoles;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getEmailAddress();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
