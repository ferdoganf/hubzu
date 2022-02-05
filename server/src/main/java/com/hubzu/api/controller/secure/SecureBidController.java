package com.hubzu.api.controller.secure;

import com.hubzu.api.config.HubzuUserDetails;
import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.dto.bid.AutoBidDTO;
import com.hubzu.api.dto.bid.BidDTO;
import com.hubzu.api.dto.bid.RealEstateBidDTO;
import com.hubzu.api.dto.request.bid.CreateAutoBidDTO;
import com.hubzu.api.dto.request.bid.CreateBidDTO;
import com.hubzu.api.dto.request.bid.CreateDirectBidDTO;
import com.hubzu.api.service.BidCommandService;
import com.hubzu.api.service.BidQueryService;
import com.hubzu.api.service.DirectBidCommandService;
import com.hubzu.api.service.DirectBidQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rest/secure/bids")
public class SecureBidController {

    @Autowired
    private BidCommandService bidCommandService;

    @Autowired
    private BidQueryService bidQueryService;

    @Autowired
    private DirectBidCommandService directBidCommandService;

    @Autowired
    private DirectBidQueryService directBidQueryService;


    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('BUYER')")
    public void createBid(Authentication authentication, @RequestBody @Valid CreateBidDTO createBidDTO) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.bidCommandService.createBid(buyerId, createBidDTO);
    }

    @PreAuthorize("hasAnyAuthority('BUYER')")
    @GetMapping("")
    public ResponseOfList<BidDTO> getBids(Authentication authentication) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        return new ResponseOfList(this.bidQueryService.getBids(buyerId));
    }

    @GetMapping("/realestates/{realEstateCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfList<RealEstateBidDTO> getBidsOfRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfList(this.bidQueryService.getBidsOfRealEstate(realEstateCode));
    }


    @PostMapping("/auto")
    @PreAuthorize("hasAnyAuthority('BUYER')")
    public void createAutoBid(Authentication authentication, @RequestBody @Valid CreateAutoBidDTO createAutoBidDTO) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.bidCommandService.createAutoBid(buyerId, createAutoBidDTO);
    }

    @PreAuthorize("hasAnyAuthority('BUYER')")
    @GetMapping("/auto")
    public ResponseOfList<AutoBidDTO> getAutoBids(Authentication authentication) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        return new ResponseOfList(this.bidQueryService.getAutoBids(buyerId));
    }


    @PutMapping("/auto")
    @PreAuthorize("hasAnyAuthority('BUYER')")
    public void updateAutoBid(Authentication authentication, @RequestBody @Valid CreateAutoBidDTO createAutoBidDTO) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.bidCommandService.updateAutoBid(buyerId, createAutoBidDTO);
    }


    @PreAuthorize("hasAnyAuthority('BUYER')")
    @DeleteMapping("/auto/{realEstateCode}")
    public void removeAutoBid(Authentication authentication, @PathVariable("realEstateCode") String realEstateCode) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.bidCommandService.deleteAutoBid(userId, realEstateCode);
    }

    @PreAuthorize("hasAnyAuthority('BUYER')")
    @GetMapping("/auto/{realEstateCode}")
    public ResponseOfItem<AutoBidDTO> getAutoBid(Authentication authentication, @PathVariable("realEstateCode") String realEstateCode) {
        Long userId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        return new ResponseOfItem(this.bidQueryService.getAutoBid(userId, realEstateCode));
    }


    @PostMapping("/inadvance")
    @PreAuthorize("hasAnyAuthority('BUYER')")
    public void createInAdvanceBid(Authentication authentication, @RequestBody @Valid CreateBidDTO createBidDTO) {
        Long buyerId = ((HubzuUserDetails) authentication.getPrincipal()).getId();
        this.bidCommandService.createInAdvanceBid(buyerId, createBidDTO);
    }


    @PostMapping("/direct")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void createDirectBid(@RequestBody @Valid CreateDirectBidDTO createDirectBidDTO) {
        this.directBidCommandService.createDirectBid(createDirectBidDTO.getBuyer(), createDirectBidDTO.getBid(), createDirectBidDTO.getDescription());
    }

    @GetMapping("/direct/realestates/{realEstateCode}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseOfList<RealEstateBidDTO> getDirectBidsOfRealEstate(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfList(this.directBidQueryService.getBidsOfRealEstate(realEstateCode));
    }
}
