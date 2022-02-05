package com.hubzu.api.scheduledjobs;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.report.RealEstateStatusHistoryDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateStatusDTO;
import com.hubzu.api.service.MailCommandAsyncService;
import com.hubzu.api.service.ReportQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.format.DateTimeFormatter;

@Service
@Transactional(readOnly = true)
public class AdminReportsScheduledJobs {

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Autowired
    private ReportQueryService reportQueryService;

    private ZonedDateTime getZonedDateTime(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        return localDateTime.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneOffset.ofHours(3));
    }

    @Scheduled(cron = "1 1 1 * * SAT", zone = "Asia/Istanbul")
    public void realEstateStateChangesReport() {

        OffsetDateTime utc = OffsetDateTime.now(ZoneOffset.UTC);

        LocalDate startDate = utc.toLocalDate().minusDays(8);
        LocalDate endDate = utc.toLocalDate().minusDays(1);

        SearchRealEstateStatusDTO searchRealEstateStatusDTO = new SearchRealEstateStatusDTO();
        searchRealEstateStatusDTO.setStartDate(startDate);
        searchRealEstateStatusDTO.setEndDate(endDate);
        searchRealEstateStatusDTO.setPageNo(1);
        searchRealEstateStatusDTO.setPageSize(1000);
        searchRealEstateStatusDTO.setOrderBy("id");
        searchRealEstateStatusDTO.setOrderType("desc");


        ResponseOfPagedList<RealEstateStatusHistoryDTO> report = this.reportQueryService.searchRealEstateStatusChanges(searchRealEstateStatusDTO);

        java.util.Locale locale = new java.util.Locale("tr", "TR");
        DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("dd.MM.YYYY", locale);
        DateTimeFormatter formatterDateTime = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm", locale);

        StringBuilder reportTable = new StringBuilder();
        reportTable.append("<table border=\"1\">");
        reportTable.append("<tr>");
        reportTable.append("<td><b>İlan Kodu</b></td>");
        reportTable.append("<td><b>Bank</b></td>");
        reportTable.append("<td><b>Emlak Tipi</b></td>");
        reportTable.append("<td><b>İlan Başlığı</b></td>");
        reportTable.append("<td><b>İl</b></td>");
        reportTable.append("<td><b>İlçe</b></td>");
        reportTable.append("<td><b>Eski Durum</b></td>");
        reportTable.append("<td><b>Yeni Durum</b></td>");
        reportTable.append("<td><b>Tarih</b></td>");
        reportTable.append("</tr>");

        for (RealEstateStatusHistoryDTO realEstateStatusHistoryDTO : report.getValue()) {
            reportTable.append("<tr>");
            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getRealEstateCode());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getBankName());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getRealEstateTypeName());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getTitle());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getCityName());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getDistrictName());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getRealEstateStatusCodeOld());
            reportTable.append("</td>");

            reportTable.append("<td>");
            reportTable.append(realEstateStatusHistoryDTO.getRealEstateStatusCodeNew());
            reportTable.append("</td>");


            reportTable.append("<td>");
            reportTable.append(formatterDateTime.format(this.getZonedDateTime(realEstateStatusHistoryDTO.getCreatedDate()).toLocalDateTime()));
            reportTable.append("</td>");

            reportTable.append("</tr>");
        }

        reportTable.append("</table>");

        this.mailCommandAsyncService.sendRealestateStatesChangesReportoAdmins(formatterDate.format(startDate), formatterDate.format(endDate), reportTable.toString());
        long now = System.currentTimeMillis() / 1000;
        System.out.println(
                "schedule tasks using cron jobs - " + now);
    }
}
