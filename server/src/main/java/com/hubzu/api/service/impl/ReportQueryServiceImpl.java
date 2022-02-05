package com.hubzu.api.service.impl;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.dto.report.RealEstateStatusHistoryDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateStatusDTO;
import com.hubzu.api.exception.HubzuTechnicalException;
import com.hubzu.api.model.audit.RealEstateStatusHistory;
import com.hubzu.api.model.audit.RealEstateStatusHistory_;
import com.hubzu.api.model.buyer.DirectBid;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.repository.audit.RealEstateStatusHistoryRepository;
import com.hubzu.api.service.*;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.VerticalAlignment;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
public class ReportQueryServiceImpl implements ReportQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportQueryServiceImpl.class);

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private StatsQueryService statsQueryService;

    @Autowired
    private BidQueryService bidQueryService;

    @Value("${hubzu.url.base}")
    private String baseUrl;

    @Autowired
    private RealEstateStatusHistoryRepository realEstateStatusHistoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private DirectBidQueryService directBidQueryService;

    private Paragraph getParagraph(String string, PdfFont font, int fontSize, Color color) {
        return new Paragraph(string)
                .setFont(font)
                .setFontSize(fontSize)
                .setFontColor(color);
    }

    private ZonedDateTime getZonedDateTime(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        return localDateTime.atZone(ZoneOffset.ofHours(3));
    }

    private Cell getDetailsTableCell(String string, PdfFont font) {
        return new Cell()
                .add(new Paragraph(string)
                        .setFont(font)
                        .setFontColor(ColorConstants.BLACK))
                .setBorder(Border.NO_BORDER)
                .setTextAlignment(TextAlignment.LEFT)
                .setHorizontalAlignment(HorizontalAlignment.LEFT)
                .setVerticalAlignment(VerticalAlignment.TOP)
                .setHeight(20)
                .setMaxHeight(20);
    }

    private Cell getDetailsTableCellBordered(String string, PdfFont font) {
        return new Cell()
                .add(new Paragraph(string == null ? "" : string)
                        .setFont(font)
                        .setFontColor(ColorConstants.BLACK))
                .setTextAlignment(TextAlignment.LEFT)
                .setHorizontalAlignment(HorizontalAlignment.LEFT)
                .setVerticalAlignment(VerticalAlignment.TOP);
    }

    @Override
    public byte[] getRealestateAuctionResultReport(String realEstateCode) {
        try {

            java.util.Locale locale = new java.util.Locale("tr", "TR");
            DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("dd MMMM yyyy", locale);
            DateTimeFormatter formatterDateTime = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm", locale);

            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(byteArrayOutputStream));
            Document document = new Document(pdfDoc);
            document.setMargins(48, 48, 48, 48);


            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD, "Cp1254");
            PdfFont fontTR = PdfFontFactory.createFont(StandardFonts.HELVETICA, "Cp1254");

            Table table = new Table(UnitValue.createPercentArray(1)).useAllAvailableWidth();
            table.setBorder(new SolidBorder(ColorConstants.GRAY, 2));

            ZonedDateTime auctionDate = this.getZonedDateTime(realEstate.getAuctionDate());
            ZonedDateTime startDate = this.getZonedDateTime(realEstate.getStartDate());
            ZonedDateTime endDate = this.getZonedDateTime(realEstate.getEndDate());


            Cell cell1 = new Cell();
            cell1.add(this.getParagraph(realEstate.getCode(), font, 30, ColorConstants.GRAY));
            cell1.add(this.getParagraph(realEstate.getTitle(), font, 24, ColorConstants.GRAY));

            if (startDate != null && endDate != null) {
                cell1.add(this.getParagraph(formatterDate.format(startDate.toLocalDateTime()) + " - " + formatterDate.format(endDate.toLocalDateTime()), font, 18, ColorConstants.BLACK));
            } else {
                cell1.add(this.getParagraph("", font, 18, ColorConstants.BLACK));
            }

            cell1.setPaddingTop(32);
            cell1.setBorder(Border.NO_BORDER);
            cell1.setTextAlignment(TextAlignment.CENTER);
            cell1.setHorizontalAlignment(HorizontalAlignment.CENTER);
            cell1.setVerticalAlignment(VerticalAlignment.TOP);
            cell1.setHeight(202);
            cell1.setMaxHeight(202);
            table.addCell(cell1);


            if (realEstate.getPhotos() != null && !realEstate.getPhotos().isEmpty()) {
                try {
                    String imgUrl = "/cdn" + realEstate.getPhotos().get(0).getPath() + '/' + realEstate.getPhotos().get(0).getFileName();
                    Image img1 = new Image(ImageDataFactory.create(this.baseUrl + imgUrl));
                    Cell cell2 = new Cell().add(img1.setWidth(346).setHorizontalAlignment(HorizontalAlignment.CENTER));
                    cell2.setBorder(Border.NO_BORDER);
                    cell2.setTextAlignment(TextAlignment.CENTER);
                    cell2.setHorizontalAlignment(HorizontalAlignment.CENTER);
                    cell2.setVerticalAlignment(VerticalAlignment.TOP);
                    cell2.setHeight(288);
                    cell2.setMaxHeight(288);
                    table.addCell(cell2);
                } catch (Exception e) {
                    Cell cell2 = new Cell().add(this.getParagraph("", font, 16, ColorConstants.BLACK));
                    cell2.setBorder(Border.NO_BORDER);
                    cell2.setTextAlignment(TextAlignment.CENTER);
                    cell2.setHorizontalAlignment(HorizontalAlignment.CENTER);
                    cell2.setVerticalAlignment(VerticalAlignment.TOP);
                    cell2.setHeight(288);
                    cell2.setMaxHeight(288);
                    table.addCell(cell2);
                }

            } else {

                Cell cell2 = new Cell().add(this.getParagraph("", font, 16, ColorConstants.BLACK));
                cell2.setBorder(Border.NO_BORDER);
                cell2.setTextAlignment(TextAlignment.CENTER);
                cell2.setHorizontalAlignment(HorizontalAlignment.CENTER);
                cell2.setVerticalAlignment(VerticalAlignment.TOP);
                cell2.setHeight(288);
                cell2.setMaxHeight(288);
                table.addCell(cell2);
            }


            String address = "";
            if (realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getCity() != null) {
                address = realEstate.getRealEstateAddress().getCity().getName();
                if (realEstate.getRealEstateAddress().getDistrict() != null) {
                    address = address + ", " + realEstate.getRealEstateAddress().getDistrict().getName();
                }
            }

            Cell cell3 = new Cell();
            cell3.add(this.getParagraph(address, font, 14, ColorConstants.BLACK));
            cell3.setBorder(Border.NO_BORDER);
            cell3.setTextAlignment(TextAlignment.CENTER);
            cell3.setHorizontalAlignment(HorizontalAlignment.CENTER);
            cell3.setVerticalAlignment(VerticalAlignment.TOP);
            cell3.setHeight(28);
            cell3.setMaxHeight(28);
            table.addCell(cell3);

            String bankLogo = "/banks/" + realEstate.getBank().getCode() + ".jpg";
            try (InputStream inputStream = new ClassPathResource(bankLogo).getInputStream()) {
                byte[] targetArray = IOUtils.toByteArray(inputStream);
                Image img = new Image(ImageDataFactory.create(targetArray));
                Cell cell4 = new Cell().add(img.setWidth(200).setHorizontalAlignment(HorizontalAlignment.CENTER));
                cell4.setVerticalAlignment(VerticalAlignment.BOTTOM);
                cell4.setHorizontalAlignment(HorizontalAlignment.CENTER);
                cell4.setTextAlignment(TextAlignment.CENTER);
                cell4.setBorder(Border.NO_BORDER);
                cell4.setHeight(178);
                cell4.setMaxHeight(178);
                table.addCell(cell4);
                document.add(table);
            } catch (Exception e) {
                LOGGER.error("bankLogo error", e);
            }

            document.add(new AreaBreak());

            document.add(this.getParagraph(realEstate.getCode() + " Emlak Kodlu Gayrımenkule Ait Bilgiler", font, 16, ColorConstants.BLACK));

            Table detailsTable = new Table(new float[]{1, 2});
            detailsTable.setBorder(Border.NO_BORDER);
            detailsTable.setWidth(300);

            detailsTable.addCell(this.getDetailsTableCell("Şehir:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getCity() != null ? realEstate.getRealEstateAddress().getCity().getName() : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("İlçe:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getDistrict() != null ? realEstate.getRealEstateAddress().getDistrict().getName() : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Pafta:", font));
            detailsTable.addCell(this.getDetailsTableCell("", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Ada:", font));
            detailsTable.addCell(this.getDetailsTableCell("", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Parsel:", font));
            detailsTable.addCell(this.getDetailsTableCell("", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Adres:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getAddressText() != null ? realEstate.getRealEstateAddress().getAddressText() + " " : "", fontTR));


            detailsTable.addCell(this.getDetailsTableCell("İlana Çıkış Tarihi:", font));
            detailsTable.addCell(this.getDetailsTableCell(auctionDate != null ? formatterDateTime.format(auctionDate.toLocalDateTime()) : "", fontTR));


            document.add(detailsTable);
            document.add(this.getParagraph("İhale Tarihçesi", font, 16, ColorConstants.BLACK).setMarginTop(20));

            Table auctionHistoryTable = new Table(new float[]{1, 1, 1, 1, 1, 1, 1, 1});
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Başlangıç", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Bitiş", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Başlangıç Bedeli", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Min. Artış", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("İstekli Sayısı", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Teklif Sayısı", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("En İyi Teklif", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("İzlenme Sayısı", font));

            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(startDate != null ? formatterDateTime.format(startDate.toLocalDateTime()) : "", fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(endDate != null ? formatterDateTime.format(endDate.toLocalDateTime()) : "", fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(realEstate.getStartingAmount() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getStartingAmount()) : "", fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(realEstate.getBidStep() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getBidStep()) : "", fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateBuyersCount(realEstateCode)), fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateBidsCount(realEstateCode)), fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(realEstate.getCurrentBid() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getCurrentBid().getBidAmount()) : "", fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateFavoritesCount(realEstateCode)), fontTR));


            document.add(auctionHistoryTable);

            document.add(this.getParagraph("Katılımcılar ve Tekliflerine Ait Bilgiler", font, 16, ColorConstants.BLACK).setMarginTop(20));
            Table auctionBuyersTable = new Table(new float[]{1, 1, 1, 1, 1, 1});
            auctionBuyersTable.addCell(this.getDetailsTableCellBordered("İstekli Adı", font));
            auctionBuyersTable.addCell(this.getDetailsTableCellBordered("T.C. Kimlik No", font));
            auctionBuyersTable.addCell(this.getDetailsTableCellBordered("Cep Tel", font));
            auctionBuyersTable.addCell(this.getDetailsTableCellBordered("E-posta", font));
            auctionBuyersTable.addCell(this.getDetailsTableCellBordered("Kaydı alan Şube", font));
            auctionBuyersTable.addCell(this.getDetailsTableCellBordered("En Yüksek Teklifi", font));

            List<RealEstateBidDTO> realEstateBidDTOS = this.bidQueryService.getBidsOfRealEstate(realEstateCode);
            List<String> buyerCodePrinted = new ArrayList<>();
            for (RealEstateBidDTO realEstateBidDTO : realEstateBidDTOS) {
                if (realEstateBidDTO.getBuyer() != null && StringUtils.isNotEmpty(realEstateBidDTO.getBuyer().getCode())) {
                    if (!buyerCodePrinted.contains(realEstateBidDTO.getBuyer().getCode())) {
                        auctionBuyersTable.addCell(this.getDetailsTableCellBordered(realEstateBidDTO.getBuyer().getName() + " " + realEstateBidDTO.getBuyer().getSurname(), fontTR));
                        auctionBuyersTable.addCell(this.getDetailsTableCellBordered(realEstateBidDTO.getBuyer().getIdentityNumber(), fontTR));
                        auctionBuyersTable.addCell(this.getDetailsTableCellBordered(realEstateBidDTO.getBuyer().getPhoneCountryCode() + realEstateBidDTO.getBuyer().getPhone(), fontTR));
                        auctionBuyersTable.addCell(this.getDetailsTableCellBordered(realEstateBidDTO.getBuyer().getEmailAddress(), fontTR));
                        auctionBuyersTable.addCell(this.getDetailsTableCellBordered("", fontTR));
                        auctionBuyersTable.addCell(this.getDetailsTableCellBordered(NumberFormat.getCurrencyInstance(locale).format(realEstateBidDTO.getBidAmount()), fontTR));
                        buyerCodePrinted.add(realEstateBidDTO.getBuyer().getCode());
                    }
                }
            }


            document.add(auctionBuyersTable);


            document.add(this.getParagraph("Teklif Listesi", font, 16, ColorConstants.BLACK).setMarginTop(20));
            int m = realEstateBidDTOS.size();
            for (RealEstateBidDTO realEstateBidDTO : realEstateBidDTOS) {
                document.add(this.getParagraph((m--) + " - " + realEstateBidDTO.getBuyer().getName() + " " + realEstateBidDTO.getBuyer().getSurname() + " - " + NumberFormat.getCurrencyInstance(locale).format(realEstateBidDTO.getBidAmount()) + " / " + formatterDateTime.format(realEstateBidDTO.getCreatedDate()), fontTR, 12, ColorConstants.BLACK));
            }


            Table auctionAmountsTable = new Table(new float[]{1, 1, 1, 1});
            auctionAmountsTable.setMarginTop(20);
            auctionAmountsTable.setWidth(UnitValue.createPercentValue(100));

            auctionAmountsTable.addCell(this.getDetailsTableCellBordered("Başlangıç Bedeli", font));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered("En İyi Teklif", font));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered("Yüzde Artış", font));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered("Artış Miktarı", font));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered(realEstate.getStartingAmount() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getStartingAmount()) : "", fontTR));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered(realEstate.getCurrentBid() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getCurrentBid().getBidAmount()) : "", fontTR));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered(realEstate.getCurrentBid() != null && realEstate.getStartingAmount() != null ? "% " + realEstate.getCurrentBid().getBidAmount().subtract(realEstate.getStartingAmount()).multiply(BigDecimal.valueOf(100)).divide(realEstate.getStartingAmount(), 2, RoundingMode.HALF_DOWN).doubleValue() : "", fontTR));
            auctionAmountsTable.addCell(this.getDetailsTableCellBordered(realEstate.getCurrentBid() != null && realEstate.getStartingAmount() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getCurrentBid().getBidAmount().subtract(realEstate.getStartingAmount())) : "", fontTR));


            document.add(auctionAmountsTable);

            document.add(this.getParagraph("Tapu Bilgileri", font, 16, ColorConstants.BLACK).setMarginTop(20));
            document.add(this.getParagraph("Taşınmazın tapu devri, ihaleyi kazanan isteklinin talebi doğrultusunda aşağıda\n" +
                    "belirtilen kişiler ve hisse oranları çerçevesinde yapılacaktır:", fontTR, 12, ColorConstants.BLACK).setMarginTop(2));

            Table deedTable = new Table(new float[]{1, 1, 1, 1});
            deedTable.setWidth(UnitValue.createPercentValue(100));

            deedTable.addCell(this.getDetailsTableCellBordered("T.C. Kimlik No", font));
            deedTable.addCell(this.getDetailsTableCellBordered("Ad", font));
            deedTable.addCell(this.getDetailsTableCellBordered("Soyad", font));
            deedTable.addCell(this.getDetailsTableCellBordered("Pay", font));

            for (int i = 0; i < 12; i++) {
                deedTable.addCell(new Cell()
                        .add(new Paragraph("...")
                                .setFont(font)
                                .setFontColor(ColorConstants.WHITE))
                        .setTextAlignment(TextAlignment.LEFT)
                        .setHorizontalAlignment(HorizontalAlignment.LEFT)
                        .setVerticalAlignment(VerticalAlignment.TOP));
            }

            deedTable.addCell(new Cell(1, 3)
                    .add(new Paragraph("Toplam")
                            .setFont(font)
                            .setFontColor(ColorConstants.BLACK))
                    .setTextAlignment(TextAlignment.LEFT)
                    .setHorizontalAlignment(HorizontalAlignment.LEFT)
                    .setVerticalAlignment(VerticalAlignment.TOP));
            deedTable.addCell(new Cell()
                    .add(new Paragraph("...")
                            .setFont(font)
                            .setFontColor(ColorConstants.WHITE))
                    .setTextAlignment(TextAlignment.LEFT)
                    .setHorizontalAlignment(HorizontalAlignment.LEFT)
                    .setVerticalAlignment(VerticalAlignment.TOP));

            document.add(deedTable);


            document.add(this.getParagraph("Sonuç", font, 16, ColorConstants.BLACK).setMarginTop(20));
            document.add(this.getParagraph(
                    realEstate.getCode() +
                            " nolu " +
                            realEstate.getTitle() +
                            " isimli gayrimenkulün" +
                            " satış ihalesi " +
                            (startDate != null ? formatterDate.format(startDate.toLocalDateTime()) : "") +
                            " - " +
                            (endDate != null ? formatterDate.format(endDate.toLocalDateTime()) : "") +
                            " tarihleri arasında gerçekleştirilmiş olup, ihaleyi " +
                            (realEstate.getCurrentBid() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getCurrentBid().getBidAmount()) : "") +
                            " ile en yüksek teklif veren " +
                            (realEstate.getCurrentBid() != null ? realEstate.getCurrentBid().getBuyer().getName() + " " + realEstate.getCurrentBid().getBuyer().getSurname() : "") +
                            " kazanmıştır.", fontTR, 12, ColorConstants.BLACK).setMarginTop(2));


            Paragraph header = new Paragraph("Gizlidir")
                    .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA))
                    .setFontSize(16)
                    .setFontColor(ColorConstants.BLACK);

            Paragraph lineParagraph = new Paragraph("").setFontColor(ColorConstants.GRAY);
            SolidLine line = new SolidLine(2f);
            line.setColor(ColorConstants.GRAY);
            LineSeparator ls = new LineSeparator(line);
            ls.setWidth(499);
            lineParagraph.add(ls);
            for (int i = 2; i <= pdfDoc.getNumberOfPages(); i++) {
                try {
                    Rectangle pageSize = pdfDoc.getPage(i).getPageSize();
                    float x = pageSize.getWidth() - 48;
                    float y = pageSize.getTop() - 30;
                    document.showTextAligned(header, x, y, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
                    document.showTextAligned(lineParagraph, 48, y - 6, i, TextAlignment.LEFT, VerticalAlignment.BOTTOM, 0);
                    document.showTextAligned(lineParagraph, 48, pageSize.getBottom() + 16, i, TextAlignment.LEFT, VerticalAlignment.BOTTOM, 0);
                } catch (Exception e) {
                    LOGGER.error("getRealestateAuctionResultReport", e);
                }
            }


            document.close();
            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            LOGGER.error("getRealestateAuctionResultReport", e);
            throw new HubzuTechnicalException();
        }
    }


    private <T> List<Predicate> preparePredicates(SearchRealEstateStatusDTO searchRealEstateStatusDTO, CriteriaBuilder criteriaBuilder, Root<T> realEstateStatusHistory) {
        List<Predicate> predicates = new ArrayList<>();

        if (searchRealEstateStatusDTO.getStartDate() != null) {
            LocalDateTime startDate = LocalDateTime.ofInstant(searchRealEstateStatusDTO.getStartDate().atStartOfDay().atZone(ZoneId.of("Asia/Istanbul")).toInstant(), ZoneOffset.UTC);
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(realEstateStatusHistory.get(RealEstateStatusHistory_.CREATED_DATE), startDate));
        }

        if (searchRealEstateStatusDTO.getEndDate() != null) {
            LocalDateTime endDate = LocalDateTime.ofInstant(searchRealEstateStatusDTO.getEndDate().plusDays(1).atStartOfDay().atZone(ZoneId.of("Asia/Istanbul")).toInstant(), ZoneOffset.UTC);
            predicates.add(criteriaBuilder.lessThan(realEstateStatusHistory.get(RealEstateStatusHistory_.CREATED_DATE), endDate));
        }

        if (StringUtils.isNotEmpty(searchRealEstateStatusDTO.getSearchString())) {
            Predicate realEstateCodePredicate = criteriaBuilder.like(realEstateStatusHistory.get(RealEstateStatusHistory_.REAL_ESTATE_CODE), "%" + searchRealEstateStatusDTO.getSearchString() + "%");
            Predicate realEstateTitlePredicate = criteriaBuilder.like(realEstateStatusHistory.get(RealEstateStatusHistory_.TITLE), "%" + searchRealEstateStatusDTO.getSearchString() + "%");
            Predicate searchCityBySearchStringPredicate = criteriaBuilder.like(realEstateStatusHistory.get(RealEstateStatusHistory_.CITY_NAME), "%" + searchRealEstateStatusDTO.getSearchString() + "%");
            Predicate searchDistrictBySearchStringPredicate = criteriaBuilder.like(realEstateStatusHistory.get(RealEstateStatusHistory_.DISTRICT_NAME), "%" + searchRealEstateStatusDTO.getSearchString() + "%");
            Predicate searchRealEstateTypeBySearchStringPredicate = criteriaBuilder.like(realEstateStatusHistory.get(RealEstateStatusHistory_.REAL_ESTATE_TYPE_NAME), "%" + searchRealEstateStatusDTO.getSearchString() + "%");
            Predicate searchBankBySearchStringPredicate = criteriaBuilder.like(realEstateStatusHistory.get(RealEstateStatusHistory_.BANK_NAME), "%" + searchRealEstateStatusDTO.getSearchString() + "%");

            Predicate searchStringPredicate = criteriaBuilder.or(realEstateCodePredicate, realEstateTitlePredicate, searchCityBySearchStringPredicate, searchDistrictBySearchStringPredicate, searchRealEstateTypeBySearchStringPredicate, searchBankBySearchStringPredicate);
            predicates.add(searchStringPredicate);
        }
        return predicates;
    }

    private CriteriaQuery<RealEstateStatusHistory> searchRealEstateStatusChangesResult(CriteriaBuilder criteriaBuilder, SearchRealEstateStatusDTO searchRealEstateStatusDTO) {
        CriteriaQuery<RealEstateStatusHistory> criteriaQuery = criteriaBuilder.createQuery(RealEstateStatusHistory.class);
        Root<RealEstateStatusHistory> realEstateStatusHistory = criteriaQuery.from(RealEstateStatusHistory.class);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateStatusDTO, criteriaBuilder, realEstateStatusHistory);
        criteriaQuery.select(realEstateStatusHistory).where(predicates.toArray(new Predicate[0])).getRoots();

        if (StringUtils.isNotEmpty(searchRealEstateStatusDTO.getOrderType()) && searchRealEstateStatusDTO.getOrderType().equalsIgnoreCase("desc")) {
            criteriaQuery.orderBy(criteriaBuilder.desc(realEstateStatusHistory.get(searchRealEstateStatusDTO.getOrderBy())));
        } else {
            criteriaQuery.orderBy(criteriaBuilder.asc(realEstateStatusHistory.get(searchRealEstateStatusDTO.getOrderBy())));
        }
        return criteriaQuery;
    }


    private CriteriaQuery<Long> searchRealEstateStatusChangesCount(CriteriaBuilder criteriaBuilder, SearchRealEstateStatusDTO searchRealEstateStatusDTO) {
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<RealEstateStatusHistory> RealEstateStatusHistory = criteriaQuery.from(RealEstateStatusHistory.class);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateStatusDTO, criteriaBuilder, RealEstateStatusHistory);
        criteriaQuery.select(criteriaBuilder.count(RealEstateStatusHistory)).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    @Override
    public ResponseOfPagedList<RealEstateStatusHistoryDTO> searchRealEstateStatusChanges(SearchRealEstateStatusDTO searchRealEstateStatusDTO) {
        try {
            CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();

            CriteriaQuery<Long> totalCountQuery = this.searchRealEstateStatusChangesCount(criteriaBuilder, searchRealEstateStatusDTO);
            TypedQuery<Long> countQuery = this.entityManager.createQuery(totalCountQuery);
            Long totalCount = countQuery.getSingleResult();
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {
                CriteriaQuery<RealEstateStatusHistory> realestateCriteriaQuery = this.searchRealEstateStatusChangesResult(criteriaBuilder, searchRealEstateStatusDTO);

                Query query = this.entityManager.createQuery(realestateCriteriaQuery);
                int pageNumber = searchRealEstateStatusDTO.getPageNo();
                int pageSize = searchRealEstateStatusDTO.getPageSize();
                query.setFirstResult((pageNumber - 1) * pageSize);
                query.setMaxResults(pageSize);
                List<RealEstateStatusHistory> resultList = query.getResultList();

                return new ResponseOfPagedList(totalCount, resultList.stream().map(RealEstateStatusHistoryDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstateStatusChanges", e);
            throw new HubzuTechnicalException();
        }
    }

    @Override
    public byte[] getBidEvaluationreportReport(String realEstateCode, Long directBidId) {
        try {

            java.util.Locale locale = new java.util.Locale("tr", "TR");
            DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("dd MMMM yyyy", locale);
            DateTimeFormatter formatterDateTime = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm", locale);

            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
            DirectBid directBid = this.directBidQueryService.checkAndGetDirectBid(directBidId);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(byteArrayOutputStream));
            Document document = new Document(pdfDoc);
            document.setMargins(48, 48, 48, 48);


            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD, "Cp1254");
            PdfFont fontTR = PdfFontFactory.createFont(StandardFonts.HELVETICA, "Cp1254");

            Table table = new Table(UnitValue.createPercentArray(1)).useAllAvailableWidth();
            table.setBorder(new SolidBorder(ColorConstants.GRAY, 2));

            ZonedDateTime auctionDate = this.getZonedDateTime(realEstate.getAuctionDate());
            ZonedDateTime startDate = this.getZonedDateTime(realEstate.getStartDate());
            ZonedDateTime endDate = this.getZonedDateTime(realEstate.getEndDate());


            Cell cell1 = new Cell();
            cell1.add(this.getParagraph(realEstate.getCode(), font, 30, ColorConstants.GRAY));
            cell1.add(this.getParagraph(realEstate.getTitle(), font, 24, ColorConstants.GRAY));

            if (startDate != null && endDate != null) {
                cell1.add(this.getParagraph(formatterDate.format(startDate.toLocalDateTime()) + " - " + formatterDate.format(endDate.toLocalDateTime()), font, 18, ColorConstants.BLACK));
            } else {
                cell1.add(this.getParagraph("", font, 18, ColorConstants.BLACK));
            }

            cell1.setPaddingTop(32);
            cell1.setBorder(Border.NO_BORDER);
            cell1.setTextAlignment(TextAlignment.CENTER);
            cell1.setHorizontalAlignment(HorizontalAlignment.CENTER);
            cell1.setVerticalAlignment(VerticalAlignment.TOP);
            cell1.setHeight(202);
            cell1.setMaxHeight(202);
            table.addCell(cell1);


            if (realEstate.getPhotos() != null && !realEstate.getPhotos().isEmpty()) {
                try {
                    String imgUrl = "/cdn" + realEstate.getPhotos().get(0).getPath() + '/' + realEstate.getPhotos().get(0).getFileName();
                    Image img1 = new Image(ImageDataFactory.create(this.baseUrl + imgUrl));
                    Cell cell2 = new Cell().add(img1.setWidth(346).setHorizontalAlignment(HorizontalAlignment.CENTER));
                    cell2.setBorder(Border.NO_BORDER);
                    cell2.setTextAlignment(TextAlignment.CENTER);
                    cell2.setHorizontalAlignment(HorizontalAlignment.CENTER);
                    cell2.setVerticalAlignment(VerticalAlignment.TOP);
                    cell2.setHeight(288);
                    cell2.setMaxHeight(288);
                    table.addCell(cell2);
                } catch (Exception e) {
                    Cell cell2 = new Cell().add(this.getParagraph("", font, 16, ColorConstants.BLACK));
                    cell2.setBorder(Border.NO_BORDER);
                    cell2.setTextAlignment(TextAlignment.CENTER);
                    cell2.setHorizontalAlignment(HorizontalAlignment.CENTER);
                    cell2.setVerticalAlignment(VerticalAlignment.TOP);
                    cell2.setHeight(288);
                    cell2.setMaxHeight(288);
                    table.addCell(cell2);
                }

            } else {

                Cell cell2 = new Cell().add(this.getParagraph("", font, 16, ColorConstants.BLACK));
                cell2.setBorder(Border.NO_BORDER);
                cell2.setTextAlignment(TextAlignment.CENTER);
                cell2.setHorizontalAlignment(HorizontalAlignment.CENTER);
                cell2.setVerticalAlignment(VerticalAlignment.TOP);
                cell2.setHeight(288);
                cell2.setMaxHeight(288);
                table.addCell(cell2);
            }


            String address = "";
            if (realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getCity() != null) {
                address = realEstate.getRealEstateAddress().getCity().getName();
                if (realEstate.getRealEstateAddress().getDistrict() != null) {
                    address = address + ", " + realEstate.getRealEstateAddress().getDistrict().getName();
                }
            }

            Cell cell3 = new Cell();
            cell3.add(this.getParagraph(address, font, 14, ColorConstants.BLACK));
            cell3.setBorder(Border.NO_BORDER);
            cell3.setTextAlignment(TextAlignment.CENTER);
            cell3.setHorizontalAlignment(HorizontalAlignment.CENTER);
            cell3.setVerticalAlignment(VerticalAlignment.TOP);
            cell3.setHeight(28);
            cell3.setMaxHeight(28);
            table.addCell(cell3);

            String bankLogo = "/banks/" + realEstate.getBank().getCode() + ".jpg";
            try (InputStream inputStream = new ClassPathResource(bankLogo).getInputStream()) {
                byte[] targetArray = IOUtils.toByteArray(inputStream);
                Image img = new Image(ImageDataFactory.create(targetArray));
                Cell cell4 = new Cell().add(img.setWidth(200).setHorizontalAlignment(HorizontalAlignment.CENTER));
                cell4.setVerticalAlignment(VerticalAlignment.BOTTOM);
                cell4.setHorizontalAlignment(HorizontalAlignment.CENTER);
                cell4.setTextAlignment(TextAlignment.CENTER);
                cell4.setBorder(Border.NO_BORDER);
                cell4.setHeight(178);
                cell4.setMaxHeight(178);
                table.addCell(cell4);
                document.add(table);
            } catch (Exception e) {
                LOGGER.error("bankLogo error", e);
            }

            document.add(new AreaBreak());

            document.add(this.getParagraph(realEstate.getCode() + " Emlak Kodlu Gayrımenkule Ait Bilgiler", font, 16, ColorConstants.BLACK));

            Table detailsTable = new Table(new float[]{1, 2});
            detailsTable.setBorder(Border.NO_BORDER);
            detailsTable.useAllAvailableWidth();

            detailsTable.addCell(this.getDetailsTableCell("Şehir:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getCity() != null ? realEstate.getRealEstateAddress().getCity().getName() : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("İlçe:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getDistrict() != null ? realEstate.getRealEstateAddress().getDistrict().getName() : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Semt/Mahalle:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getNeighborhood() != null ? realEstate.getRealEstateAddress().getNeighborhood().getName() : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Pafta:", font));
            detailsTable.addCell(this.getDetailsTableCell("", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Ada:", font));
            detailsTable.addCell(this.getDetailsTableCell("", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Parsel:", font));
            detailsTable.addCell(this.getDetailsTableCell("", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Adres:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getRealEstateAddress().getAddressText() != null ? realEstate.getRealEstateAddress().getAddressText() + " " : "", fontTR));


            detailsTable.addCell(this.getDetailsTableCell("İlana Çıkış Tarihi:", font));
            detailsTable.addCell(this.getDetailsTableCell(startDate != null ? formatterDateTime.format(auctionDate.toLocalDateTime()) : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Başlangıç Bedeli:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getStartingAmount() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getStartingAmount()) : "", fontTR));

            detailsTable.addCell(this.getDetailsTableCell("Min. Artış:", font));
            detailsTable.addCell(this.getDetailsTableCell(realEstate.getBidStep() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getBidStep()) : "", fontTR));


            document.add(detailsTable);


            document.add(this.getParagraph("İhale Tarihçesi", font, 16, ColorConstants.BLACK).setMarginTop(20));

            Table auctionHistoryTable = new Table(new float[]{1, 1, 1, 1, 1, 1});
            auctionHistoryTable.useAllAvailableWidth();
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("İstekli Sayısı", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Teklif Sayısı", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("En İyi Teklif", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("İzlenme Sayısı", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Görüntülenme Sayısı", font));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered("Görüntülenme Sayısı (IP Bazlı Gruplanmış)", font));

            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateBuyersCount(realEstateCode)), fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateBidsCount(realEstateCode)), fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(realEstate.getCurrentBid() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getCurrentBid().getBidAmount()) : "", fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateFavoritesCount(realEstateCode)), fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateUserViews(realEstateCode).getTotal()), fontTR));
            auctionHistoryTable.addCell(this.getDetailsTableCellBordered(String.valueOf(this.statsQueryService.getRealestateUserViews(realEstateCode).getTotalIpFiltered()), fontTR));

            document.add(auctionHistoryTable);

            document.add(this.getParagraph("Fiyat Teklifleri", font, 16, ColorConstants.BLACK).setMarginTop(20));
            Table bidTable = new Table(new float[]{1, 1, 1});
            bidTable.useAllAvailableWidth();

            bidTable.addCell(this.getDetailsTableCellBordered("İlana Kod", font));
            bidTable.addCell(this.getDetailsTableCellBordered("İlan Fiyatı", font));
            bidTable.addCell(this.getDetailsTableCellBordered("Fiyat Teklifi", font));

            bidTable.addCell(this.getDetailsTableCellBordered(realEstate.getCode(), font));
            bidTable.addCell(this.getDetailsTableCellBordered(realEstate.getStartingAmount() != null ? NumberFormat.getCurrencyInstance(locale).format(realEstate.getStartingAmount()) : "", fontTR));
            bidTable.addCell(this.getDetailsTableCellBordered(directBid.getBidAmount() != null ? NumberFormat.getCurrencyInstance(locale).format(directBid.getBidAmount()) : "", fontTR));

            document.add(bidTable);

            if (StringUtils.isNotEmpty(directBid.getDescription())) {
                document.add(this.getParagraph("Yorum", font, 16, ColorConstants.BLACK).setMarginTop(20));
                Table commentTable = new Table(new float[]{1});
                commentTable.useAllAvailableWidth();
                commentTable.addCell(this.getDetailsTableCellBordered(directBid.getDescription(), font));
                document.add(commentTable);
            }

            Paragraph header = new Paragraph("Gizlidir")
                    .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA))
                    .setFontSize(16)
                    .setFontColor(ColorConstants.BLACK);

            Paragraph lineParagraph = new Paragraph("").setFontColor(ColorConstants.GRAY);
            SolidLine line = new SolidLine(2f);
            line.setColor(ColorConstants.GRAY);
            LineSeparator ls = new LineSeparator(line);
            ls.setWidth(499);
            lineParagraph.add(ls);
            for (int i = 2; i <= pdfDoc.getNumberOfPages(); i++) {
                try {
                    Rectangle pageSize = pdfDoc.getPage(i).getPageSize();
                    float x = pageSize.getWidth() - 48;
                    float y = pageSize.getTop() - 30;
                    document.showTextAligned(header, x, y, i, TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
                    document.showTextAligned(lineParagraph, 48, y - 6, i, TextAlignment.LEFT, VerticalAlignment.BOTTOM, 0);
                    document.showTextAligned(lineParagraph, 48, pageSize.getBottom() + 16, i, TextAlignment.LEFT, VerticalAlignment.BOTTOM, 0);
                } catch (Exception e) {
                    LOGGER.error("getBidEvaluationreportReport", e);
                }
            }


            document.close();
            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            LOGGER.error("getBidEvaluationreportReport", e);
            throw new HubzuTechnicalException();
        }
    }
}
