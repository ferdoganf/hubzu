package com.hubzu.api.listener;

import com.hubzu.api.model.audit.RealEstateStatusHistory;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.util.BeanUtil;

import javax.persistence.EntityManager;
import javax.persistence.PostPersist;
import javax.persistence.PostUpdate;
import javax.transaction.Transactional;
import java.util.Objects;

import static javax.transaction.Transactional.TxType.MANDATORY;


public class RealEstateEntityListener {

    @PostPersist
    void onPostPersist(RealEstate realEstate) {

        RealEstateStatusHistory realEstateStatusHistory = new RealEstateStatusHistory();

        realEstateStatusHistory.setUserId(realEstate.getCreatedBy());

        realEstateStatusHistory.setRealEstateId(realEstate.getId());
        realEstateStatusHistory.setRealEstateCode(realEstate.getCode());

        realEstateStatusHistory.setBankCode((realEstate.getBank() != null) ? realEstate.getBank().getCode() : null);
        realEstateStatusHistory.setBankName((realEstate.getBank() != null) ? realEstate.getBank().getName() : null);

        realEstateStatusHistory.setTitle(realEstate.getTitle());

        realEstateStatusHistory.setRealEstateTypeCode((realEstate.getRealEstateType() != null) ? realEstate.getRealEstateType().getCode() : null);
        realEstateStatusHistory.setRealEstateTypeName((realEstate.getRealEstateType() != null) ? realEstate.getRealEstateType().getName() : null);


        realEstateStatusHistory.setCityCode((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getCity() != null) ? realEstate.getRealEstateAddress().getCity().getCode() : null);
        realEstateStatusHistory.setCityName((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getCity() != null) ? realEstate.getRealEstateAddress().getCity().getName() : null);

        realEstateStatusHistory.setDistrictCode((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getDistrict() != null) ? realEstate.getRealEstateAddress().getDistrict().getCode() : null);
        realEstateStatusHistory.setDistrictName((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getDistrict() != null) ? realEstate.getRealEstateAddress().getDistrict().getName() : null);


        realEstateStatusHistory.setRealEstateStatusCodeNew(realEstate.getRealEstateStatus() != null ? realEstate.getRealEstateStatus().getCode() : null);
        realEstateStatusHistory.setRealEstateStatusCodeOld(realEstate.getOldRealEstateStatusCode());

        realEstateStatusHistory.setCreatedDate(realEstate.getCreatedDate());

        this.perform(realEstateStatusHistory);
    }

    @PostUpdate
    void onPostUpdate(RealEstate realEstate) {

        String oldStatusCode = realEstate.getOldRealEstateStatusCode();
        String newStatusCode = realEstate.getRealEstateStatus() != null ? realEstate.getRealEstateStatus().getCode() : null;

        if (!Objects.equals(oldStatusCode, newStatusCode)) {
            RealEstateStatusHistory realEstateStatusHistory = new RealEstateStatusHistory();
            realEstateStatusHistory.setUserId(realEstate.getLastModifiedBy());

            realEstateStatusHistory.setRealEstateId(realEstate.getId());
            realEstateStatusHistory.setRealEstateCode(realEstate.getCode());

            realEstateStatusHistory.setBankCode((realEstate.getBank() != null) ? realEstate.getBank().getCode() : null);
            realEstateStatusHistory.setBankName((realEstate.getBank() != null) ? realEstate.getBank().getName() : null);

            realEstateStatusHistory.setTitle(realEstate.getTitle());

            realEstateStatusHistory.setRealEstateTypeCode((realEstate.getRealEstateType() != null) ? realEstate.getRealEstateType().getCode() : null);
            realEstateStatusHistory.setRealEstateTypeName((realEstate.getRealEstateType() != null) ? realEstate.getRealEstateType().getName() : null);


            realEstateStatusHistory.setCityCode((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getCity() != null) ? realEstate.getRealEstateAddress().getCity().getCode() : null);
            realEstateStatusHistory.setCityName((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getCity() != null) ? realEstate.getRealEstateAddress().getCity().getName() : null);

            realEstateStatusHistory.setDistrictCode((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getDistrict() != null) ? realEstate.getRealEstateAddress().getDistrict().getCode() : null);
            realEstateStatusHistory.setDistrictName((realEstate.getRealEstateAddress() != null && realEstate.getRealEstateAddress().getDistrict() != null) ? realEstate.getRealEstateAddress().getDistrict().getName() : null);


            realEstateStatusHistory.setRealEstateStatusCodeNew(realEstate.getRealEstateStatus() != null ? realEstate.getRealEstateStatus().getCode() : null);
            realEstateStatusHistory.setRealEstateStatusCodeOld(realEstate.getOldRealEstateStatusCode());

            realEstateStatusHistory.setCreatedDate(realEstate.getLastModifiedDate());

            this.perform(realEstateStatusHistory);
        }
    }

    @Transactional(MANDATORY)
    private void perform(RealEstateStatusHistory realEstateStatusHistory) {
        EntityManager entityManager = BeanUtil.getBean(EntityManager.class);
        entityManager.persist(realEstateStatusHistory);
    }
}
