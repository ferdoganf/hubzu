package com.hubzu.api.config;

import com.hubzu.api.dto.secure.SecureUserDTO;
import com.hubzu.api.service.UserQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class HubzuUserDetailsService implements UserDetailsService {

    @Autowired
    private UserQueryService userQueryService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        SecureUserDTO secureUserDTO = this.userQueryService.getUserByEmailAddress(username);
        if (secureUserDTO == null) {
            throw new UsernameNotFoundException(username);
        }
        return new HubzuUserDetails(secureUserDTO);
    }
}