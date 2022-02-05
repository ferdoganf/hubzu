package com.hubzu.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;

@Configuration
@EnableAuthorizationServer
public class HubzuAuthorizationServerConfigurerAdapter extends AuthorizationServerConfigurerAdapter {

    @Value("${hubzu.security.jwt.client-id-web}")
    private String clientIdWeb;

    @Value("${hubzu.security.jwt.client-secret-web}")
    private String clientSecretWeb;


    @Value("${hubzu.security.access-token-validity-seconds-web}")
    private Integer accessTokenValiditySecondsWeb;

    @Value("${hubzu.security.refresh-token-validity-seconds-web}")
    private Integer refreshTokenValiditySecondsWeb;


    private AuthenticationManager authenticationManagerBean;

    @Autowired
    public void setAuthenticationManagerBean(AuthenticationManager authenticationManagerBean) {
        this.authenticationManagerBean = authenticationManagerBean;
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients
                .inMemory()
                .withClient(this.clientIdWeb)
                .secret(this.clientSecretWeb)
                .authorizedGrantTypes("password", "refresh_token")
                .scopes("all")
                .accessTokenValiditySeconds(this.accessTokenValiditySecondsWeb)
                .refreshTokenValiditySeconds(this.refreshTokenValiditySecondsWeb);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints.authenticationManager(this.authenticationManagerBean);
    }


}
