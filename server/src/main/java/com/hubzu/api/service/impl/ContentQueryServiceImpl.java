package com.hubzu.api.service.impl;

import com.hubzu.api.dto.metadata.ContractDTO;
import com.hubzu.api.dto.metadata.SmsDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.exception.HubzuTechnicalException;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.template.Contract;
import com.hubzu.api.model.template.Sms;
import com.hubzu.api.repository.content.ContractRepository;
import com.hubzu.api.repository.content.SmsRepository;
import com.hubzu.api.service.ContentQueryService;
import com.hubzu.api.util.ErrorCodes;
import com.openhtmltopdf.extend.FSSupplier;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ContentQueryServiceImpl implements ContentQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ContentQueryServiceImpl.class);

    /*
    @Value("classpath:/fonts/micross.ttf")
    Resource resourceFile;
    */

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private SmsRepository smsRepository;

    @Override
    public Contract getContract(String code) {
        return this.contractRepository.findByCode(code).orElse(new Contract(code));
    }

    @Override
    public ContractDTO getContractDTO(String code) {
        Contract contract = this.getContract(code);
        return new ContractDTO(contract);
    }

    @Override
    public byte[] getContractPdf(String code, Buyer buyer, RealEstate realEstate) {
        String html = this.getContract(code).getContent();
        //html = StringUtils.replace(html, "<br>", "<br/>");
        //html = StringUtils.replace(html, "</br>", "");
        html = StringUtils.replaceEach(html,
                new String[]{"<br>", "</br>", "#KULLANICI-AD", "#KULLANICI-SOYAD", "#KULLANICI-TCKN", "#KULLANICI-ADRES", "#KULLANICI-EPOSTA", "#KULLANICI-TELEFON", "#ILAN-NO", "#ILAN-IL", "#ILAN-ILCE", "#ILAN-MAHALLE", "#ILAN-ADA", "#ILAN-PARSEL", "#ILAN-BLOK", "#ILAN-KAT", "#ILAN-BOLUM", "#ILAN-ADRES"},
                new String[]{"<br/>", "",
                        StringUtils.defaultString(buyer != null ? buyer.getName() : null),
                        StringUtils.defaultString(buyer != null ? buyer.getSurname() : null),
                        StringUtils.defaultString(buyer != null ? buyer.getIdentityNumber() : null),
                        "",
                        StringUtils.defaultString(buyer != null ? buyer.getEmailAddress() : null),
                        StringUtils.defaultString(buyer != null ? buyer.getPhone() : null),
                        StringUtils.defaultString(realEstate.getCode()),
                        StringUtils.defaultString(realEstate.getRealEstateAddress() != null ? realEstate.getRealEstateAddress().getCity().getName() : null),
                        StringUtils.defaultString(realEstate.getRealEstateAddress() != null ? realEstate.getRealEstateAddress().getDistrict().getName() : null),
                        StringUtils.defaultString(realEstate.getRealEstateAddress() != null ? (realEstate.getRealEstateAddress().getNeighborhood() != null ? realEstate.getRealEstateAddress().getNeighborhood().getName() : null) : null),
                        "",
                        "",
                        "",
                        "",
                        "",
                        StringUtils.defaultString(realEstate.getRealEstateAddress() != null ? realEstate.getRealEstateAddress().getAddressText() : null)
                });

        String mailFile = "/fonts/micross.ttf";
        /*
        try {
            File file = new ClassPathResource(mailFile).getFile();
            LOGGER.error("ClassPathResource File exists: " + file.getParent() + " " + file.exists());
        } catch (Exception e) {
            LOGGER.error("ClassPathResource", e);
        }


        try (InputStream inputStream = new ClassPathResource(mailFile).getInputStream()) {
            File tempFile = File.createTempFile("micross", "ttf");
            tempFile.deleteOnExit();
            FileOutputStream out = new FileOutputStream(tempFile);
            IOUtils.copy(inputStream, out);
            LOGGER.error("inputStream File exists: " + tempFile.getParent() + " " + tempFile.exists());
        } catch (Exception e) {
            LOGGER.error("InputStream", e);
        }
*/

        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();

            builder.useFont(new FSSupplier<InputStream>() {
                @Override
                public InputStream supply() {
                    System.out.println("Requesting font");
                    try {
                        return new ClassPathResource(mailFile).getInputStream();
                    } catch (IOException e) {
                        LOGGER.error("ClassPathResource exception", e);
                        throw new HubzuTechnicalException();
                    }
                }
            }, "Open Sans");
            //ClassLoader classLoader = this.getClass().getClassLoader();
            //File file = new File(classLoader.getResource("fonts/OpenSans-Regular.ttf").getFile());
            //File file = new File(classLoader.getResource("fonts/micross.ttf").getFile());
            //File file = ResourceUtils.getFile("classpath:/fonts/micross.ttf");
            /*
            builder.useFont(new

                    ClassPathResource(mailFile).

                    getFile(), "Open Sans");
            */
            builder.withHtmlContent(
                    "<!DOCTYPE html PUBLIC\n" +
                            " \"-//OPENHTMLTOPDF//DOC XHTML Character Entities Only 1.0//EN\" \"\">\n" +
                            "<html>\n" +
                            "<head><style type=\"text/css\">html{font-family:\"Open Sans\"}" +
                            "@page {\n" +
                            "size: \"A4 portrait\";" +
                            "margin: 15mm 15mm 35mm 15mm;" +
                            "    /* footers */\n" +
                            "    @bottom-left {\n" +
                            "        template: \"İmza:\";\n" +
                            "font-family:\"Open Sans\";" +
                            "padding: 10mm;" +
                            "    } \n" +
                            "    @bottom-right {\n" +
                            "        template: \"Sayfa \" counter(page) \" / \" counter(pages);\n" +
                            "font-family:\"Open Sans\"" +
                            "    }\n" +
                            "}" +
                            "</style></head>" +
                            "<body>" + html +
                            "<p><br/></p><p><br/></p><p>Tarih:<br/>Adı Soyadı:<br/>İmza:</p>" +
                            "</body> </html>"
                    , "");
            builder.toStream(os);
            builder.run();
            return os.toByteArray();
        } catch (Exception e) {
            LOGGER.error("getContractPdf", e);
            throw new HubzuTechnicalException();
        }
    }

    @Override
    public Sms checkAndGetSms(String code) {
        return this.smsRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_SMS_NOT_FOUND));
    }

    @Override
    public SmsDTO getSmsDTO(String code) {
        return new SmsDTO(this.checkAndGetSms(code));
    }

    @Override
    public List<SmsDTO> getSmsDTOs() {
        List<Sms> smss = this.smsRepository.findAll();
        return smss.stream().map(SmsDTO::new).collect(Collectors.toList());
    }

}
