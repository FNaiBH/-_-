package com.njunetwork.caloriecal.controller;

import com.njunetwork.caloriecal.service.FoodService;
import com.njunetwork.caloriecal.vo.FoodVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @GetMapping(path = "/getFoodByName")
    public List<FoodVO> getFoodByName(@RequestParam String name){
        return foodService.findFootByName(name);
    }
}
