package com.hubzu.api.service.impl;

import com.hubzu.api.controller.response.ResponseOfPagedList;
import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.dto.metadata.BankDTO;
import com.hubzu.api.dto.request.search.SearchLightDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.exception.HubzuTechnicalException;
import com.hubzu.api.model.bank.Bank;
import com.hubzu.api.model.bank.Bank_;
import com.hubzu.api.repository.bank.BankRepository;
import com.hubzu.api.service.BankQueryService;
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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BankQueryServiceImpl implements BankQueryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BankQueryServiceImpl.class);

    @Autowired
    private BankRepository bankRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CodeNameBaseDTO> getBankCodeNameBaseDTOs() {
        List<Bank> banks = this.bankRepository.findByEnabled(true);
        List<CodeNameBaseDTO> codeNameBaseDTOS = banks.stream().map(CodeNameBaseDTO::new).collect(Collectors.toList());
        Collections.sort(codeNameBaseDTOS, Comparator.comparing(CodeNameBaseDTO::getName));
        return codeNameBaseDTOS;
    }

    @Override
    public Bank checkAndGetBank(String code) {
        return this.bankRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_BANK_NOT_FOUND));
    }

    private <T> List<Predicate> preparePredicates(SearchLightDTO searchLightDTO, CriteriaBuilder criteriaBuilder, Root<T> bank) {
        List<Predicate> predicates = new ArrayList<>();

        Predicate notDeletedPredicate = criteriaBuilder.isFalse(bank.get(Bank_.DELETED));
        predicates.add(notDeletedPredicate);

        if (StringUtils.isNotEmpty(searchLightDTO.getSearchString())) {
            Predicate bankCodePredicate = criteriaBuilder.like(bank.get(Bank_.CODE), "%" + searchLightDTO.getSearchString() + "%");
            Predicate bankNamePredicate = criteriaBuilder.like(bank.get(Bank_.NAME), "%" + searchLightDTO.getSearchString() + "%");

            Predicate searchStringPredicate = criteriaBuilder.or(bankCodePredicate, bankNamePredicate);
            predicates.add(searchStringPredicate);
        }
        return predicates;
    }

    private Long searchBankCount(Session session, SearchLightDTO searchLightDTO) {

        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);

        Root<Bank> bank = criteriaQuery.from(Bank.class);

        List<Predicate> predicates = this.preparePredicates(searchLightDTO, criteriaBuilder, bank);


        criteriaQuery.select(criteriaBuilder.count(bank)).where(predicates.toArray(new Predicate[0])).getRoots();
        TypedQuery<Long> query = session.createQuery(criteriaQuery);
        return query.getSingleResult();
    }

    private List<Bank> searchBankResult(Session session, SearchLightDTO searchLightDTO) {
        CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
        CriteriaQuery<Bank> criteriaQuery = criteriaBuilder.createQuery(Bank.class);

        Root<Bank> bank = criteriaQuery.from(Bank.class);

        List<Predicate> predicates = this.preparePredicates(searchLightDTO, criteriaBuilder, bank);


        criteriaQuery.select(bank).where(predicates.toArray(new Predicate[0])).getRoots();
        Query query = session.createQuery(criteriaQuery);

        int pageNumber = searchLightDTO.getPageNo();
        int pageSize = searchLightDTO.getPageSize();

        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }


    @Override
    public ResponseOfPagedList<BankDTO> searchBank(SearchLightDTO searchLightDTO) {
        try (Session session = (Session) this.entityManager.getDelegate()) {
            Long totalCount = this.searchBankCount(session, searchLightDTO);
            if (totalCount.compareTo(0L) < 1) {
                return new ResponseOfPagedList(0L, new ArrayList<>());
            } else {
                return new ResponseOfPagedList(totalCount, this.searchBankResult(session, searchLightDTO).stream().map(BankDTO::new).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            LOGGER.error("searchRealEstate", e);
            throw new HubzuTechnicalException();
        }
    }

    @Override
    public BankDTO getBankDTO(String code) {
        Bank bank = this.checkAndGetBank(code);
        return new BankDTO(bank);
    }

    @Override
    public void checkBankExists(String code) {
        if (this.bankRepository.existsByCode(code)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_BANK_ALREADY_EXISTS);
        }
    }

    @Override
    public BankDTO getBankCodeNameBaseDTO(String code) {
        Bank bank = this.bankRepository.findByCode(code).orElse(null);
        if (bank != null) {
            return new BankDTO(bank);
        }
        return null;
    }

    @Override
    public boolean exists(String bankCode) {
        return this.bankRepository.existsByCode(bankCode);
    }
}
