package com.hubzu.api.dto.realestate;

import com.hubzu.api.dto.CodeBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RealEstatePhotoDTO extends CodeBaseDTO {

    private Long size;

    private String fileName;

    private String mimeType;

    private String path;
}
