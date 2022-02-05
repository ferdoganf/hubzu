package com.hubzu.api.service.impl;

import com.hubzu.api.repository.calendar.HolidayRepository;
import com.hubzu.api.service.CalendarQueryService;
import com.hubzu.api.util.BusinessConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
public class CalendarQueryServiceImpl implements CalendarQueryService {

    @Autowired
    private HolidayRepository holidayRepository;

    @Override
    public LocalDateTime nextBusinessDate(LocalDateTime datetime) {
        boolean isHoliday = true;
        int dayToAdd = -1;
        while (isHoliday) {
            dayToAdd++;
            LocalDate date = datetime.toLocalDate().plusDays(dayToAdd);
            isHoliday = this.holidayRepository.existsByCalendarCodeAndHolidayDate(BusinessConstants.Calendar.TR.name(), date)
                    || date.getDayOfWeek().equals(DayOfWeek.SATURDAY) || date.getDayOfWeek().equals(DayOfWeek.SUNDAY);
        }
        if (dayToAdd > 0) {
            return datetime.plusDays(dayToAdd).withHour(9).withMinute(0).withSecond(0).withNano(0);
        } else {
            return datetime;
        }
    }
}
