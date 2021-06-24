package com.njunetwork.caloriecal.service;

import com.njunetwork.caloriecal.po.Food;
import com.njunetwork.caloriecal.vo.FoodVO;

import java.util.List;

public interface FoodService {
    List<FoodVO> findFootByName(String name);
}
