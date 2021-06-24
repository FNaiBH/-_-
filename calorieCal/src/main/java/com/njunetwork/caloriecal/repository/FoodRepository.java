package com.njunetwork.caloriecal.repository;

import com.njunetwork.caloriecal.po.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food, String> {
    List<Food> findFoodByNameContaining(String name);
}
