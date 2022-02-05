package com.hubzu.api.model.user;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Data
public class UserRealEstateView {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String realEstateCode;

    private String createdBy;

    private String createdClientIp;

    @Column(name = "created_date", columnDefinition = "DATETIME")
    private LocalDateTime createdDate;

    @PrePersist
    public void prePersist() {
        this.setCreatedDate(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC));
    }
}
