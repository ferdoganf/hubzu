package com.hubzu.api.dto.realestate;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RealEstateLightDTO extends CodeBaseDTO {

    private String title;
    private String description;

    private CodeNameBaseDTO bank;
    private CodeBaseDTO realEstateType;
    private CodeBaseDTO realEstateSubType;
    private CodeBaseDTO realEstateStatus;
    private RealEstateAddressDTO realEstateAddress;

    private int auctionPeriod;
    private LocalDateTime auctionDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal startingAmount;
    private BigDecimal bidStep;

    private CodeBaseDTO numberOfRooms;
    private int floorSpaceGross;
    private int floorSpaceNet;

    private boolean occasion;

    private BigDecimal tenderParticipationFee;
    private BigDecimal depositRate;
    private BigDecimal serviceFeeRate;

    private boolean holdDeposit;

    private boolean inAdvance;

    private BigDecimal inAdvanceAmount;

    private boolean finishedAuctionsShown;

    public RealEstateLightDTO(RealEstate realEstate) {
        ModelMapperUtil.getInstance().getMapper().map(realEstate, this);
        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(realEstate.getRealEstateType().getCode())) {
            Residential residential = (Residential) Hibernate.unproxy(realEstate);
            if (residential.getResidentialType() != null) {
                this.setRealEstateSubType(new CodeBaseDTO(residential.getResidentialType()));
                if (residential.getNumberOfRooms() != null) {
                    this.setNumberOfRooms(new CodeBaseDTO(residential.getNumberOfRooms()));
                }
                this.setFloorSpaceGross(residential.getFloorSpaceGross());
                this.setFloorSpaceNet(residential.getFloorSpaceNet());
            }
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(realEstate.getRealEstateType().getCode())) {
            Commercial commercial = (Commercial) Hibernate.unproxy(realEstate);
            if (commercial.getCommercialType() != null) {
                this.setRealEstateSubType(new CodeBaseDTO(commercial.getCommercialType()));
                this.setFloorSpaceGross(commercial.getFloorSpaceGross());
                this.setFloorSpaceNet(commercial.getFloorSpaceNet());
            }
        } else if (BusinessConstants.RealEstateType.LAND.equals(realEstate.getRealEstateType().getCode())) {
            Land land = (Land) Hibernate.unproxy(realEstate);
            if (land.getLandType() != null) {
                this.setRealEstateSubType(new CodeBaseDTO(land.getLandType()));
                this.setFloorSpaceNet(land.getFloorSpaceNet());
            }
        }
    }
}
