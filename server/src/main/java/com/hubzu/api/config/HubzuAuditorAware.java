package com.hubzu.api.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class HubzuAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        if (authentication.getPrincipal() == null) {
            return Optional.empty();
        }

        if (!(authentication.getPrincipal() instanceof HubzuUserDetails)) {
            return Optional.empty();
        }
        return Optional.of(((HubzuUserDetails) authentication.getPrincipal()).getId().toString());
    }
}