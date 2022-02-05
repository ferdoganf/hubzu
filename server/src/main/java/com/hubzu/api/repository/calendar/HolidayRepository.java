package com.hubzu.api.repository.calendar;

import com.hubzu.api.model.calendar.Holiday;
import com.hubzu.api.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface HolidayRepository extends BaseRepository<Holiday, Long> {
    boolean existsByCalendarCodeAndHolidayDate(String name, LocalDate date);
}
