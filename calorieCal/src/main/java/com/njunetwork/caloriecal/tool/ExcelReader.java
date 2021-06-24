package com.njunetwork.caloriecal.tool;

import com.njunetwork.caloriecal.po.Food;
import com.njunetwork.caloriecal.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
@Component
public class ExcelReader {//数据文件已经导出成txt，懒得改类名了
    //已经在用此tool导入数据 无需再使用
    @Autowired
    private FoodRepository foodRepository;
    public void dataToDB(String path){
        File file = new File(path);
        BufferedReader bufferedReader = null;
        String line;
        try{
            bufferedReader = new BufferedReader(new FileReader(file));
            while ((line = bufferedReader.readLine())!=null){
                String[] food = line.split("\\s+");
                Food f = new Food();
                f.setName(food[0]);
                f.setCalorie(Integer.parseInt(food[1]));
                foodRepository.save(f);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
