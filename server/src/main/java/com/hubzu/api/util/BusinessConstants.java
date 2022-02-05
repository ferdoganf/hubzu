package com.hubzu.api.util;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class BusinessConstants {

    public enum UserType {
        ADMIN, BUYER, VISITOR, OPERATION;

        public static UserType of(String code) {
            return Stream.of(UserType.values()).filter(p -> p.name().equalsIgnoreCase(code)).findFirst().orElseThrow(IllegalAccessError::new);
        }

        public boolean equals(String code) {
            return this.equals(UserType.of(code));
        }
    }

    public enum UserStatus {
        PENDING, ACTIVE, PASSIVE;

        public static UserStatus of(String code) {
            return Stream.of(UserStatus.values()).filter(p -> p.name().equalsIgnoreCase(code)).findFirst().orElseThrow(IllegalAccessError::new);
        }

        public boolean equals(String code) {
            return this.equals(UserStatus.of(code));
        }
    }


    public enum RealEstateType {
        RESIDENTIAL, COMMERCIAL, LAND;

        public static RealEstateType of(String code) {
            return Stream.of(RealEstateType.values()).filter(p -> p.name().equalsIgnoreCase(code)).findFirst().orElseThrow(IllegalAccessError::new);
        }

        public boolean equals(String code) {
            return this.equals(RealEstateType.of(code));
        }
    }


    public enum RealEstateStatus {
        ACTIVE, PASSIVE, STARTED, FINISHED, FINISHED_SOLD, CANCELLED, DRAFT;

        public static RealEstateStatus of(String code) {
            return Stream.of(RealEstateStatus.values()).filter(p -> p.name().equalsIgnoreCase(code)).findFirst().orElseThrow(IllegalAccessError::new);
        }

        public static List<String> publicStatus() {
            return Stream.of(RealEstateStatus.values()).filter(p -> (p.equals(RealEstateStatus.ACTIVE) || p.equals(RealEstateStatus.STARTED))).map(Enum::name).
                    collect(Collectors.toList());
        }

        public boolean equals(String code) {
            return this.equals(RealEstateStatus.of(code));
        }
    }

    public enum RealEstateImageType {
        JPG("image/jpeg"),
        JPEG("image/jpeg"),
        PNG("image/png");

        private String mimeType;

        RealEstateImageType(String mimeType) {
            this.mimeType = mimeType;
        }

        public static RealEstateImageType of(String extension) {
            return Stream.of(RealEstateImageType.values()).filter(p -> p.name().equalsIgnoreCase(extension)).findFirst().orElseThrow(null);
        }

        public String getMimeType() {
            return this.mimeType;
        }
    }


    public enum Calendar {
        TR;

        public static Calendar of(String code) {
            return Stream.of(Calendar.values()).filter(p -> p.name().equalsIgnoreCase(code)).findFirst().orElseThrow(IllegalAccessError::new);
        }

        public boolean equals(String code) {
            return this.equals(Calendar.of(code));
        }
    }


}
