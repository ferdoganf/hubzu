package com.hubzu.api.repository.content;

import com.hubzu.api.model.template.Sms;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsRepository extends CodeBaseRepository<Sms, Long> {
}
