package com.hubzu.api.service;

import java.time.LocalDateTime;

public interface CalendarQueryService {
    LocalDateTime nextBusinessDate(LocalDateTime date);
}
