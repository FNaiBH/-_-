package com.njunetwork.caloriecal.service;

import com.njunetwork.caloriecal.po.Food;
import com.njunetwork.caloriecal.repository.FoodRepository;
import com.njunetwork.caloriecal.vo.FoodVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
@Service
public class FoodServiceImpl implements FoodService{
    @Autowired
    private FoodRepository foodRepository;
    @Override
    public List<FoodVO> findFootByName(String name) {
        List<Food> foods = foodRepository.findFoodByNameContaining(name);
        List<FoodVO> res = new ArrayList<>(foods.size());
        for(Food food:foods){
            res.add(new FoodVO(food));
        }
        return res;
    }
}
