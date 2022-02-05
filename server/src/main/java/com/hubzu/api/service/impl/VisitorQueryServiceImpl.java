package com.hubzu.api.service.impl;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.request.search.SearchLightDTO;
import com.hubzu.api.dto.visitor.VisitorDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.exception.HubzuTechnicalException;
import com.hubzu.api.model.visitor.Visitor;
import com.hubzu.api.model.visitor.Visitor_;
import com.hubzu.api.repository.user.VisitorRepository;
import com.hubzu.api.service.VisitorQueryService;
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
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class VisitorQueryServiceImpl implements VisitorQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VisitorQueryServiceImpl.class);

    @Autowired
    private VisitorRepository visitorRepository;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public Visitor checkAndGetVisitor(Long id) {
        return this.visitorRepository.findById(id).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_VISITOR_NOT_FOUND));
    }

    @Override
    public Visitor checkAndGetVisitor(String code) {
        return this.visitorRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_VISITOR_NOT_FOUND));
    }

    @Override
    public void checkVisitorExists(String emailAddress) {
        if (this.visitorRepository.existsByEmailAddress(emailAddress)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_VISITOR_ALREADY_EXISTS);
        }
    }


    @Override
    public void checkVisitorExistsByEmailAddress(String emailAddress) {
        if (this.visitorRepository.existsByEmailAddress(emailAddress)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_VISITOR_ALREADY_EXISTS);
        }
    }

    @Override
    public VisitorDTO getVisitorDTO(String code) {
        Visitor visitor = this.checkAndGetVisitor(code);
        return new VisitorDTO(visitor);
    }

    @Override
    public List<VisitorDTO> getVisitorDTOs() {
        return this.visitorRepository.findAll().stream().map(VisitorDTO::new).collect(Collectors.toList());
    }

    private <T> List<Predicate> preparePredicates(SearchLightDTO searchLightDTO, CriteriaBuilder criteriaBuilder, Root<T> visitor) {
        List<Predicate> predicates = new ArrayList<>();

        Predicate notDeletedPredicate = criteriaBuilder.isFalse(visitor.get(Visitor_.DELETED));
        predicates.add(notDeletedPredicate);

        if (StringUtils.isNotEmpty(searchLightDTO.getSearchString())) {
            Predicate visitorIdentityNumberPredicate = criteriaBuilder.like(visitor.get(Visitor_.IDENTITY_NUMBER), "%" + searchLightDTO.getSearchString() + "%");
            Predicate visitorNamePredicate = criteriaBuilder.like(visitor.get(Visitor_.NAME), "%" + searchLightDTO.getSearchString() + "%");
            Predicate visitorSurnamePredicate = criteriaBuilder.like(visitor.get(Visitor_.SURNAME), "%" + searchLightDTO.getSearchString() + "%");
            Predicate visitorEmailPredicate = criteriaBuilder.like(visitor.get(Visitor_.EMAIL_ADDRESS), "%" + searchLightDTO.getSearchString() + "%");

            Predicate searchStringPredicate = criteriaBuilder.or(visitorIdentityNumberPredicate, visitorNamePredicate, visitorSurnamePredicate, visitorEmailPredicate);
            predicates.add(searchStringPredicate);
        }
        return predicates;
    }

    private Long searchVisitorCount(Session session, SearchLightDTO searchLightDTO) {

        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);

        Root<Visitor> visitor = criteriaQuery.from(Visitor.class);

        List<Predicate> predicates = this.preparePredicates(searchLightDTO, criteriaBuilder, visitor);


        criteriaQuery.select(criteriaBuilder.count(visitor)).where(predicates.toArray(new Predicate[0])).getRoots();
        TypedQuery<Long> query = session.createQuery(criteriaQuery);
        return query.getSingleResult();
    }

    private List<Visitor> searchVisitorResult(Session session, SearchLightDTO searchLightDTO) {
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Visitor> criteriaQuery = criteriaBuilder.createQuery(Visitor.class);

        Root<Visitor> visitor = criteriaQuery.from(Visitor.class);

        List<Predicate> predicates = this.preparePredicates(searchLightDTO, criteriaBuilder, visitor);


        criteriaQuery.select(visitor).where(predicates.toArray(new Predicate[0])).getRoots();
        Query query = session.createQuery(criteriaQuery);

        int pageNumber = searchLightDTO.getPageNo();
        int pageSize = searchLightDTO.getPageSize();

        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }


    @Override
    public ResponseOfPagedList<VisitorDTO> searchVisitor(SearchLightDTO searchLightDTO) {
        try (Session session = (Session) this.entityManager.getDelegate()) {
            Long totalCount = this.searchVisitorCount(session, searchLightDTO);
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {
                return new ResponseOfPagedList(totalCount, this.searchVisitorResult(session, searchLightDTO).stream().map(VisitorDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstate", e);
            throw new HubzuTechnicalException();
        }
    }
}
