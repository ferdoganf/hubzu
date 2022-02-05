package com.hubzu.api.model.user;

import com.hubzu.api.model.base.CodeBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends CodeBaseEntity {

    private String emailAddress;

    private String password;

    private String firstPassword;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserStatus userStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserType userType;

    private String name;
    private String surname;
}
