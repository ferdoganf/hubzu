package com.hubzu.api.controller.secure;

import com.hubzu.api.controller.response.ResponseOfItem;
import com.hubzu.api.dto.stats.RealEstateBidsDTO;
import com.hubzu.api.dto.stats.RealEstateBuyersFavoritesDTO;
import com.hubzu.api.dto.stats.RealEstateBuyersWarrantsDTO;
import com.hubzu.api.dto.stats.RealEstateUserViewsDTO;
import com.hubzu.api.service.StatsQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/secure/stats")
public class SecureStatsController {

    @Autowired
    private StatsQueryService statsQueryService;

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    @GetMapping("/realestate/{realEstateCode}/buyers/warrants")
    public ResponseOfItem<RealEstateBuyersWarrantsDTO> getRealestateBuyersWarrants(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.statsQueryService.getRealestateBuyersWarrants(realEstateCode));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    @GetMapping("/realestate/{realEstateCode}/buyers/favorites")
    public ResponseOfItem<RealEstateBuyersFavoritesDTO> getRealestateBuyersFavorites(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.statsQueryService.getRealestateBuyersFavorites(realEstateCode));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    @GetMapping("/realestate/{realEstateCode}/bids")
    public ResponseOfItem<RealEstateBidsDTO> getRealestateBids(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.statsQueryService.getRealestateBids(realEstateCode));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATION')")
    @GetMapping("/realestate/{realEstateCode}/user/views")
    public ResponseOfItem<RealEstateUserViewsDTO> getRealestateUserViews(@PathVariable("realEstateCode") String realEstateCode) {
        return new ResponseOfItem(this.statsQueryService.getRealestateUserViews(realEstateCode));
    }


}
