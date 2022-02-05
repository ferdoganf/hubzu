package com.hubzu.api.service.impl;

import com.hubzu.api.service.MailCommandService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;

@Service
@Transactional(readOnly = true)
public class MailCommandServiceImpl implements MailCommandService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailCommandServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${hubzu.mail.from}")
    private String from;

    @Value("${hubzu.mail.bcc}")
    private String bcc;


    @Value("${hubzu.url.base}")
    private String baseUrl;


    @Override
    public void sendMail(String[] to, String subject, String body) {
        try {
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(this.from);
            helper.setTo(to);
            helper.setSubject(subject);
            body = StringUtils.replace(body, "{BASE_URL}", this.baseUrl);
            helper.setText(body, true);
            if (StringUtils.isNotEmpty(this.bcc)) {
                helper.setBcc(this.bcc);
            }
            helper.setValidateAddresses(true);
            this.mailSender.send(message);
        } catch (Exception e) {
            LOGGER.error("sendMail", e);
        }
    }

}
