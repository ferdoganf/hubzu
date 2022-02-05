package com.hubzu.api.service.impl;

import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.buyer.UserFavouriteDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.service.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MailCommandAsyncServiceImpl implements MailCommandAsyncService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailCommandAsyncServiceImpl.class);


    @Autowired
    private BidQueryService bidQueryService;

    @Autowired
    private MailCommandService mailCommandService;

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private BuyerQueryService buyerQueryService;

    @Value("${hubzu.mail.contactus.to}")
    private String contactUsToMail;

    @Value("${hubzu.mail.admin}")
    private String adminEmail;

    @Override
    @Async("hubzuAsyncTaskExecutor")
    public void sendNotificationToFavoriteOwners(String buyerCode, String realestateCode) {

        String mailFile = "/mail/notification_to_favorite_owner.html";

        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(realestateCode);
        String realEstateCode = realEstateDTO.getCode();
        String realEstateTitle = realEstateDTO.getTitle();

        ZoneOffset zoneOffSet = ZoneOffset.of("+03:00");
        LocalDateTime auctionEndDate = realEstateDTO.getEndDate().atOffset(zoneOffSet).toLocalDateTime();

        List<UserFavouriteDTO> userFavouriteDTOS = this.realEstateQueryService.favorites(realestateCode);
        if (userFavouriteDTOS != null && !userFavouriteDTOS.isEmpty()) {

            try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
                String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
                mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
                mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);
                mail = StringUtils.replace(mail, "{AUCTION_END_DATE}", DateTimeFormatter.ofPattern("dd.MM.YYYY HH:mm").format(auctionEndDate));

                for (UserFavouriteDTO userFavouriteDTO : userFavouriteDTOS) {
                    if (!userFavouriteDTO.getBuyer().getCode().equalsIgnoreCase(buyerCode)) {
                        String name = userFavouriteDTO.getBuyer().getName();
                        String surname = userFavouriteDTO.getBuyer().getSurname();
                        String emailAddress = userFavouriteDTO.getBuyer().getEmailAddress();
                        String userMail = StringUtils.replace(mail, "{NAME}", name);
                        userMail = StringUtils.replace(userMail, "{SURNAME}", surname);
                        this.mailCommandService.sendMail(new String[]{emailAddress}, "İlgilendiğiniz Gayrimenkule Teklif Verildi", userMail);
                    }
                }

            } catch (Exception e) {
                LOGGER.error("sendNotificationToFavoriteOwners", e);
            }
        }
    }

    @Override
    @Async("hubzuAsyncTaskExecutor")
    public void sendNotificationToOldBidder(Long bidId) {
        Bid bid = this.bidQueryService.getBid(bidId);
        if (bid != null) {
            String emailAddress = bid.getBuyer().getEmailAddress();
            String name = bid.getBuyer().getName();
            String surname = bid.getBuyer().getSurname();
            String realEstateCode = bid.getRealEstate().getCode();
            String realEstateTitle = bid.getRealEstate().getTitle();


            ZoneOffset zoneOffSet = ZoneOffset.of("+03:00");
            LocalDateTime auctionEndDate = bid.getRealEstate().getEndDate().atOffset(zoneOffSet).toLocalDateTime();

            String mailFile = "/mail/notification_to_old_bidder.html";
            try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
                String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
                mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
                mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);
                mail = StringUtils.replace(mail, "{NAME}", name);
                mail = StringUtils.replace(mail, "{SURNAME}", surname);
                mail = StringUtils.replace(mail, "{AUCTION_END_DATE}", DateTimeFormatter.ofPattern("dd.MM.YYYY HH:mm").format(auctionEndDate));
                this.mailCommandService.sendMail(new String[]{emailAddress}, "Teklifinizi Revize Etmelisiniz", mail);
            } catch (Exception e) {
                LOGGER.error("sendNotificationToOldBidder", e);
            }
        }
    }

    @Override
    public void sendWelcomeMailToNewBuyer(String name, String surname, String emailAddress, String password) {
        String mailFile = "/mail/notification_to_welcome_buyer.html";
        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{NAME}", name);
            mail = StringUtils.replace(mail, "{SURNAME}", surname);
            mail = StringUtils.replace(mail, "{USERNAME}", emailAddress);
            mail = StringUtils.replace(mail, "{PASSWORD}", password);
            this.mailCommandService.sendMail(new String[]{emailAddress}, "Kullanıcı Hesabınız", mail);
        } catch (Exception e) {
            LOGGER.error("sendWelcomeMailToNewBuyer" +
                    "" +
                    "", e);
        }
    }

    @Override
    public void sendVerificationMailToNewVisitor(String name, String surname, String emailAddress, String code) {
        String mailFile = "/mail/notification_to_new_visitor_verification.html";
        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{NAME}", name);
            mail = StringUtils.replace(mail, "{SURNAME}", surname);
            mail = StringUtils.replace(mail, "{CODE}", code);

            this.mailCommandService.sendMail(new String[]{emailAddress}, "Kullanıcı Hesabınız Onay", mail);
        } catch (Exception e) {
            LOGGER.error("sendVerificationMailToNewVisitor" +
                    "" +
                    "", e);
        }
    }

    @Override
    public void sendActivatedMailToNewVisitor(String name, String surname, String emailAddress) {
        String mailFile = "/mail/notification_to_new_visitor_activated.html";
        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{NAME}", name);
            mail = StringUtils.replace(mail, "{SURNAME}", surname);

            this.mailCommandService.sendMail(new String[]{emailAddress}, "Kullanıcı Hesabınız", mail);
        } catch (Exception e) {
            LOGGER.error("sendActivatedMailToNewVisitor" +
                    "" +
                    "", e);
        }
    }

    @Override
    public void sendCancelationMailsToBidders(String realestateCode) {
        String mailFile = "/mail/notification_for_cancelation_to_bidders.html";

        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(realestateCode);
        String realEstateCode = realEstateDTO.getCode();
        String realEstateTitle = realEstateDTO.getTitle();

        List<RealEstateBidDTO> realEstateBidDTOS = this.bidQueryService.getBidsOfRealEstate(realestateCode);
        if (realEstateBidDTOS != null && !realEstateBidDTOS.isEmpty()) {
            List<BuyerDTO> buyers = realEstateBidDTOS.stream().map(RealEstateBidDTO::getBuyer).distinct().collect(Collectors.toList());
            try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
                String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
                mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
                mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);
                for (BuyerDTO buyerDTO : buyers) {
                    String name = buyerDTO.getName();
                    String surname = buyerDTO.getSurname();
                    String emailAddress = buyerDTO.getEmailAddress();
                    String userMail = StringUtils.replace(mail, "{NAME}", name);
                    userMail = StringUtils.replace(userMail, "{SURNAME}", surname);
                    this.mailCommandService.sendMail(new String[]{emailAddress}, "E-ihale İptal Edildi", userMail);
                }

            } catch (Exception e) {
                LOGGER.error("sendCancelationMailsToBidders", e);
            }
        }
    }


    @Override
    public void sendLostMailsToBidders(String buyerCode, String realestateCode) {
        String mailFile = "/mail/notification_for_lost_to_bidders.html";

        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(realestateCode);
        String realEstateCode = realEstateDTO.getCode();
        String realEstateTitle = realEstateDTO.getTitle();

        List<RealEstateBidDTO> realEstateBidDTOS = this.bidQueryService.getBidsOfRealEstate(realestateCode);
        if (realEstateBidDTOS != null && !realEstateBidDTOS.isEmpty()) {
            List<BuyerDTO> buyers = realEstateBidDTOS.stream().map(RealEstateBidDTO::getBuyer).distinct().collect(Collectors.toList());
            try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
                String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
                mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
                mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);
                for (BuyerDTO buyerDTO : buyers) {
                    if (!buyerDTO.getCode().equalsIgnoreCase(buyerCode)) {
                        String name = buyerDTO.getName();
                        String surname = buyerDTO.getSurname();
                        String emailAddress = buyerDTO.getEmailAddress();
                        String userMail = StringUtils.replace(mail, "{NAME}", name);
                        userMail = StringUtils.replace(userMail, "{SURNAME}", surname);
                        this.mailCommandService.sendMail(new String[]{emailAddress}, "E-ihale Tamamlandı", userMail);
                    }
                }

            } catch (Exception e) {
                LOGGER.error("sendLostMailsToBidders", e);
            }
        }
    }

    @Override
    public void sendWinMailToBidders(String buyerCode, String code) {
        String mailFile = "/mail/notification_for_win_to_bidder.html";

        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(code);
        String realEstateCode = realEstateDTO.getCode();
        String realEstateTitle = realEstateDTO.getTitle();

        List<RealEstateBidDTO> realEstateBidDTOS = this.bidQueryService.getBidsOfRealEstate(code);
        if (realEstateBidDTOS != null && !realEstateBidDTOS.isEmpty()) {
            try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
                String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
                mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
                mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);

                if (StringUtils.isNotEmpty(buyerCode)) {
                    Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerCode);
                    String name = buyer.getName();
                    String surname = buyer.getSurname();
                    String emailAddress = buyer.getEmailAddress();
                    String userMail = StringUtils.replace(mail, "{NAME}", name);
                    userMail = StringUtils.replace(userMail, "{SURNAME}", surname);
                    this.mailCommandService.sendMail(new String[]{emailAddress}, "E-ihale Tamamlandı", userMail);
                }

            } catch (Exception e) {
                LOGGER.error("sendWinMailToBidders", e);
            }
        }
    }

    @Override
    public void sendMailToWarrantedBuyer(String buyerCode, String code) {
        String mailFile = "/mail/notification_to_warranted_buyer.html";

        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(code);
        String realEstateCode = realEstateDTO.getCode();
        String realEstateTitle = realEstateDTO.getTitle();

        List<RealEstateBidDTO> realEstateBidDTOS = this.bidQueryService.getBidsOfRealEstate(code);
        if (realEstateBidDTOS != null && !realEstateBidDTOS.isEmpty()) {
            try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
                String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
                mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
                mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);

                if (StringUtils.isNotEmpty(buyerCode)) {
                    Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerCode);
                    String name = buyer.getName();
                    String surname = buyer.getSurname();
                    String emailAddress = buyer.getEmailAddress();
                    String userMail = StringUtils.replace(mail, "{NAME}", name);
                    userMail = StringUtils.replace(userMail, "{SURNAME}", surname);
                    this.mailCommandService.sendMail(new String[]{emailAddress}, "E-ihale Yetki", userMail);
                }

            } catch (Exception e) {
                LOGGER.error("sendMailToWarrantedBuyer", e);
            }
        }
    }

    @Override
    public void contactusMail(String name, String surname, String phoneCountryCode, String phone, String emailAddress, String message) {
        String mailFile = "/mail/contact_us_propturk_mail.html";
        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{NAME}", name);
            mail = StringUtils.replace(mail, "{SURNAME}", surname);
            mail = StringUtils.replace(mail, "{PHONE_COUNTRY_CODE}", phoneCountryCode);
            mail = StringUtils.replace(mail, "{PHONE}", phone);
            mail = StringUtils.replace(mail, "{EMAIL_ADDRESS}", emailAddress);
            mail = StringUtils.replace(mail, "{MESSAGE}", message);

            this.mailCommandService.sendMail(new String[]{this.contactUsToMail}, "PropTürk İletişim", mail);
        } catch (Exception e) {
            LOGGER.error("contactusMail", e);
        }

        String contactUsMailFile = "/mail/contact_us_mail.html";
        try (InputStream inputStream = new ClassPathResource(contactUsMailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{NAME}", name);
            mail = StringUtils.replace(mail, "{SURNAME}", surname);
            this.mailCommandService.sendMail(new String[]{emailAddress}, "PropTürk İletişim", mail);
        } catch (Exception e) {
            LOGGER.error("contactusMail", e);
        }


    }

    @Override
    public void sendNewVisitorMailToAdmins(String name, String surname, String emailAddress) {
        String mailFile = "/mail/notification_for_new_visitor_to_admins.html";
        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{NAME}", name);
            mail = StringUtils.replace(mail, "{SURNAME}", surname);
            mail = StringUtils.replace(mail, "{EMAIL_ADDRESS}", emailAddress);

            this.mailCommandService.sendMail(new String[]{this.adminEmail}, "Yeni Kullanıcı Kaydı  - " + emailAddress, mail);
        } catch (Exception e) {
            LOGGER.error("sendNewVisitorMailToAdmins", e);
        }
    }

    @Override
    public void sendRealestateStatesChangesReportoAdmins(String startDate, String endDate, String report) {
        String mailFile = "/mail/notification_for_weeklyrealestatestatuschanges_to_admins.html";
        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{START_DATE}", startDate);
            mail = StringUtils.replace(mail, "{END_DATE}", endDate);
            mail = StringUtils.replace(mail, "{REPORT}", report);

            this.mailCommandService.sendMail(new String[]{this.adminEmail}, "İlan Durum Raporu", mail);
        } catch (Exception e) {
            LOGGER.error("sendRealestateStatesChangesReportoAdmins", e);
        }
    }

    @Override
    public void sendNotificationToAdmins(String buyerCode, String realestateCode) {
        String mailFile = "/mail/notification_for_first_bid_to_admins.html";

        RealEstateDTO realEstateDTO = this.realEstateQueryService.getRealEstate(realestateCode);
        String realEstateCode = realEstateDTO.getCode();
        String realEstateTitle = realEstateDTO.getTitle();

        ZoneOffset zoneOffSet = ZoneOffset.of("+03:00");
        LocalDateTime auctionEndDate = realEstateDTO.getEndDate().atOffset(zoneOffSet).toLocalDateTime();

        Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerCode);


        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            String mail = StreamUtils.copyToString(inputStream, Charset.defaultCharset());
            mail = StringUtils.replace(mail, "{REALESTATE_CODE}", realEstateCode);
            mail = StringUtils.replace(mail, "{REALESTATE_TITLE}", realEstateTitle);
            mail = StringUtils.replace(mail, "{AUCTION_END_DATE}", DateTimeFormatter.ofPattern("dd.MM.YYYY HH:mm").format(auctionEndDate));
            mail = StringUtils.replace(mail, "{EMAIL_ADDRESS}", buyer.getEmailAddress());

            this.mailCommandService.sendMail(new String[]{this.adminEmail}, "İlana İlk Teklif Verildi", mail);


        } catch (Exception e) {
            LOGGER.error("sendNotificationToFavoriteOwners", e);
        }
    }


}
