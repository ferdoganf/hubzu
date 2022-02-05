package com.hubzu.api.service;

import com.hubzu.api.dto.request.realestate.UploadPhotoDTO;

public interface RealEstatePhotoCommandService {
    void uploadRealEstatePhoto(String realEstateCode, UploadPhotoDTO uploadPhotoDTO);

    void deleteRealEstatePhoto(String realEstateCode, String photoCode);
}
