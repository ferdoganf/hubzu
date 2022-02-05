package com.hubzu.api.service;

public interface MailCommandAsyncService {

    void sendNotificationToFavoriteOwners(String buyerCode, String realestateCode);

    void sendNotificationToOldBidder(Long bidId);

    void sendWelcomeMailToNewBuyer(String name, String surname, String emailAddress, String password);

    void sendVerificationMailToNewVisitor(String name, String surname, String emailAddress, String code);

    void sendActivatedMailToNewVisitor(String name, String surname, String emailAddress);

    void sendCancelationMailsToBidders(String realestateCode);

    void sendLostMailsToBidders(String buyerCode, String realestateCode);

    void sendWinMailToBidders(String buyerCode, String realEstateCode);

    void sendMailToWarrantedBuyer(String buyerCode, String code);

    void contactusMail(String name, String surname, String phoneCountryCode, String phone, String emailAddress, String message);

    void sendNewVisitorMailToAdmins(String name, String surname, String emailAddress);

    void sendRealestateStatesChangesReportoAdmins(String startDate, String endDate, String report);

    void sendNotificationToAdmins(String code, String code1);
}
