package com.hubzu.api.model.base;

import com.hubzu.api.util.ContextHeaders;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
@Audited
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@NoArgsConstructor
public abstract class BaseEntity {

    public static final String SOFT_DELETE_CLAUSE = "deleted = 0";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    @Version
    @Column(name = "version", columnDefinition = "BIGINT(20) default 0", nullable = false)
    private Long version;

    @Column(name = "created_date", columnDefinition = "DATETIME")
    private LocalDateTime createdDate;

    @Column(name = "last_modified_date", columnDefinition = "DATETIME")
    private LocalDateTime lastModifiedDate;

    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String lastModifiedBy;

    private String createdClientIp;

    private String lastModifiedClientIp;

    @Column(name = "client_created_date", columnDefinition = "DATETIME")
    private LocalDateTime clientCreatedDate;

    @Column(name = "client_last_modified_date", columnDefinition = "DATETIME")
    private LocalDateTime clientLastModifiedDate;

    @Column(name = "deleted", columnDefinition = "boolean default false", nullable = false)
    private boolean deleted;
    private Long deletionToken;

    private String correlationId;

    public void delete() {
        this.deletionToken = this.getId();
        this.deleted = true;
    }

    @PrePersist
    public void prePersist() {
        this.deleted = false;
        this.deletionToken = 0L;
        this.setCreatedDate(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC));

        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        this.setCreatedClientIp(String.valueOf(httpServletRequest.getAttribute(ContextHeaders.IP_ADDRESS)));
        this.setCorrelationId(String.valueOf(httpServletRequest.getAttribute(ContextHeaders.CORRELATION_ID)));

    }

    @PreUpdate
    public void preUpdate() {
        this.setLastModifiedDate(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC));

        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        this.setLastModifiedClientIp(String.valueOf(httpServletRequest.getAttribute(ContextHeaders.IP_ADDRESS)));
        this.setCorrelationId(String.valueOf(httpServletRequest.getAttribute(ContextHeaders.CORRELATION_ID)));
    }
}
