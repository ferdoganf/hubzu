package com.hubzu.api.service;

public interface MailCommandService {

    void sendMail(String[] to, String subject, String body);
}
