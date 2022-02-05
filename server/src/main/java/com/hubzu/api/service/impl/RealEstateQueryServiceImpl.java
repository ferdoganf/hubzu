package com.hubzu.api.service.impl;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.buyer.UserFavouriteDTO;
import com.hubzu.api.dto.metadata.RealEstateMetadataDTO;
import com.hubzu.api.dto.realestate.RealEstateChangeDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.dto.realestate.building.CommercialDTO;
import com.hubzu.api.dto.realestate.building.ResidentialDTO;
import com.hubzu.api.dto.realestate.land.LandDTO;
import com.hubzu.api.dto.request.search.SearchRealEstateDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.exception.HubzuTechnicalException;
import com.hubzu.api.model.address.City;
import com.hubzu.api.model.address.City_;
import com.hubzu.api.model.address.District;
import com.hubzu.api.model.address.District_;
import com.hubzu.api.model.bank.Bank;
import com.hubzu.api.model.bank.Bank_;
import com.hubzu.api.model.realestate.*;
import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.model.realestate.building.commercial.CommercialType;
import com.hubzu.api.model.realestate.building.commercial.CommercialType_;
import com.hubzu.api.model.realestate.building.commercial.Commercial_;
import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.model.realestate.building.residential.ResidentialType;
import com.hubzu.api.model.realestate.building.residential.ResidentialType_;
import com.hubzu.api.model.realestate.building.residential.Residential_;
import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.model.realestate.land.LandType;
import com.hubzu.api.model.realestate.land.LandType_;
import com.hubzu.api.model.realestate.land.Land_;
import com.hubzu.api.repository.realestate.RealEstateRepository;
import com.hubzu.api.repository.realestate.RealEstateStatusRepository;
import com.hubzu.api.repository.user.UserFavouriteRepository;
import com.hubzu.api.service.*;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class RealEstateQueryServiceImpl implements RealEstateQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RealEstateQueryServiceImpl.class);

    @Autowired
    private BankQueryService bankQueryService;
    @Autowired
    private RealEstatePropertiesQueryService realEstatePropertiesQueryService;
    @Autowired
    private ResidentialQueryService residentialQueryService;
    @Autowired
    private CommercialQueryService commercialQueryService;
    @Autowired
    private LandQueryService landQueryService;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private RealEstateRepository realEstateRepository;
    @Autowired
    private RealEstateStatusRepository realEstateStatusRepository;

    @Autowired
    private UserFavouriteRepository userFavouriteRepository;


    @Override
    public RealEstateMetadataDTO getRealEstateMetadata() {
        RealEstateMetadataDTO realEstateMetadataDTO = new RealEstateMetadataDTO();

        realEstateMetadataDTO.setRealEstateStatus(this.getRealEstateStatusDTOs());

        realEstateMetadataDTO.setBanks(this.bankQueryService.getBankCodeNameBaseDTOs());
        realEstateMetadataDTO.setRealEstateTypes(this.realEstatePropertiesQueryService.getRealEstateTypeCodeBaseDTOs());

        realEstateMetadataDTO.setAgeOfBuildingTypes(this.realEstatePropertiesQueryService.getAgeOfBuildingTypeCodeBaseDTOs());
        realEstateMetadataDTO.setHeatingTypes(this.realEstatePropertiesQueryService.getHeatingTypeCodeBaseDTOs());
        realEstateMetadataDTO.setUseStatusTypes(this.realEstatePropertiesQueryService.getUseStatusTypeCodeBaseDTOs());
        realEstateMetadataDTO.setFrontageTypes(this.realEstatePropertiesQueryService.getFrontageTypeCodeBaseDTOs());

        realEstateMetadataDTO.setResidentialTypes(this.residentialQueryService.getResidentialTypeCodeBaseDTOs());
        realEstateMetadataDTO.setNumberOfRoomsTypes(this.realEstatePropertiesQueryService.getNumberOfRoomsTypeCodeBaseDTOs());
        realEstateMetadataDTO.setFloorNumberTypes(this.realEstatePropertiesQueryService.getFloorNumberTypeCodeBaseDTOs());
        realEstateMetadataDTO.setNumberOfFloorsTypes(this.realEstatePropertiesQueryService.getNumberOfFloorsTypeCodeBaseDTOs());
        realEstateMetadataDTO.setNumberOfBathroomsTypes(this.realEstatePropertiesQueryService.getNumberOfBathroomsTypeCodeBaseDTOs());
        realEstateMetadataDTO.setBalconyTypes(this.realEstatePropertiesQueryService.getBalconyTypeCodeBaseDTOs());
        realEstateMetadataDTO.setFurnishedTypes(this.realEstatePropertiesQueryService.getFurnishedTypeCodeBaseDTOs());
        realEstateMetadataDTO.setBuildingComplexTypes(this.realEstatePropertiesQueryService.getBuildingComplexTypeCodeBaseDTOs());
        realEstateMetadataDTO.setEligibleForBankCreditTypes(this.realEstatePropertiesQueryService.getEligibleForBankCreditTypeCodeBaseDTOs());
        realEstateMetadataDTO.setInteriorPropertyTypes(this.realEstatePropertiesQueryService.getInteriorPropertyTypeCodeBaseDTOs());
        realEstateMetadataDTO.setExternalPropertyTypes(this.realEstatePropertiesQueryService.getExternalPropertyTypeCodeBaseDTOs());

        realEstateMetadataDTO.setCommercialTypes(this.commercialQueryService.getCommercialTypeCodeBaseDTOs());
        realEstateMetadataDTO.setGeneralPropertyTypes(this.realEstatePropertiesQueryService.getGeneralPropertyTypeCodeBaseDTOs());

        realEstateMetadataDTO.setLandTypes(this.landQueryService.getLandTypeCodeBaseDTOs());
        realEstateMetadataDTO.setInfrastructureTypes(this.realEstatePropertiesQueryService.getInfrastructureTypeCodeBaseDTOs());
        realEstateMetadataDTO.setGeneralFeatureTypes(this.realEstatePropertiesQueryService.getGeneralFeatureTypeCodeBaseDTOs());
        realEstateMetadataDTO.setLandToBuildingRatioTypes(this.realEstatePropertiesQueryService.getLandToBuildingRatioTypeCodeBaseDTOs());
        realEstateMetadataDTO.setHeightRestrictionTypes(this.realEstatePropertiesQueryService.getHeightRestrictionTypeCodeBaseDTOs());
        realEstateMetadataDTO.setLandStatusTypes(this.realEstatePropertiesQueryService.getLandStatusTypeCodeBaseDTOs());

        return realEstateMetadataDTO;
    }

    @Override
    public void checkRealEstateAlreadyExists(String code) {
        RealEstate realEstate = this.realEstateRepository.findByCode(code).orElse(null);
        if (realEstate != null) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_ALREADY_EXISTS_BY_CODE);
        }
    }

    @Override
    public RealEstate checkAndGetRealEstate(String code) {
        return this.realEstateRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_NOT_FOUND));
    }

    @Override
    public RealEstateStatus checkAndGetRealEstateStatus(String code) {
        return this.realEstateStatusRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_STATUS_NOT_FOUND));
    }

    @Override
    public RealEstateDTO getRealEstate(String code) {
        RealEstate realEstate = this.checkAndGetRealEstate(code);
        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(realEstate.getRealEstateType().getCode())) {
            return new ResidentialDTO((Residential) Hibernate.unproxy(realEstate));
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(realEstate.getRealEstateType().getCode())) {
            return new CommercialDTO((Commercial) Hibernate.unproxy(realEstate));
        } else if (BusinessConstants.RealEstateType.LAND.equals(realEstate.getRealEstateType().getCode())) {
            return new LandDTO((Land) Hibernate.unproxy(realEstate));
        }
        return null;
    }

    @Override
    public List<CodeBaseDTO> getRealEstateStatusDTOs() {
        return this.realEstateStatusRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    private <T> List<Predicate> preparePredicates(SearchRealEstateDTO searchRealEstateDTO, CriteriaBuilder criteriaBuilder, Root<T> realEstate) {
        Join<RealEstate, RealEstateStatus> realEstateStatus = realEstate.join(RealEstate_.REAL_ESTATE_STATUS, JoinType.INNER);
        Join<RealEstate, Bank> bank = realEstate.join(RealEstate_.BANK, JoinType.INNER);
        Join<RealEstate, RealEstateType> realEstateType = realEstate.join(RealEstate_.REAL_ESTATE_TYPE, JoinType.INNER);
        Join<RealEstate, RealEstateAddress> realEstateAddress = realEstate.join(RealEstate_.REAL_ESTATE_ADDRESS, JoinType.LEFT);

        Join<RealEstateAddress, City> city = realEstateAddress.join(RealEstateAddress_.CITY, JoinType.LEFT);
        Join<RealEstateAddress, District> district = realEstateAddress.join(RealEstateAddress_.DISTRICT, JoinType.LEFT);

        List<Predicate> predicates = new ArrayList<>();
        if (searchRealEstateDTO.getRealEstateStatus() != null && (!searchRealEstateDTO.getRealEstateStatus().isEmpty())) {
            Expression<String> parentExpression = realEstateStatus.get(RealEstateStatus_.CODE);
            Predicate parentPredicate = parentExpression.in(searchRealEstateDTO.getRealEstateStatus());

            if ((searchRealEstateDTO.getRealEstateStatus() != null) && (searchRealEstateDTO.getRealEstateStatus().size() == 2) && searchRealEstateDTO.getRealEstateStatus().contains(BusinessConstants.RealEstateStatus.FINISHED.name())) {
                parentPredicate = criteriaBuilder.and(parentPredicate, criteriaBuilder.and(
                        criteriaBuilder.isNotNull(realEstate.get(RealEstate_.START_DATE)),
                        criteriaBuilder.isNotNull(realEstate.get(RealEstate_.END_DATE)),
                        criteriaBuilder.isTrue(realEstate.get(RealEstate_.FINISHED_AUCTIONS_SHOWN)),
                        criteriaBuilder.lessThan(criteriaBuilder.diff(
                                criteriaBuilder.function("TO_SECONDS", Long.class, realEstate.get(RealEstate_.END_DATE)),
                                criteriaBuilder.function("TO_SECONDS", Long.class, criteriaBuilder.currentTimestamp())
                        ), 0L)
                ));
            } else if ((searchRealEstateDTO.getRealEstateStatus() != null) && (searchRealEstateDTO.getRealEstateStatus().size() == 1) && searchRealEstateDTO.getRealEstateStatus().contains(BusinessConstants.RealEstateStatus.STARTED.name())) {
                parentPredicate = criteriaBuilder.and(parentPredicate, criteriaBuilder.and(
                        criteriaBuilder.isNotNull(realEstate.get(RealEstate_.START_DATE)),
                        criteriaBuilder.isNotNull(realEstate.get(RealEstate_.END_DATE)),
                        criteriaBuilder.greaterThan(criteriaBuilder.diff(
                                criteriaBuilder.function("TO_SECONDS", Long.class, realEstate.get(RealEstate_.END_DATE)),
                                criteriaBuilder.function("TO_SECONDS", Long.class, criteriaBuilder.currentTimestamp())
                        ), 0L)
                ));
            }
            predicates.add(parentPredicate);
        }

        predicates.add(criteriaBuilder.isTrue(bank.get(Bank_.ENABLED)));

        if (StringUtils.isNotEmpty(searchRealEstateDTO.getBank())) {
            predicates.add(criteriaBuilder.equal(bank.get(Bank_.CODE), searchRealEstateDTO.getBank()));
        }

        if (StringUtils.isNotEmpty(searchRealEstateDTO.getRealEstateType())) {
            predicates.add(criteriaBuilder.equal(realEstateType.get(RealEstateType_.CODE), searchRealEstateDTO.getRealEstateType()));
        }

        if (StringUtils.isNotEmpty(searchRealEstateDTO.getCity())) {
            predicates.add(criteriaBuilder.equal(city.get(City_.CODE), searchRealEstateDTO.getCity()));
        }

        if (StringUtils.isNotEmpty(searchRealEstateDTO.getDistrict())) {
            predicates.add(criteriaBuilder.equal(district.get(District_.CODE), searchRealEstateDTO.getDistrict()));
        }

        if (searchRealEstateDTO.isOnlyOccasions()) {
            predicates.add(criteriaBuilder.isTrue(realEstate.get(RealEstate_.OCCASION)));
        }

        if (StringUtils.isNotEmpty(searchRealEstateDTO.getSearchString())) {
            Predicate realEstateCodePredicate = criteriaBuilder.like(realEstate.get(RealEstate_.CODE), "%" + searchRealEstateDTO.getSearchString() + "%");
            Predicate realEstateTitlePredicate = criteriaBuilder.like(realEstate.get(RealEstate_.TITLE), "%" + searchRealEstateDTO.getSearchString() + "%");
            Predicate realEstateDescriptionPredicate = criteriaBuilder.like(realEstate.get(RealEstate_.DESCRIPTION), "%" + searchRealEstateDTO.getSearchString() + "%");

            Predicate searchCityBySearchStringPredicate = criteriaBuilder.like(city.get(City_.NAME), "%" + searchRealEstateDTO.getSearchString() + "%");
            Predicate searchDistrictBySearchStringPredicate = criteriaBuilder.like(district.get(District_.NAME), "%" + searchRealEstateDTO.getSearchString() + "%");
            Predicate searchRealEstateTypeBySearchStringPredicate = criteriaBuilder.like(realEstateType.get(RealEstateType_.NAME), "%" + searchRealEstateDTO.getSearchString() + "%");

            Predicate searchStringPredicate = criteriaBuilder.or(realEstateCodePredicate, realEstateTitlePredicate, realEstateDescriptionPredicate, searchCityBySearchStringPredicate, searchDistrictBySearchStringPredicate, searchRealEstateTypeBySearchStringPredicate);
            predicates.add(searchStringPredicate);
        }
        return predicates;
    }

    private CriteriaQuery<RealEstate> searchRealEstateResult(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO, boolean forceOrderBy) {
        CriteriaQuery<RealEstate> criteriaQuery = criteriaBuilder.createQuery(RealEstate.class);
        Root<RealEstate> realEstate = criteriaQuery.from(RealEstate.class);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        criteriaQuery.select(realEstate).where(predicates.toArray(new Predicate[0])).getRoots();


        if (forceOrderBy) {
            if (StringUtils.isNotEmpty(searchRealEstateDTO.getOrderType()) && searchRealEstateDTO.getOrderType().equalsIgnoreCase("desc")) {
                criteriaQuery.orderBy(criteriaBuilder.desc(realEstate.get(searchRealEstateDTO.getOrderBy())));
            } else {
                criteriaQuery.orderBy(criteriaBuilder.asc(realEstate.get(searchRealEstateDTO.getOrderBy())));
            }
        } else {
            Expression<Integer> caseExpType = criteriaBuilder.<Integer>selectCase()
                    .when(
                            criteriaBuilder.and(
                                    criteriaBuilder.isNull(realEstate.get(RealEstate_.START_DATE)),
                                    criteriaBuilder.isNull(realEstate.get(RealEstate_.END_DATE))
                            ),
                            2
                    )
                    .when(
                            criteriaBuilder.and(
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.START_DATE)),
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.END_DATE)),
                                    criteriaBuilder.greaterThanOrEqualTo(criteriaBuilder.diff(
                                            criteriaBuilder.function("TO_SECONDS", Long.class, realEstate.get(RealEstate_.END_DATE)),
                                            criteriaBuilder.function("TO_SECONDS", Long.class, criteriaBuilder.currentTimestamp())
                                    ), 0L)
                            ),
                            3
                    )
                    .when(
                            criteriaBuilder.and(
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.START_DATE)),
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.END_DATE)),
                                    criteriaBuilder.lessThan(criteriaBuilder.diff(
                                            criteriaBuilder.function("TO_SECONDS", Long.class, realEstate.get(RealEstate_.END_DATE)),
                                            criteriaBuilder.function("TO_SECONDS", Long.class, criteriaBuilder.currentTimestamp())
                                    ), 0L)
                            ),
                            0
                    )
                    .otherwise(1);


            Expression<Integer> caseExp = criteriaBuilder.<Integer>selectCase()
                    .when(
                            criteriaBuilder.and(
                                    criteriaBuilder.isNull(realEstate.get(RealEstate_.START_DATE)),
                                    criteriaBuilder.isNull(realEstate.get(RealEstate_.END_DATE))
                            ),
                            criteriaBuilder.function("TO_DAYS", Integer.class, realEstate.get(RealEstate_.AUCTION_DATE))
                    )
                    .when(
                            criteriaBuilder.and(
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.START_DATE)),
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.END_DATE)),
                                    criteriaBuilder.greaterThanOrEqualTo(criteriaBuilder.diff(
                                            criteriaBuilder.function("TO_SECONDS", Long.class, realEstate.get(RealEstate_.END_DATE)),
                                            criteriaBuilder.function("TO_SECONDS", Long.class, criteriaBuilder.currentTimestamp())
                                    ), 0L)
                            ),
                            criteriaBuilder.function("TO_DAYS", Integer.class, realEstate.get(RealEstate_.END_DATE))
                    )
                    .when(
                            criteriaBuilder.and(
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.START_DATE)),
                                    criteriaBuilder.isNotNull(realEstate.get(RealEstate_.END_DATE)),
                                    criteriaBuilder.lessThan(criteriaBuilder.diff(
                                            criteriaBuilder.function("TO_SECONDS", Long.class, realEstate.get(RealEstate_.END_DATE)),
                                            criteriaBuilder.function("TO_SECONDS", Long.class, criteriaBuilder.currentTimestamp())
                                    ), 0L)
                            ),
                            criteriaBuilder.neg(criteriaBuilder.function("TO_DAYS", Integer.class, realEstate.get(RealEstate_.END_DATE)))
                    )
                    .otherwise(0);

            Order orderByType = criteriaBuilder.desc(caseExpType);
            Order orderByValue = criteriaBuilder.asc(caseExp);
            criteriaQuery.orderBy(orderByType, orderByValue);
        }

        //criteriaQuery.orderBy(criteriaBuilder.asc(realEstate.get(RealEstate_.REAL_ESTATE_STATUS)), criteriaBuilder.asc(realEstate.get(RealEstate_.END_DATE)));
        return criteriaQuery;
    }

    private CriteriaQuery<Long> searchRealEstateCount(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<RealEstate> realEstate = criteriaQuery.from(RealEstate.class);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        criteriaQuery.select(criteriaBuilder.count(realEstate)).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    private CriteriaQuery<Long> searchResidentialRealEstateCount(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<Residential> realEstate = criteriaQuery.from(Residential.class);
        Join<Residential, ResidentialType> residentialType = realEstate.join(Residential_.RESIDENTIAL_TYPE, JoinType.INNER);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        if (StringUtils.isNotEmpty(searchRealEstateDTO.getResidentialType())) {
            predicates.add(criteriaBuilder.equal(residentialType.get(ResidentialType_.CODE), searchRealEstateDTO.getResidentialType()));
        }
        criteriaQuery.select(criteriaBuilder.count(realEstate)).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    private CriteriaQuery<Residential> searchResidentialRealEstateResult(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Residential> criteriaQuery = criteriaBuilder.createQuery(Residential.class);
        Root<Residential> realEstate = criteriaQuery.from(Residential.class);
        Join<Residential, ResidentialType> residentialType = realEstate.join(Residential_.RESIDENTIAL_TYPE, JoinType.INNER);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        if (StringUtils.isNotEmpty(searchRealEstateDTO.getResidentialType())) {
            predicates.add(criteriaBuilder.equal(residentialType.get(ResidentialType_.CODE), searchRealEstateDTO.getResidentialType()));
        }
        criteriaQuery.select(realEstate).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    private CriteriaQuery<Long> searchCommercialRealEstateCount(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<Commercial> realEstate = criteriaQuery.from(Commercial.class);
        Join<Commercial, CommercialType> commercialType = realEstate.join(Commercial_.COMMERCIAL_TYPE, JoinType.INNER);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        if (StringUtils.isNotEmpty(searchRealEstateDTO.getCommercialType())) {
            predicates.add(criteriaBuilder.equal(commercialType.get(CommercialType_.CODE), searchRealEstateDTO.getCommercialType()));
        }
        criteriaQuery.select(criteriaBuilder.count(realEstate)).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    private CriteriaQuery<Commercial> searchCommercialRealEstateResult(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Commercial> criteriaQuery = criteriaBuilder.createQuery(Commercial.class);
        Root<Commercial> realEstate = criteriaQuery.from(Commercial.class);
        Join<Commercial, CommercialType> commercialType = realEstate.join(Commercial_.COMMERCIAL_TYPE, JoinType.INNER);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        if (StringUtils.isNotEmpty(searchRealEstateDTO.getCommercialType())) {
            predicates.add(criteriaBuilder.equal(commercialType.get(CommercialType_.CODE), searchRealEstateDTO.getCommercialType()));
        }
        criteriaQuery.select(realEstate).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    private CriteriaQuery<Long> searchLandRealEstateCount(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<Land> realEstate = criteriaQuery.from(Land.class);
        Join<Land, LandType> landType = realEstate.join(Land_.LAND_TYPE, JoinType.INNER);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        if (StringUtils.isNotEmpty(searchRealEstateDTO.getLandType())) {
            predicates.add(criteriaBuilder.equal(landType.get(LandType_.CODE), searchRealEstateDTO.getLandType()));
        }
        criteriaQuery.select(criteriaBuilder.count(realEstate)).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    private CriteriaQuery<Land> searchLandRealEstateResult(CriteriaBuilder criteriaBuilder, SearchRealEstateDTO searchRealEstateDTO) {
        CriteriaQuery<Land> criteriaQuery = criteriaBuilder.createQuery(Land.class);
        Root<Land> realEstate = criteriaQuery.from(Land.class);
        Join<Land, LandType> landType = realEstate.join(Land_.LAND_TYPE, JoinType.INNER);
        List<Predicate> predicates = this.preparePredicates(searchRealEstateDTO, criteriaBuilder, realEstate);
        if (StringUtils.isNotEmpty(searchRealEstateDTO.getLandType())) {
            predicates.add(criteriaBuilder.equal(landType.get(LandType_.CODE), searchRealEstateDTO.getLandType()));
        }
        criteriaQuery.select(realEstate).where(predicates.toArray(new Predicate[0])).getRoots();
        return criteriaQuery;
    }

    @Override
    public ResponseOfPagedList<RealEstateLightDTO> searchRealEstate(SearchRealEstateDTO searchRealEstateDTO) {
        try {
            CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();

            CriteriaQuery<Long> totalCountQuery = this.searchRealEstateCount(criteriaBuilder, searchRealEstateDTO);
            TypedQuery<Long> countQuery = this.entityManager.createQuery(totalCountQuery);
            Long totalCount = countQuery.getSingleResult();

            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {

                CriteriaQuery<RealEstate> realestateCriteriaQuery = this.searchRealEstateResult(criteriaBuilder, searchRealEstateDTO, true);

                Query query = this.entityManager.createQuery(realestateCriteriaQuery);
                int pageNumber = searchRealEstateDTO.getPageNo();
                int pageSize = searchRealEstateDTO.getPageSize();
                query.setFirstResult((pageNumber - 1) * pageSize);
                query.setMaxResults(pageSize);
                List<RealEstate> resultList = query.getResultList();

                return new ResponseOfPagedList(totalCount, resultList.stream().map(RealEstateDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstate", e);
            throw new HubzuTechnicalException();
        }
    }

    @Override
    public ResponseOfPagedList<RealEstateDTO> searchRealEstatePublic(SearchRealEstateDTO searchRealEstateDTO) {

        if (StringUtils.isNotEmpty(searchRealEstateDTO.getRealEstateType())) {
            if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(searchRealEstateDTO.getRealEstateType()) && StringUtils.isNotEmpty(searchRealEstateDTO.getResidentialType())) {
                return this.searchResidentialRealEstatePublic(searchRealEstateDTO);
            } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(searchRealEstateDTO.getRealEstateType()) && StringUtils.isNotEmpty(searchRealEstateDTO.getCommercialType())) {
                return this.searchCommercialRealEstatePublic(searchRealEstateDTO);
            }
            if (BusinessConstants.RealEstateType.LAND.equals(searchRealEstateDTO.getRealEstateType()) && StringUtils.isNotEmpty(searchRealEstateDTO.getLandType())) {
                return this.searchLandRealEstatePublic(searchRealEstateDTO);
            }
        }

        if (searchRealEstateDTO.getRealEstateStatus() == null) {
            searchRealEstateDTO.setRealEstateStatus(new ArrayList<>());
        }
        if (searchRealEstateDTO.getRealEstateStatus().isEmpty()) {
            searchRealEstateDTO.getRealEstateStatus().addAll(BusinessConstants.RealEstateStatus.publicStatus());
        }

        try {
            CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();

            CriteriaQuery<Long> totalCountQuery = this.searchRealEstateCount(criteriaBuilder, searchRealEstateDTO);
            TypedQuery<Long> countQuery = this.entityManager.createQuery(totalCountQuery);
            Long totalCount = countQuery.getSingleResult();
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {
                CriteriaQuery<RealEstate> realestateCriteriaQuery = this.searchRealEstateResult(criteriaBuilder, searchRealEstateDTO, false);

                Query query = this.entityManager.createQuery(realestateCriteriaQuery);
                int pageNumber = searchRealEstateDTO.getPageNo();
                int pageSize = searchRealEstateDTO.getPageSize();
                query.setFirstResult((pageNumber - 1) * pageSize);
                query.setMaxResults(pageSize);
                List<RealEstate> resultList = query.getResultList();

                return new ResponseOfPagedList(totalCount, resultList.stream().map(RealEstateDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstatePublic", e);
            throw new HubzuTechnicalException();
        }
    }

    @Override
    public List<UserFavouriteDTO> favorites(String realEstateCode) {
        return this.userFavouriteRepository.findAllByRealEstateCode(realEstateCode).stream().map(UserFavouriteDTO::new).collect(Collectors.toList());
    }

    @Override
    public BigDecimal getRealEstateDepositAmount(String realEstateCode) {
        BigDecimal amount = BigDecimal.ZERO;
        RealEstate realEstate = this.checkAndGetRealEstate(realEstateCode);
        if (realEstate.getTenderParticipationFee() != null && (realEstate.getTenderParticipationFee().compareTo(BigDecimal.ZERO) > 0)) {
            amount = realEstate.getTenderParticipationFee();
        } else if (realEstate.getDepositRate() != null && (realEstate.getDepositRate().compareTo(BigDecimal.ZERO) > 0)) {
            amount = realEstate.getDepositRate().multiply(realEstate.getStartingAmount());
            amount = amount.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_DOWN);
        } else if (realEstate.getBank().getDepositRate() != null && (realEstate.getBank().getDepositRate().compareTo(BigDecimal.ZERO) > 0)) {
            amount = realEstate.getBank().getDepositRate().multiply(realEstate.getStartingAmount());
            amount = amount.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_DOWN);
        }
        return amount;
    }

    @Override
    public RealEstateChangeDTO getRealEstateCurrentBidAmount(String realEstateCode) {
        RealEstate realEstate = this.checkAndGetRealEstate(realEstateCode);
        return new RealEstateChangeDTO(realEstate);
    }


    private ResponseOfPagedList<RealEstateDTO> searchResidentialRealEstatePublic(SearchRealEstateDTO searchRealEstateDTO) {
        if (searchRealEstateDTO.getRealEstateStatus() == null) {
            searchRealEstateDTO.setRealEstateStatus(new ArrayList<>());
        }
        if (searchRealEstateDTO.getRealEstateStatus().isEmpty()) {
            searchRealEstateDTO.getRealEstateStatus().addAll(BusinessConstants.RealEstateStatus.publicStatus());
        }
        searchRealEstateDTO.getRealEstateStatus().retainAll(BusinessConstants.RealEstateStatus.publicStatus());
        try {
            CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();

            CriteriaQuery<Long> totalCountQuery = this.searchResidentialRealEstateCount(criteriaBuilder, searchRealEstateDTO);
            TypedQuery<Long> countQuery = this.entityManager.createQuery(totalCountQuery);
            Long totalCount = countQuery.getSingleResult();
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {
                CriteriaQuery<Residential> criteriaQuery = this.searchResidentialRealEstateResult(criteriaBuilder, searchRealEstateDTO);
                Query query = this.entityManager.createQuery(criteriaQuery);
                int pageNumber = searchRealEstateDTO.getPageNo();
                int pageSize = searchRealEstateDTO.getPageSize();
                query.setFirstResult((pageNumber - 1) * pageSize);
                query.setMaxResults(pageSize);
                List<Residential> resultList = query.getResultList();

                return new ResponseOfPagedList(totalCount, resultList.stream().map(RealEstateDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstatePublic", e);
            throw new HubzuTechnicalException();
        }
    }

    private ResponseOfPagedList<RealEstateDTO> searchCommercialRealEstatePublic(SearchRealEstateDTO searchRealEstateDTO) {
        if (searchRealEstateDTO.getRealEstateStatus() == null) {
            searchRealEstateDTO.setRealEstateStatus(new ArrayList<>());
        }
        if (searchRealEstateDTO.getRealEstateStatus().isEmpty()) {
            searchRealEstateDTO.getRealEstateStatus().addAll(BusinessConstants.RealEstateStatus.publicStatus());
        }
        searchRealEstateDTO.getRealEstateStatus().retainAll(BusinessConstants.RealEstateStatus.publicStatus());
        try {
            CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();

            CriteriaQuery<Long> totalCountQuery = this.searchCommercialRealEstateCount(criteriaBuilder, searchRealEstateDTO);
            TypedQuery<Long> countQuery = this.entityManager.createQuery(totalCountQuery);
            Long totalCount = countQuery.getSingleResult();
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {

                CriteriaQuery<Commercial> criteriaQuery = this.searchCommercialRealEstateResult(criteriaBuilder, searchRealEstateDTO);
                Query query = this.entityManager.createQuery(criteriaQuery);
                int pageNumber = searchRealEstateDTO.getPageNo();
                int pageSize = searchRealEstateDTO.getPageSize();
                query.setFirstResult((pageNumber - 1) * pageSize);
                query.setMaxResults(pageSize);
                List<Residential> resultList = query.getResultList();

                return new ResponseOfPagedList(totalCount, resultList.stream().map(RealEstateDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstatePublic", e);
            throw new HubzuTechnicalException();
        }
    }

    private ResponseOfPagedList<RealEstateDTO> searchLandRealEstatePublic(SearchRealEstateDTO searchRealEstateDTO) {
        if (searchRealEstateDTO.getRealEstateStatus() == null) {
            searchRealEstateDTO.setRealEstateStatus(new ArrayList<>());
        }
        if (searchRealEstateDTO.getRealEstateStatus().isEmpty()) {
            searchRealEstateDTO.getRealEstateStatus().addAll(BusinessConstants.RealEstateStatus.publicStatus());
        }
        searchRealEstateDTO.getRealEstateStatus().retainAll(BusinessConstants.RealEstateStatus.publicStatus());
        try {
            CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();

            CriteriaQuery<Long> totalCountQuery = this.searchLandRealEstateCount(criteriaBuilder, searchRealEstateDTO);
            TypedQuery<Long> countQuery = this.entityManager.createQuery(totalCountQuery);
            Long totalCount = countQuery.getSingleResult();
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {

                CriteriaQuery<Land> criteriaQuery = this.searchLandRealEstateResult(criteriaBuilder, searchRealEstateDTO);
                Query query = this.entityManager.createQuery(criteriaQuery);
                int pageNumber = searchRealEstateDTO.getPageNo();
                int pageSize = searchRealEstateDTO.getPageSize();
                query.setFirstResult((pageNumber - 1) * pageSize);
                query.setMaxResults(pageSize);
                List<Residential> resultList = query.getResultList();

                return new ResponseOfPagedList(totalCount, resultList.stream().map(RealEstateDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstatePublic", e);
            throw new HubzuTechnicalException();
        }
    }
}
