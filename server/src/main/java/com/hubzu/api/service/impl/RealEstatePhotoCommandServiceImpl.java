package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.realestate.UploadPhotoDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.realestate.RealEstatePhoto;
import com.hubzu.api.repository.realestate.RealEstatePhotoRepository;
import com.hubzu.api.service.RealEstateCommandService;
import com.hubzu.api.service.RealEstatePhotoCommandService;
import com.hubzu.api.service.RealEstateQueryService;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@Transactional
public class RealEstatePhotoCommandServiceImpl implements RealEstatePhotoCommandService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RealEstatePhotoCommandServiceImpl.class);


    private static final String DELIMITER = "/";

    @Value("${hubzu.image.root.folder}")
    private String imageRootFolder;
    @Autowired
    private RealEstateQueryService realEstateQueryService;

    @Autowired
    private RealEstateCommandService realEstateCommandService;

    @Autowired
    private RealEstatePhotoRepository realEstatePhotoRepository;

    @Override
    public void uploadRealEstatePhoto(String realEstateCode, UploadPhotoDTO uploadPhotoDTO) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.realEstateCommandService.checkRealEstateForUpdate(realEstate);

        if (StringUtils.isEmpty(uploadPhotoDTO.getFileName())) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_FILE_NAME_IS_NULL);
        }

        String fileExtension = FilenameUtils.getExtension(uploadPhotoDTO.getFileName());
        if (StringUtils.isEmpty(fileExtension)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_FILE_NAME_IS_NOT_VALID);
        }

        BusinessConstants.RealEstateImageType realEstateImageType = BusinessConstants.RealEstateImageType.of(fileExtension);
        if (realEstateImageType == null) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_FILE_TYPE_IS_NOT_VALID);
        }

        UUID uuid = UUID.randomUUID();
        String uuidStr = uuid.toString();
        String path = DELIMITER + uuidStr.replace("-", DELIMITER);
        String filePath = this.imageRootFolder + path + DELIMITER + uploadPhotoDTO.getFileName();
        long size;

        try {
            Path pathToFile = Paths.get(filePath);
            Files.createDirectories(pathToFile.getParent());
            String base64Image = uploadPhotoDTO.getFile().split(",")[1];
            Files.write(pathToFile, Base64.getMimeDecoder().decode(base64Image));
            size = Files.size(pathToFile);


        } catch (Exception e) {
            LOGGER.error("uploadRealEstatePhoto error", e);
            throw new HubzuBusinessException(ErrorCodes.ERROR_FILE_CANNOT_BE_WRITE);
        }

        RealEstatePhoto realEstatePhoto = new RealEstatePhoto();
        realEstatePhoto.setCode(uuidStr);
        realEstatePhoto.setFileName(uploadPhotoDTO.getFileName());
        realEstatePhoto.setMimeType(realEstateImageType.getMimeType());
        realEstatePhoto.setPath(path);
        realEstatePhoto.setSize(size);
        realEstatePhoto.setRealEstate(realEstate);
        this.realEstatePhotoRepository.save(realEstatePhoto);
    }

    @Override
    public void deleteRealEstatePhoto(String realEstateCode, String photoCode) {
        RealEstate realEstate = this.realEstateQueryService.checkAndGetRealEstate(realEstateCode);
        this.realEstateCommandService.checkRealEstateForUpdate(realEstate);
        RealEstatePhoto realEstatePhoto = this.realEstatePhotoRepository.findOneByRealEstateAndCode(realEstate, photoCode);
        if (realEstatePhoto == null) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_PHOTO_NOT_FOUND);
        }
        String filePath = this.imageRootFolder + realEstatePhoto.getPath() + DELIMITER + realEstatePhoto.getFileName();

        realEstatePhoto.delete();
        this.realEstatePhotoRepository.save(realEstatePhoto);
        try {
            Path pathToFile = Paths.get(filePath);
            Files.delete(pathToFile);
        } catch (IOException e) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_FILE_CANNOT_BE_DELETED);
        }


    }
}
