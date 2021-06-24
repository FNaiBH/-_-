package com.njunetwork.caloriecal.vo;

import com.njunetwork.caloriecal.po.Food;

public class FoodVO {
    private String name;
    private Integer calorie;

    public FoodVO() {
    }

    public FoodVO(Food food){
        this.name = food.getName();
        this.calorie = food.getCalorie();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCalorie() {
        return calorie;
    }

    public void setCalorie(Integer calorie) {
        this.calorie = calorie;
    }
}
