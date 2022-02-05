package com.hubzu.api.dto.metadata;

import com.hubzu.api.dto.CodeBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode
@Data
public class UserMetadataDTO {

    private List<CodeBaseDTO> userStatus = new ArrayList<>();
}
