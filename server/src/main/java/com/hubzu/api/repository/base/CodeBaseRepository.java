package com.hubzu.api.repository.base;

import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface CodeBaseRepository<T, ID> extends BaseRepository<T, ID> {
    Optional<T> findByCode(String code);

    boolean existsByCode(String code);
}
