package com.hubzu.api.controller;

import com.hubzu.api.controller.response.ResponseOfList;
import com.hubzu.api.dto.address.CityDTO;
import com.hubzu.api.dto.address.DistrictDTO;
import com.hubzu.api.dto.address.NeighborhoodDTO;
import com.hubzu.api.service.AddressQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/address")
public class AddressController {

    @Autowired
    private AddressQueryService addressQueryService;

    @GetMapping("/cities")
    public ResponseOfList<CityDTO> getCities() {
        return new ResponseOfList<>(this.addressQueryService.getAllCities());
    }

    @GetMapping("/cities/{cityCode}/districts")
    public ResponseOfList<DistrictDTO> getDistrictsOfCity(@PathVariable("cityCode") String cityCode) {
        return new ResponseOfList<>(this.addressQueryService.getDistrictsOfCity(cityCode));
    }

    @GetMapping("/cities/{cityCode}/districts/{districtCode}/neighborhoods")
    public ResponseOfList<NeighborhoodDTO> getNeighborhoodsOfDistrictsOfCity(@PathVariable("cityCode") String cityCode, @PathVariable("districtCode") String districtCode) {
        return new ResponseOfList<>(this.addressQueryService.getNeighborhoodsOfDistrictsOfCity(cityCode, districtCode));
    }

}
