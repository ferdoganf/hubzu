package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.realestate.*;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.realestate.RealEstateAddress;
import com.hubzu.api.model.realestate.building.Building;
import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.repository.realestate.LandRepository;
import com.hubzu.api.repository.realestate.RealEstateRepository;
import com.hubzu.api.repository.realestate.building.commercial.CommercialRepository;
import com.hubzu.api.repository.realestate.building.residential.ResidentialRepository;
import com.hubzu.api.service.*;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class RealEstateCommandServiceImpl implements RealEstateCommandService {

    @Autowired
    private ResidentialRepository residentialRepository;

    @Autowired
    private CommercialRepository commercialRepository;

    @Autowired
    private LandRepository landRepository;

    @Autowired
    private RealEstateRepository realEstateRepository;

    @Autowired
    private ResidentialQueryService residentialQueryService;

    @Autowired
    private CommercialQueryService commercialQueryService;

    @Autowired
    private LandQueryService landQueryService;

    @Autowired
    private RealEstatePropertiesQueryService realEstatePropertiesQueryService;

    @Autowired
    private AddressQueryService addressQueryService;

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private BankQueryService bankQueryService;

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Override
    public void createRealEstate(CreateRealEstateDTO createRealEstateDTO) {
        this.realEstateQueryService.checkRealEstateAlreadyExists(createRealEstateDTO.getCode());
        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(createRealEstateDTO.getRealEstateType())) {
            this.createResidential(createRealEstateDTO);
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(createRealEstateDTO.getRealEstateType())) {
            this.createCommercial(createRealEstateDTO);
        } else if (BusinessConstants.RealEstateType.LAND.equals(createRealEstateDTO.getRealEstateType())) {
            this.createLand(createRealEstateDTO);
        } else {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_TYPE_INVALID);
        }
    }

    private void createResidential(CreateRealEstateDTO createRealEstateDTO) {
        Residential residential = new Residential();
        this.setRealEstateBaseProperties(residential, createRealEstateDTO, BusinessConstants.RealEstateType.RESIDENTIAL);
        this.setRealEstateProperties(residential, createRealEstateDTO);
        this.residentialRepository.save(residential);
    }

    private void createCommercial(CreateRealEstateDTO createRealEstateDTO) {
        Commercial commercial = new Commercial();
        this.setRealEstateBaseProperties(commercial, createRealEstateDTO, BusinessConstants.RealEstateType.COMMERCIAL);
        this.setRealEstateProperties(commercial, createRealEstateDTO);

        this.commercialRepository.save(commercial);
    }

    private void createLand(CreateRealEstateDTO createRealEstateDTO) {
        Land land = new Land();
        this.setRealEstateBaseProperties(land, createRealEstateDTO, BusinessConstants.RealEstateType.LAND);
        this.setRealEstateProperties(land, createRealEstateDTO);
        this.landRepository.save(land);
    }


    private void setRealEstateBaseProperties(RealEstate realEstate, CreateRealEstateDTO createRealEstateDTO, BusinessConstants.RealEstateType realEstateType) {
        realEstate.setRealEstateType(this.realEstatePropertiesQueryService.checkAndGetRealEstateType(realEstateType.name()));
        realEstate.setRealEstateStatus(this.realEstateQueryService.checkAndGetRealEstateStatus(BusinessConstants.RealEstateStatus.PASSIVE.name()));
        realEstate.setCode(createRealEstateDTO.getCode());

        RealEstateAddress realEstateAddress = new RealEstateAddress();
        realEstateAddress.setRealEstate(realEstate);
        realEstate.setRealEstateAddress(realEstateAddress);
    }


    private void setRealEstateProperties(RealEstate realEstate, UpdateRealEstateDTO updateRealEstateDTO) {
        realEstate.setTitle(updateRealEstateDTO.getTitle());
        realEstate.setDescription(updateRealEstateDTO.getDescription());

        realEstate.setAuctionPeriod(updateRealEstateDTO.getAuctionPeriod());

        realEstate.setStartingAmount(updateRealEstateDTO.getStartingAmount());
        realEstate.setBidStep(updateRealEstateDTO.getBidStep());
        realEstate.setOccasion(updateRealEstateDTO.isOccasion());
        realEstate.setHoldDeposit(updateRealEstateDTO.isHoldDeposit());

        realEstate.setTenderParticipationFee(updateRealEstateDTO.getTenderParticipationFee());
        realEstate.setDepositRate(updateRealEstateDTO.getDepositRate());
        realEstate.setServiceFeeRate(updateRealEstateDTO.getServiceFeeRate());

        realEstate.setInAdvance(updateRealEstateDTO.isInAdvance());
        realEstate.setInAdvanceAmount(updateRealEstateDTO.getInAdvanceAmount());

        realEstate.setFinishedAuctionsShown(updateRealEstateDTO.isFinishedAuctionsShown());

        if (StringUtils.isNotEmpty(updateRealEstateDTO.getBank())) {
            realEstate.setBank(this.bankQueryService.checkAndGetBank(updateRealEstateDTO.getBank()));
        } else {
            realEstate.setBank(null);
        }

        if (BusinessConstants.RealEstateStatus.DRAFT.equals(realEstate.getRealEstateStatus().getCode()) && StringUtils.isNotEmpty(updateRealEstateDTO.getCode())) {
            realEstate.setRealEstateStatus(this.realEstateQueryService.checkAndGetRealEstateStatus(BusinessConstants.RealEstateStatus.PASSIVE.name()));
            realEstate.setCode(updateRealEstateDTO.getCode());
        }
    }


    private void setBuildingProperties(Building building, UpsertBuildingDTO createBuildingDTO) {
        building.setFloorSpaceGross(createBuildingDTO.getFloorSpaceGross());
        building.setFloorSpaceNet(createBuildingDTO.getFloorSpaceNet());
        building.setDues(createBuildingDTO.getDues());
        building.setAgeOfBuilding(this.realEstatePropertiesQueryService.checkAndGetAgeOfBuilding(createBuildingDTO.getAgeOfBuilding()));
        building.setHeating(this.realEstatePropertiesQueryService.checkAndGetHeating(createBuildingDTO.getHeating()));
        building.setUseStatus(this.realEstatePropertiesQueryService.checkAndGetUseStatus(createBuildingDTO.getUseStatus()));
        building.setFrontages(this.realEstatePropertiesQueryService.checkAndGetFrontages(createBuildingDTO.getFrontages()));
    }

    private void setResidentialProperties(Residential residential, UpsertResidentialDTO upsertResidentialDTO) {
        residential.setResidentialType(this.residentialQueryService.checkAndGetResidentialType(upsertResidentialDTO.getResidentialType()));
        residential.setNumberOfRooms(this.realEstatePropertiesQueryService.checkAndGetNumberOfRooms(upsertResidentialDTO.getNumberOfRooms()));
        residential.setFloorNumber(this.realEstatePropertiesQueryService.checkAndGetFloorNumber(upsertResidentialDTO.getFloorNumber()));
        residential.setNumberOfFloors(this.realEstatePropertiesQueryService.checkAndGetNumberOfFloors(upsertResidentialDTO.getNumberOfFloors()));
        residential.setNumberOfBathrooms(this.realEstatePropertiesQueryService.checkAndGetNumberOfBathrooms(upsertResidentialDTO.getNumberOfBathrooms()));
        residential.setBalcony(this.realEstatePropertiesQueryService.checkAndGetBalcony(upsertResidentialDTO.getBalcony()));
        residential.setFurnished(this.realEstatePropertiesQueryService.checkAndGetFurnished(upsertResidentialDTO.getFurnished()));
        residential.setBuildingComplex(this.realEstatePropertiesQueryService.checkAndGetBuildingComplex(upsertResidentialDTO.getBuildingComplex()));
        residential.setEligibleForBankCredit(this.realEstatePropertiesQueryService.checkAndGetEligibleForBankCredit(upsertResidentialDTO.getEligibleForBankCredit()));
        residential.setInteriorProperties(this.realEstatePropertiesQueryService.checkAndGetInteriorProperties(upsertResidentialDTO.getInteriorProperties()));
        residential.setExternalProperties(this.realEstatePropertiesQueryService.checkAndGetExternalProperties(upsertResidentialDTO.getExternalProperties()));
        this.residentialRepository.save(residential);
    }

    private void setCommercialProperties(Commercial commercial, UpsertCommercialDTO upsertCommercialDTO) {
        commercial.setCommercialType(this.commercialQueryService.checkAndGetCommercialType(upsertCommercialDTO.getCommercialType()));
        commercial.setGeneralProperties(this.realEstatePropertiesQueryService.checkAndGetGeneralProperties(upsertCommercialDTO.getGeneralProperties()));
    }

    private void setLandProperties(Land land, UpsertLandDTO createLandDTO) {
        land.setLandType(this.landQueryService.checkAndGetLandType(createLandDTO.getLandType()));

        land.setFloorSpaceNet(createLandDTO.getFloorSpaceNet());

        land.setLandToBuildingRatio(this.realEstatePropertiesQueryService.checkAndGetLandToBuildingRatio(createLandDTO.getLandToBuildingRatio()));
        land.setHeightRestriction(this.realEstatePropertiesQueryService.checkAndGetHeightRestriction(createLandDTO.getHeightRestriction()));
        land.setLandStatus(this.realEstatePropertiesQueryService.checkAndGetLandStatus(createLandDTO.getLandStatus()));

        land.setInfrastructures(this.realEstatePropertiesQueryService.checkAndGetInfrastructures(createLandDTO.getInfrastructures()));
        land.setGeneralFeatures(this.realEstatePropertiesQueryService.checkAndGetGeneralFeatures(createLandDTO.getGeneralFeatures()));
    }


    @Override
    public void updateResidential(String realEstateCode, UpsertResidentialDTO upsertResidentialDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.checkRealEstateForUpdate(realEstate);
        Residential residential = this.residentialQueryService.checkAndGetResidential(realEstateCode);
        this.setBuildingProperties(residential, upsertResidentialDTO);
        this.setResidentialProperties(residential, upsertResidentialDTO);
        this.residentialRepository.save(residential);

    }

    @Override
    public void updateCommercial(String realEstateCode, UpsertCommercialDTO upsertCommercialDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.checkRealEstateForUpdate(realEstate);
        Commercial commercial = this.commercialQueryService.checkAndGetCommercial(realEstateCode);
        this.setBuildingProperties(commercial, upsertCommercialDTO);
        this.setCommercialProperties(commercial, upsertCommercialDTO);
        this.commercialRepository.save(commercial);
    }

    @Override
    public void updateLand(String realEstateCode, UpsertLandDTO createLandDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.checkRealEstateForUpdate(realEstate);
        Land land = this.landQueryService.checkAndGetLand(realEstateCode);
        this.setLandProperties(land, createLandDTO);
        this.landRepository.save(land);
    }


    @Override
    public void updateRealEstateAddress(String realEstateCode, UpdateRealEstateAddressDTO updateRealEstateAddressDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.checkRealEstateForUpdate(realEstate);
        if (realEstate.getRealEstateAddress() == null) {
            RealEstateAddress realEstateAddress = new RealEstateAddress();
            realEstateAddress.setRealEstate(realEstate);
            realEstate.setRealEstateAddress(realEstateAddress);
        }

        if ((updateRealEstateAddressDTO.getCity() != null) && StringUtils.isNotEmpty(updateRealEstateAddressDTO.getCity())) {
            realEstate.getRealEstateAddress().setCity(this.addressQueryService.getCity(updateRealEstateAddressDTO.getCity()));
        } else {
            realEstate.getRealEstateAddress().setCity(null);
        }

        if ((updateRealEstateAddressDTO.getDistrict() != null) && StringUtils.isNotEmpty(updateRealEstateAddressDTO.getDistrict())) {
            realEstate.getRealEstateAddress().setDistrict(this.addressQueryService.getDistrict(updateRealEstateAddressDTO.getDistrict()));
        } else {
            realEstate.getRealEstateAddress().setDistrict(null);
        }

        if ((updateRealEstateAddressDTO.getNeighborhood() != null) && StringUtils.isNotEmpty(updateRealEstateAddressDTO.getNeighborhood())) {
            realEstate.getRealEstateAddress().setNeighborhood(this.addressQueryService.getNeighborhood(updateRealEstateAddressDTO.getNeighborhood()));
        } else {
            realEstate.getRealEstateAddress().setNeighborhood(null);
        }

        realEstate.getRealEstateAddress().setAddressText(updateRealEstateAddressDTO.getAddressText());
        realEstate.getRealEstateAddress().setLatitude(updateRealEstateAddressDTO.getLatitude());
        realEstate.getRealEstateAddress().setLongitude(updateRealEstateAddressDTO.getLongitude());
        realEstate.getRealEstateAddress().setParcelSearchUrl(updateRealEstateAddressDTO.getParcelSearchUrl());

        this.realEstateRepository.save(realEstate);
    }

    @Override
    public void checkRealEstateForUpdate(RealEstate realEstate) {
        if (BusinessConstants.RealEstateStatus.ACTIVE.equals(realEstate.getRealEstateStatus().getCode())) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_ACTIVE_REAL_ESTATE_CANNOT_BE_UPDATED);
        }

        if (BusinessConstants.RealEstateStatus.FINISHED.equals(realEstate.getRealEstateStatus().getCode())) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_CLOSED_REAL_ESTATE_CANNOT_BE_UPDATED);
        }

        if (BusinessConstants.RealEstateStatus.FINISHED_SOLD.equals(realEstate.getRealEstateStatus().getCode())) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_CLOSED_REAL_ESTATE_CANNOT_BE_UPDATED);
        }
    }


    @Override
    public void updateRealEstate(String realEstateCode, UpdateRealEstateDTO updateRealEstateDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.checkRealEstateForUpdate(realEstate);
        this.setRealEstateProperties(realEstate, updateRealEstateDTO);
        this.realEstateRepository.save(realEstate);
    }

    @Override
    public void updateStatus(String realEstateCode, String statusCode) {
        this.updateRealEstateStatus(realEstateCode, BusinessConstants.RealEstateStatus.of(statusCode));


    }

    @Override
    public void completeRealEstate(String realEstateCode) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        BusinessConstants.RealEstateStatus currentStatus = BusinessConstants.RealEstateStatus.of(realEstate.getRealEstateStatus().getCode());

        if (!currentStatus.equals(BusinessConstants.RealEstateStatus.STARTED) && !currentStatus.equals(BusinessConstants.RealEstateStatus.PASSIVE) && !currentStatus.equals(BusinessConstants.RealEstateStatus.ACTIVE)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_NOT_VALID_FOR_COMPLETE);
        }

        if (realEstate.getEndDate().isAfter(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC))) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_AUCTION_END_DATE_NOT_VALID_FOR_COMPLETE);
        }

        realEstate.setRealEstateStatus(this.realEstateQueryService.checkAndGetRealEstateStatus(BusinessConstants.RealEstateStatus.FINISHED.name()));
        realEstate = this.realEstateRepository.save(realEstate);
        this.mailCommandAsyncService.sendLostMailsToBidders(realEstate.getCurrentBid() != null ? realEstate.getCurrentBid().getBuyer().getCode() : "", realEstateCode);
        this.mailCommandAsyncService.sendWinMailToBidders(realEstate.getCurrentBid() != null ? realEstate.getCurrentBid().getBuyer().getCode() : "", realEstateCode);
    }

    @Override
    public void deleteRealEstate(String realEstateCode) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        BusinessConstants.RealEstateStatus currentStatus = BusinessConstants.RealEstateStatus.of(realEstate.getRealEstateStatus().getCode());

        if (!currentStatus.equals(BusinessConstants.RealEstateStatus.PASSIVE) && !currentStatus.equals(BusinessConstants.RealEstateStatus.ACTIVE) && !currentStatus.equals(BusinessConstants.RealEstateStatus.CANCELLED)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_NOT_VALID_FOR_DELETE);
        }


        realEstate.delete();
        this.realEstateRepository.save(realEstate);
    }

    @Override
    public void copyRealEstate(String originalRealEstateCode) {
        RealEstate originalRealEstate = this.realEstateQueryService.checkAndGetRealEstate(originalRealEstateCode);
        String realEstateCode = UUID.randomUUID().toString();

        CreateRealEstateDTO createRealEstateDTO = new CreateRealEstateDTO();
        createRealEstateDTO.setCode(realEstateCode);
        if (originalRealEstate.getRealEstateType() != null) {
            createRealEstateDTO.setRealEstateType(originalRealEstate.getRealEstateType().getCode());
        }
        if (originalRealEstate.getBank() != null) {
            createRealEstateDTO.setBank(originalRealEstate.getBank().getCode());
        }
        createRealEstateDTO.setTitle(originalRealEstate.getTitle());
        createRealEstateDTO.setDescription(originalRealEstate.getDescription());
        createRealEstateDTO.setAuctionPeriod(originalRealEstate.getAuctionPeriod());
        createRealEstateDTO.setStartingAmount(BigDecimal.ZERO);
        createRealEstateDTO.setBidStep(BigDecimal.ZERO);
        createRealEstateDTO.setOccasion(originalRealEstate.isOccasion());
        createRealEstateDTO.setTenderParticipationFee(originalRealEstate.getTenderParticipationFee());
        createRealEstateDTO.setDepositRate(originalRealEstate.getDepositRate());
        createRealEstateDTO.setServiceFeeRate(originalRealEstate.getServiceFeeRate());
        createRealEstateDTO.setHoldDeposit(originalRealEstate.isHoldDeposit());
        createRealEstateDTO.setInAdvance(originalRealEstate.isInAdvance());
        createRealEstateDTO.setInAdvanceAmount(originalRealEstate.getInAdvanceAmount());
        createRealEstateDTO.setFinishedAuctionsShown(originalRealEstate.isFinishedAuctionsShown());
        this.createRealEstate(createRealEstateDTO);


        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(originalRealEstate.getRealEstateType().getCode())) {

            Residential originalResidential = this.residentialQueryService.checkAndGetResidential(originalRealEstateCode);

            UpsertResidentialDTO upsertResidentialDTO = new UpsertResidentialDTO();
            if (originalResidential.getResidentialType() != null) {
                upsertResidentialDTO.setResidentialType(originalResidential.getResidentialType().getCode());
            }
            if (originalResidential.getNumberOfRooms() != null) {
                upsertResidentialDTO.setNumberOfRooms(originalResidential.getNumberOfRooms().getCode());
            }
            if (originalResidential.getFloorNumber() != null) {
                upsertResidentialDTO.setFloorNumber(originalResidential.getFloorNumber().getCode());
            }
            if (originalResidential.getNumberOfFloors() != null) {
                upsertResidentialDTO.setNumberOfFloors(originalResidential.getNumberOfFloors().getCode());
            }
            if (originalResidential.getNumberOfBathrooms() != null) {
                upsertResidentialDTO.setNumberOfBathrooms(originalResidential.getNumberOfBathrooms().getCode());
            }
            if (originalResidential.getBalcony() != null) {
                upsertResidentialDTO.setBalcony(originalResidential.getBalcony().getCode());
            }
            if (originalResidential.getFurnished() != null) {
                upsertResidentialDTO.setFurnished(originalResidential.getFurnished().getCode());
            }
            if (originalResidential.getBuildingComplex() != null) {
                upsertResidentialDTO.setBuildingComplex(originalResidential.getBuildingComplex().getCode());
            }
            if (originalResidential.getEligibleForBankCredit() != null) {
                upsertResidentialDTO.setEligibleForBankCredit(originalResidential.getEligibleForBankCredit().getCode());
            }
            upsertResidentialDTO.setInteriorProperties(originalResidential.getInteriorProperties().stream().map(e -> e.getCode()).collect(Collectors.toList()));
            upsertResidentialDTO.setExternalProperties(originalResidential.getExternalProperties().stream().map(e -> e.getCode()).collect(Collectors.toList()));

            upsertResidentialDTO.setFloorSpaceGross(originalResidential.getFloorSpaceGross());
            upsertResidentialDTO.setFloorSpaceNet(originalResidential.getFloorSpaceNet());
            upsertResidentialDTO.setDues(originalResidential.getDues());
            if (originalResidential.getAgeOfBuilding() != null) {
                upsertResidentialDTO.setAgeOfBuilding(originalResidential.getAgeOfBuilding().getCode());
            }
            if (originalResidential.getHeating() != null) {
                upsertResidentialDTO.setHeating(originalResidential.getHeating().getCode());
            }
            if (originalResidential.getUseStatus() != null) {
                upsertResidentialDTO.setUseStatus(originalResidential.getUseStatus().getCode());
            }
            upsertResidentialDTO.setFrontages(originalResidential.getFrontages().stream().map(e -> e.getCode()).collect(Collectors.toList()));
            this.updateResidential(realEstateCode, upsertResidentialDTO);

        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(originalRealEstate.getRealEstateType().getCode())) {

            Commercial originalCommercial = this.commercialQueryService.checkAndGetCommercial(originalRealEstateCode);

            UpsertCommercialDTO upsertCommercialDTO = new UpsertCommercialDTO();
            if (originalCommercial.getCommercialType() != null) {
                upsertCommercialDTO.setCommercialType(originalCommercial.getCommercialType().getCode());
            }
            upsertCommercialDTO.setGeneralProperties(originalCommercial.getGeneralProperties().stream().map(e -> e.getCode()).collect(Collectors.toList()));

            upsertCommercialDTO.setFloorSpaceGross(originalCommercial.getFloorSpaceGross());
            upsertCommercialDTO.setFloorSpaceNet(originalCommercial.getFloorSpaceNet());
            upsertCommercialDTO.setDues(originalCommercial.getDues());
            if (originalCommercial.getAgeOfBuilding() != null) {
                upsertCommercialDTO.setAgeOfBuilding(originalCommercial.getAgeOfBuilding().getCode());
            }
            if (originalCommercial.getHeating() != null) {
                upsertCommercialDTO.setHeating(originalCommercial.getHeating().getCode());
            }
            if (originalCommercial.getUseStatus() != null) {
                upsertCommercialDTO.setUseStatus(originalCommercial.getUseStatus().getCode());
            }
            upsertCommercialDTO.setFrontages(originalCommercial.getFrontages().stream().map(e -> e.getCode()).collect(Collectors.toList()));

            this.updateCommercial(realEstateCode, upsertCommercialDTO);
        } else if (BusinessConstants.RealEstateType.LAND.equals(originalRealEstate.getRealEstateType().getCode())) {

            Land originalLand = this.landQueryService.checkAndGetLand(originalRealEstateCode);

            UpsertLandDTO createLandDTO = new UpsertLandDTO();
            if (originalLand.getLandType() != null) {
                createLandDTO.setLandType(originalLand.getLandType().getCode());
            }
            createLandDTO.setFloorSpaceNet(originalLand.getFloorSpaceNet());
            if (originalLand.getLandToBuildingRatio() != null) {
                createLandDTO.setLandToBuildingRatio(originalLand.getLandToBuildingRatio().getCode());
            }
            if (originalLand.getHeightRestriction() != null) {
                createLandDTO.setHeightRestriction(originalLand.getHeightRestriction().getCode());
            }
            if (originalLand.getLandStatus() != null) {
                createLandDTO.setLandStatus(originalLand.getLandStatus().getCode());
            }

            createLandDTO.setInfrastructures(originalLand.getInfrastructures().stream().map(e -> e.getCode()).collect(Collectors.toList()));
            createLandDTO.setGeneralFeatures(originalLand.getGeneralFeatures().stream().map(e -> e.getCode()).collect(Collectors.toList()));
            this.updateLand(realEstateCode, createLandDTO);
        }

        if (originalRealEstate.getRealEstateAddress() != null) {
            UpdateRealEstateAddressDTO updateRealEstateAddressDTO = new UpdateRealEstateAddressDTO();
            if (originalRealEstate.getRealEstateAddress().getCity() != null) {
                updateRealEstateAddressDTO.setCity(originalRealEstate.getRealEstateAddress().getCity().getCode());
            }
            if (originalRealEstate.getRealEstateAddress().getDistrict() != null) {
                updateRealEstateAddressDTO.setDistrict(originalRealEstate.getRealEstateAddress().getDistrict().getCode());
            }
            if (originalRealEstate.getRealEstateAddress().getNeighborhood() != null) {
                updateRealEstateAddressDTO.setNeighborhood(originalRealEstate.getRealEstateAddress().getNeighborhood().getCode());
            }
            updateRealEstateAddressDTO.setAddressText(originalRealEstate.getRealEstateAddress().getAddressText());
            updateRealEstateAddressDTO.setLatitude(originalRealEstate.getRealEstateAddress().getLatitude());
            updateRealEstateAddressDTO.setLongitude(originalRealEstate.getRealEstateAddress().getLongitude());
            updateRealEstateAddressDTO.setParcelSearchUrl(originalRealEstate.getRealEstateAddress().getParcelSearchUrl());
            this.updateRealEstateAddress(realEstateCode, updateRealEstateAddressDTO);
        }


        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        realEstate.setRealEstateStatus(this.realEstateQueryService.checkAndGetRealEstateStatus(BusinessConstants.RealEstateStatus.DRAFT.name()));
        this.realEstateRepository.save(realEstate);

    }

    @Override
    public void updateEndDate(String realEstateCode, LocalDateTime enddate) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        if (realEstate.getEndDate() != null && enddate != null) {
            realEstate.setEndDate(enddate);
            this.realEstateRepository.save(realEstate);
        }
    }

    private void updateRealEstateStatus(String realEstateCode, BusinessConstants.RealEstateStatus newStatus) {
        if (BusinessConstants.RealEstateStatus.FINISHED.equals(newStatus)) {
            this.completeRealEstate(realEstateCode);
        } else {
            RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
            BusinessConstants.RealEstateStatus currentStatus = BusinessConstants.RealEstateStatus.of(realEstate.getRealEstateStatus().getCode());
            if (!currentStatus.equals(newStatus)) {
                if (currentStatus.equals(BusinessConstants.RealEstateStatus.ACTIVE)) {
                    if (!BusinessConstants.RealEstateStatus.PASSIVE.equals(newStatus) && !BusinessConstants.RealEstateStatus.CANCELLED.equals(newStatus)) {
                        throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NEW_STATUS_IS_NOT_VALID);
                    }
                } else if (currentStatus.equals(BusinessConstants.RealEstateStatus.PASSIVE)) {
                    if (!BusinessConstants.RealEstateStatus.ACTIVE.equals(newStatus) && !BusinessConstants.RealEstateStatus.STARTED.equals(newStatus) && !BusinessConstants.RealEstateStatus.CANCELLED.equals(newStatus)) {
                        throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NEW_STATUS_IS_NOT_VALID);
                    }
                    if (BusinessConstants.RealEstateStatus.ACTIVE.equals(newStatus)) {
                        if (realEstate.getAuctionDate() == null) {
                            LocalDateTime now = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);
                            realEstate.setAuctionDate(now);
                        }
                    }
                } else if (currentStatus.equals(BusinessConstants.RealEstateStatus.STARTED)) {
                    if (!BusinessConstants.RealEstateStatus.PASSIVE.equals(newStatus) && !BusinessConstants.RealEstateStatus.CANCELLED.equals(newStatus)) {
                        throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NEW_STATUS_IS_NOT_VALID);
                    }
                } else if (currentStatus.equals(BusinessConstants.RealEstateStatus.FINISHED)) {
                    if (!BusinessConstants.RealEstateStatus.FINISHED_SOLD.equals(newStatus)) {
                        throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NEW_STATUS_IS_NOT_VALID);
                    }
                } else if (currentStatus.equals(BusinessConstants.RealEstateStatus.FINISHED_SOLD)) {
                    throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NEW_STATUS_IS_NOT_VALID);
                } else if (currentStatus.equals(BusinessConstants.RealEstateStatus.CANCELLED)) {
                    if (!BusinessConstants.RealEstateStatus.PASSIVE.equals(newStatus)) {
                        throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NEW_STATUS_IS_NOT_VALID);
                    }
                }


                realEstate.setRealEstateStatus(this.realEstateQueryService.checkAndGetRealEstateStatus(newStatus.name()));
                realEstate = this.realEstateRepository.save(realEstate);
                if (BusinessConstants.RealEstateStatus.CANCELLED.equals(realEstate.getRealEstateStatus().getCode())) {
                    this.mailCommandAsyncService.sendCancelationMailsToBidders(realEstate.getCode());
                }

            }
        }
    }
}
