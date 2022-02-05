package com.hubzu.api.dto.realestate.building;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ResidentialDTO extends BuildingDTO {

    private CodeBaseDTO residentialType;

    private CodeBaseDTO numberOfRooms;
    private CodeBaseDTO floorNumber;
    private CodeBaseDTO numberOfFloors;
    private CodeBaseDTO numberOfBathrooms;
    private CodeBaseDTO balcony;
    private CodeBaseDTO furnished;
    private CodeBaseDTO buildingComplex;
    private CodeBaseDTO eligibleForBankCredit;

    private List<CodeBaseDTO> interiorProperties = new ArrayList<>();
    private List<CodeBaseDTO> externalProperties = new ArrayList<>();
    private List<CodeBaseDTO> accessibleHousings = new ArrayList<>();
    private List<CodeBaseDTO> nearlinesses = new ArrayList<>();
    private List<CodeBaseDTO> transportations = new ArrayList<>();
    private List<CodeBaseDTO> scenes = new ArrayList<>();

    public ResidentialDTO(Residential residential) {
        ModelMapperUtil.getInstance().getMapper().map(residential, this);
        if (StringUtils.isEmpty(this.getBuyerWarrantAlert())) {
            this.setBuyerWarrantAlert(residential.getBank().getBuyerWarrantAlert());
        }
        if (residential.getResidentialType() != null) {
            this.setRealEstateSubType(new CodeBaseDTO(residential.getResidentialType()));
        }
    }
}
