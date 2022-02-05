package com.hubzu.api.util;

import org.modelmapper.ModelMapper;

public class ModelMapperUtil {

    private static final ModelMapperUtil instance = new ModelMapperUtil();

    private final ModelMapper mapper;

    private ModelMapperUtil() {
        this.mapper = new ModelMapper();
        this.mapper.getConfiguration().setAmbiguityIgnored(true);
    }

    public static ModelMapperUtil getInstance() {
        return instance;
    }

    public ModelMapper getMapper() {
        return this.mapper;
    }

}
