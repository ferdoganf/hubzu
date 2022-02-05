package com.hubzu.api;

import com.hubzu.api.config.HubzuAuditorAware;
import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableAdminServer
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableScheduling
public class HubzuApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(HubzuApiApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public AuditorAware<String> auditorAware() {
        return new HubzuAuditorAware();
    }
}
