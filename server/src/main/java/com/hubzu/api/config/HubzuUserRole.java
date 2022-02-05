package com.hubzu.api.config;

import lombok.Data;
import lombok.NonNull;
import org.springframework.security.core.GrantedAuthority;

@Data
public class HubzuUserRole implements GrantedAuthority {
    private static final long serialVersionUID = 2746002218856749849L;

    @NonNull
    private String role;


    @Override
    public String getAuthority() {
        return this.role;
    }
}
