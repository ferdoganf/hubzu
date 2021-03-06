package com.hubzu.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class HubzuThreadConfig {

    @Bean(name = "hubzuAsyncTaskExecutor")
    public TaskExecutor hubzuAsyncTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(2);
        executor.setQueueCapacity(1000);
        executor.setKeepAliveSeconds(600);
        executor.setThreadNamePrefix("hubzuAsyncTaskExecutor_thread");
        executor.initialize();
        return executor;
    }
}
