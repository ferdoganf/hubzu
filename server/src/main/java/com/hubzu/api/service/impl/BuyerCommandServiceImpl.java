package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.buyer.BuyersCodeListDTO;
import com.hubzu.api.dto.request.realestate.RealestatesCodeListDTO;
import com.hubzu.api.dto.request.user.CreateBuyerDTO;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.model.buyer.BuyerAutoBid;
import com.hubzu.api.model.buyer.BuyerWarrant;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.user.UserFavourite;
import com.hubzu.api.repository.buyer.BuyerAutoBidRepository;
import com.hubzu.api.repository.buyer.BuyerWarrantRepository;
import com.hubzu.api.repository.user.BuyerRepository;
import com.hubzu.api.repository.user.UserFavouriteRepository;
import com.hubzu.api.service.*;
import com.hubzu.api.util.BusinessConstants;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BuyerCommandServiceImpl implements BuyerCommandService {


    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private BuyerQueryService buyerQueryService;

    @Autowired
    private UserQueryService userQueryService;

    @Autowired
    private BuyerWarrantRepository buyerWarrantRepository;

    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MailCommandAsyncService mailCommandAsyncService;

    @Autowired
    private BuyerAutoBidRepository buyerAutoBidRepository;

    @Autowired
    private UserFavouriteRepository userFavouriteRepository;

    @Override
    public String createBuyer(CreateBuyerDTO createBuyerDTO) {

        this.buyerQueryService.checkBuyerExists(createBuyerDTO.getIdentityNumber(), createBuyerDTO.getEmailAddress());

        Buyer buyer = new Buyer();
        buyer.setCode(UUID.randomUUID().toString());
        buyer.setIdentityNumber(createBuyerDTO.getIdentityNumber());
        buyer.setEmailAddress(createBuyerDTO.getEmailAddress());
        buyer.setName(createBuyerDTO.getName());
        buyer.setSurname(createBuyerDTO.getSurname());
        buyer.setPhone(createBuyerDTO.getPhone());
        buyer.setPhoneCountryCode(createBuyerDTO.getPhoneCountryCode());

        String password = RandomStringUtils.random(6, false, true);

        buyer.setPassword(this.bCryptPasswordEncoder.encode(password));
        buyer.setFirstPassword(password);
        buyer.setUserStatus(this.userQueryService.checkAndGetUserStatus(BusinessConstants.UserStatus.PENDING.name()));
        buyer.setUserType(this.userQueryService.checkAndGetUserType(BusinessConstants.UserType.BUYER.name()));
        buyer = this.buyerRepository.save(buyer);

        return buyer.getCode();
    }

    @Override
    public String updateBuyer(String code, CreateBuyerDTO createBuyerDTO) {
        Buyer buyer = this.buyerQueryService.checkAndGetBuyer(code);

        if (!buyer.getIdentityNumber().equalsIgnoreCase(createBuyerDTO.getIdentityNumber())) {
            this.buyerQueryService.checkBuyerExistsByIdentityNumber(createBuyerDTO.getIdentityNumber());
        }

        if (!buyer.getEmailAddress().equalsIgnoreCase(createBuyerDTO.getEmailAddress())) {
            this.buyerQueryService.checkBuyerExistsByEmailAddress(createBuyerDTO.getEmailAddress());
        }

        buyer.setIdentityNumber(createBuyerDTO.getIdentityNumber());
        buyer.setEmailAddress(createBuyerDTO.getEmailAddress());
        buyer.setName(createBuyerDTO.getName());
        buyer.setSurname(createBuyerDTO.getSurname());
        buyer.setPhone(createBuyerDTO.getPhone());
        buyer.setPhoneCountryCode(createBuyerDTO.getPhoneCountryCode());

        return this.buyerRepository.save(buyer).getCode();
    }


    @Override
    public void updateBuyersWarrantForRealEstate(String realEstateCode, BuyersCodeListDTO buyersCodeListDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        List<BuyerWarrant> buyerWarrants = this.buyerWarrantRepository.findAllByRealEstateCode(realEstateCode);

        List<String> buyersWillAdd = buyersCodeListDTO.getBuyers();

        //Buyers will remove
        List<String> buyersWillRemove = buyerWarrants.stream().map(e -> e.getBuyer().getCode()).collect(Collectors.toList());
        if (buyersWillAdd != null && !buyersWillAdd.isEmpty()) {
            buyersWillRemove.removeAll(buyersWillAdd);
        }

        // Buyers will added
        if (buyersWillAdd != null && !buyersWillAdd.isEmpty()) {
            buyersWillAdd.removeAll(buyerWarrants.stream().map(e -> e.getBuyer().getCode()).collect(Collectors.toList()));
        }


        if (!buyersWillRemove.isEmpty()) {
            for (String buyerCode : buyersWillRemove) {
                BuyerWarrant buyerWarrant = this.buyerWarrantRepository.findOneByBuyerCodeAndRealEstateCode(buyerCode, realEstateCode);
                if (buyerWarrant != null) {
                    buyerWarrant.delete();
                    this.buyerWarrantRepository.save(buyerWarrant);
                }
            }
        }

        if (buyersWillAdd != null && !buyersWillAdd.isEmpty()) {
            for (String buyerCode : buyersWillAdd) {
                Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerCode);
                BuyerWarrant buyerWarrant = new BuyerWarrant();
                buyerWarrant.setRealEstate(realEstate);
                buyerWarrant.setBuyer(buyer);
                this.buyerWarrantRepository.save(buyerWarrant);
                this.mailCommandAsyncService.sendMailToWarrantedBuyer(buyer.getCode(), realEstate.getCode());
            }
        }
    }

    @Override
    public void updateRealEstateWarrantsOfBuyer(String buyerCode, RealestatesCodeListDTO realestatesCodeListDTO) {
        Buyer buyer = this.buyerQueryService.checkAndGetBuyer(buyerCode);
        List<BuyerWarrant> buyerWarrants = this.buyerWarrantRepository.findAllByBuyerCode(buyerCode);

        List<String> realEstatesWillAdd = realestatesCodeListDTO.getRealestates();

        //Buyers will remove
        List<String> realEstatesWillRemove = buyerWarrants.stream().map(e -> e.getRealEstate().getCode()).collect(Collectors.toList());
        if (realEstatesWillAdd != null && !realEstatesWillAdd.isEmpty()) {
            realEstatesWillRemove.removeAll(realEstatesWillAdd);
        }

        // Buyers will added
        if (realEstatesWillAdd != null && !realEstatesWillAdd.isEmpty()) {
            realEstatesWillAdd.removeAll(buyerWarrants.stream().map(e -> e.getRealEstate().getCode()).collect(Collectors.toList()));
        }


        if (!realEstatesWillRemove.isEmpty()) {
            for (String realEstateCode : realEstatesWillRemove) {
                BuyerWarrant buyerWarrant = this.buyerWarrantRepository.findOneByBuyerCodeAndRealEstateCode(buyerCode, realEstateCode);
                if (buyerWarrant != null) {
                    buyerWarrant.delete();
                    this.buyerWarrantRepository.save(buyerWarrant);
                }
            }
        }

        if (realEstatesWillAdd != null && !realEstatesWillAdd.isEmpty()) {
            for (String realEstateCode : realEstatesWillAdd) {
                RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
                BuyerWarrant buyerWarrant = new BuyerWarrant();
                buyerWarrant.setRealEstate(realEstate);
                buyerWarrant.setBuyer(buyer);
                this.buyerWarrantRepository.save(buyerWarrant);
                this.mailCommandAsyncService.sendMailToWarrantedBuyer(buyer.getCode(), realEstate.getCode());
            }
        }
    }

    @Override
    public void deleteBuyer(String code) {
        Buyer buyer = this.buyerQueryService.checkAndGetBuyer(code);

        List<BuyerWarrant> buyerWarrants = this.buyerWarrantRepository.findAllByBuyerCode(code);
        for (int i = 0; i < buyerWarrants.size(); i++) {
            buyerWarrants.get(i).delete();
        }
        this.buyerWarrantRepository.saveAll(buyerWarrants);


        List<BuyerAutoBid> buyerAutoBids = this.buyerAutoBidRepository.findAllByBuyerCode(code);
        for (int i = 0; i < buyerAutoBids.size(); i++) {
            buyerAutoBids.get(i).delete();
        }
        this.buyerAutoBidRepository.saveAll(buyerAutoBids);


        List<UserFavourite> userFavourites = this.userFavouriteRepository.findAllByUserCode(code);
        for (int i = 0; i < userFavourites.size(); i++) {
            userFavourites.get(i).delete();
        }
        this.userFavouriteRepository.saveAll(userFavourites);


        buyer.delete();
        this.buyerRepository.save(buyer);
    }


}
