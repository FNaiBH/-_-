package com.njunetwork.caloriecal;

import com.njunetwork.caloriecal.controller.FoodController;
import com.njunetwork.caloriecal.vo.FoodVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
@SpringBootTest
@RunWith(SpringRunner.class)
public class test {
    @Autowired
    private FoodController foodController;
    @Test
    public void test01(){
        List<FoodVO> 苹果 = foodController.getFoodByName("苹果");
        for(FoodVO f:苹果){
            System.out.println(f.getCalorie());
            System.out.println(f.getName());
        }
    }
}
