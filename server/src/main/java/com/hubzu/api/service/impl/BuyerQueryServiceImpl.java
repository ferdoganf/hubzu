package com.hubzu.api.service.impl;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.dto.request.search.SearchBuyerDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.exception.HubzuTechnicalException;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.buyer.BuyerWarrant;
import com.hubzu.api.model.buyer.Buyer_;
import com.hubzu.api.model.user.UserStatus;
import com.hubzu.api.model.user.UserStatus_;
import com.hubzu.api.repository.buyer.BuyerWarrantRepository;
import com.hubzu.api.repository.user.BuyerRepository;
import com.hubzu.api.repository.user.UserFavouriteRepository;
import com.hubzu.api.service.BuyerQueryService;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
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
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BuyerQueryServiceImpl implements BuyerQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BuyerQueryServiceImpl.class);

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private BuyerWarrantRepository buyerWarrantRepository;

    @Autowired
    private UserFavouriteRepository userFavouriteRepository;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public Buyer checkAndGetBuyer(Long id) {
        return this.buyerRepository.findById(id).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_BUYER_NOT_FOUND));
    }

    @Override
    public Buyer getBuyer(Long id) {
        return this.buyerRepository.findById(id).orElse(null);
    }

    @Override
    public Buyer checkAndGetBuyer(String code) {
        return this.buyerRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_BUYER_NOT_FOUND));
    }

    @Override
    public void checkBuyerExists(String identityNumber, String emailAddress) {
        if (this.buyerRepository.existsByIdentityNumberOrEmailAddress(identityNumber, emailAddress)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_BUYER_ALREADY_EXISTS);
        }
    }

    @Override
    public void checkBuyerExistsByIdentityNumber(String identityNumber) {
        if (this.buyerRepository.existsByIdentityNumber(identityNumber)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_BUYER_ALREADY_EXISTS);
        }
    }

    @Override
    public void checkBuyerExistsByEmailAddress(String emailAddress) {
        if (this.buyerRepository.existsByEmailAddress(emailAddress)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_BUYER_ALREADY_EXISTS_WITH_EMAIL_ADDRESS);
        }
    }

    @Override
    public BuyerDTO getBuyerDTO(String code) {
        Buyer buyer = this.checkAndGetBuyer(code);
        return new BuyerDTO(buyer);
    }

    @Override
    public List<BuyerDTO> getBuyerDTOs() {
        return this.buyerRepository.findAll().stream().map(BuyerDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<UserLightDTO> getBuyersHasWarrantForRealEstate(String realEstateCode) {
        return this.buyerWarrantRepository.findAllByRealEstateCode(realEstateCode).stream().map(BuyerWarrant::getBuyer).map(UserLightDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<RealEstateLightDTO> getBuyersWarrantedRealEstates(String buyerCode) {
        return this.buyerWarrantRepository.findAllByBuyerCode(buyerCode).stream().map(BuyerWarrant::getRealEstate).map(RealEstateLightDTO::new).collect(Collectors.toList());
    }

    @Override
    public boolean buyerHasWarrantForRealestate(String buyerCode, String realEstateCode) {
        return this.buyerWarrantRepository.existsByBuyerCodeAndRealEstateCode(buyerCode, realEstateCode);
    }

    @Override
    public List<CodeBaseDTO> getBuyerWarrantedRealEstates(Long userId) {
        List<String> realEstateCodes = new ArrayList<>();
        realEstateCodes.add(BusinessConstants.RealEstateStatus.ACTIVE.name());
        realEstateCodes.add(BusinessConstants.RealEstateStatus.STARTED.name());

        return this.buyerWarrantRepository.findAllByBuyerIdAndRealEstateRealEstateStatusCodeIn(userId, realEstateCodes).stream().map(BuyerWarrant::getRealEstate).map(CodeBaseDTO::new).collect(Collectors.toList());

    }


    private <T> List<Predicate> preparePredicates(SearchBuyerDTO searchBuyerDTO, CriteriaBuilder criteriaBuilder, Root<T> buyer) {
        Join<Buyer_, UserStatus> userStatus = buyer.join(Buyer_.USER_STATUS, JoinType.INNER);

        List<Predicate> predicates = new ArrayList<>();

        Predicate notDeletedPredicate = criteriaBuilder.isFalse(buyer.get(Buyer_.DELETED));
        predicates.add(notDeletedPredicate);

        if (StringUtils.isNotEmpty(searchBuyerDTO.getSearchString())) {
            Predicate buyerIdentityNumberPredicate = criteriaBuilder.like(buyer.get(Buyer_.IDENTITY_NUMBER), "%" + searchBuyerDTO.getSearchString() + "%");
            Predicate buyerNamePredicate = criteriaBuilder.like(buyer.get(Buyer_.NAME), "%" + searchBuyerDTO.getSearchString() + "%");
            Predicate buyerSurnamePredicate = criteriaBuilder.like(buyer.get(Buyer_.SURNAME), "%" + searchBuyerDTO.getSearchString() + "%");
            Predicate buyerEmailPredicate = criteriaBuilder.like(buyer.get(Buyer_.EMAIL_ADDRESS), "%" + searchBuyerDTO.getSearchString() + "%");

            Predicate searchStringPredicate = criteriaBuilder.or(buyerIdentityNumberPredicate, buyerNamePredicate, buyerSurnamePredicate, buyerEmailPredicate);
            predicates.add(searchStringPredicate);
        }

        if (StringUtils.isNotEmpty(searchBuyerDTO.getUserStatus())) {
            predicates.add(criteriaBuilder.equal(userStatus.get(UserStatus_.CODE), searchBuyerDTO.getUserStatus()));
        }

        if (searchBuyerDTO.getStartDate() != null) {
            LocalDateTime startDate = LocalDateTime.ofInstant(searchBuyerDTO.getStartDate().atStartOfDay().atZone(ZoneId.of("Asia/Istanbul")).toInstant(), ZoneOffset.UTC);
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(buyer.get(Buyer_.CREATED_DATE), startDate));
        }

        if (searchBuyerDTO.getEndDate() != null) {
            LocalDateTime endDate = LocalDateTime.ofInstant(searchBuyerDTO.getEndDate().plusDays(1).atStartOfDay().atZone(ZoneId.of("Asia/Istanbul")).toInstant(), ZoneOffset.UTC);
            predicates.add(criteriaBuilder.lessThan(buyer.get(Buyer_.CREATED_DATE), endDate));
        }

        return predicates;
    }

    private Long searchBuyerCount(Session session, SearchBuyerDTO searchBuyerDTO) {

        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);

        Root<Buyer> buyer = criteriaQuery.from(Buyer.class);

        List<Predicate> predicates = this.preparePredicates(searchBuyerDTO, criteriaBuilder, buyer);


        criteriaQuery.select(criteriaBuilder.count(buyer)).where(predicates.toArray(new Predicate[0])).getRoots();
        TypedQuery<Long> query = session.createQuery(criteriaQuery);
        return query.getSingleResult();
    }

    private List<Buyer> searchBuyerResult(Session session, SearchBuyerDTO searchBuyerDTO) {
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Buyer> criteriaQuery = criteriaBuilder.createQuery(Buyer.class);

        Root<Buyer> buyer = criteriaQuery.from(Buyer.class);

        List<Predicate> predicates = this.preparePredicates(searchBuyerDTO, criteriaBuilder, buyer);


        criteriaQuery.select(buyer).where(predicates.toArray(new Predicate[0])).getRoots();


        if (StringUtils.isNotEmpty(searchBuyerDTO.getOrderType()) && searchBuyerDTO.getOrderType().equalsIgnoreCase("desc")) {
            criteriaQuery.orderBy(criteriaBuilder.desc(buyer.get(searchBuyerDTO.getOrderBy())));
        } else {
            criteriaQuery.orderBy(criteriaBuilder.asc(buyer.get(searchBuyerDTO.getOrderBy())));
        }


        Query query = session.createQuery(criteriaQuery);

        int pageNumber = searchBuyerDTO.getPageNo();
        int pageSize = searchBuyerDTO.getPageSize();

        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }


    @Override
    public ResponseOfPagedList<BuyerDTO> searchBuyer(SearchBuyerDTO searchBuyerDTO) {
        try (Session session = (Session) this.entityManager.getDelegate()) {
            Long totalCount = this.searchBuyerCount(session, searchBuyerDTO);
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {
                return new ResponseOfPagedList(totalCount, this.searchBuyerResult(session, searchBuyerDTO).stream().map(BuyerDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstate", e);
            throw new HubzuTechnicalException();
        }
    }
}
