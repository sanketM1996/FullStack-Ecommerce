package com.ecomm.initializer;

import com.ecomm.model.Category;
import com.ecomm.model.Product;
import com.ecomm.model.User;
import com.ecomm.repository.CategoryRepository;
import com.ecomm.repository.ProductRepository;
import com.ecomm.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository,
                                   CategoryRepository categoryRepository,
                                   ProductRepository productRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {
            // ✅ Insert Seller
            User seller1 = userRepository.findByUserName("seller1")
                    .orElseGet(() -> {
                        User u = new User("seller1", "seller1@example.com", passwordEncoder.encode("password2"));
                        return userRepository.save(u);
                    });

            // ✅ Insert Multiple Categories
            List<String> categoryNames = Arrays.asList(
                    "Electronics",
                    "Fitness Equipment",
                    "Home Appliances",
                    "Books",
                    "Clothing",
                    "Beauty & Personal Care"
            );

            for (String name : categoryNames) {
                if (!categoryRepository.existsByCategoryName(name)) {
                    Category category = new Category();
                    category.setCategoryName(name);
                    categoryRepository.save(category);
                }
            }

            // ✅ Fetch categories
            Category electronics = categoryRepository.findByCategoryName("Electronics");
            Category fitness = categoryRepository.findByCategoryName("Fitness Equipment");
            Category homeAppliances = categoryRepository.findByCategoryName("Home Appliances");
            Category books = categoryRepository.findByCategoryName("Books");
            Category clothing = categoryRepository.findByCategoryName("Clothing");
            Category beauty = categoryRepository.findByCategoryName("Beauty & Personal Care");

            // ✅ Add Products for seller1 if DB is empty
            if (productRepository.count() == 0) {
                List<Product> products = Arrays.asList(
                        // Electronics
                        new Product(null, "iPhone 15", "iphone.jpg",
                                "Latest Apple iPhone 15 with A17 chip", 10, 79999, 10, 71999,
                                electronics, seller1, new ArrayList<>()),

                        new Product(null, "Samsung Smart TV", "tv.jpg",
                                "55-inch 4K UHD Smart LED TV", 7, 55000, 12, 48400,
                                electronics, seller1, new ArrayList<>()),

                        // Fitness Equipment
                        new Product(null, "Treadmill", "treadmill.jpg",
                                "High quality treadmill for home use", 5, 45000, 15, 38250,
                                fitness, seller1, new ArrayList<>()),

                        new Product(null, "Dumbbell Set", "dumbbells.jpg",
                                "Adjustable dumbbell set 20kg", 15, 3500, 5, 3325,
                                fitness, seller1, new ArrayList<>()),

                        // Home Appliances
                        new Product(null, "Microwave Oven", "microwave.jpg",
                                "800W convection microwave oven", 8, 12000, 10, 10800,
                                homeAppliances, seller1, new ArrayList<>()),

                        new Product(null, "Refrigerator", "fridge.jpg",
                                "Double door frost-free refrigerator", 6, 30000, 8, 27600,
                                homeAppliances, seller1, new ArrayList<>()),

                        // Books
                        new Product(null, "Java Basics", "java-book.jpg",
                                "Comprehensive guide to Java programming", 20, 999, 5, 949,
                                books, seller1, new ArrayList<>()),

                        new Product(null, "Spring Boot in Action", "springboot-book.jpg",
                                "Advanced Spring Boot guide for developers", 15, 1299, 10, 1169,
                                books, seller1, new ArrayList<>()),

                        // Clothing
                        new Product(null, "Men's T-Shirt", "tshirt.jpg",
                                "100% cotton round neck t-shirt", 50, 799, 10, 719,
                                clothing, seller1, new ArrayList<>()),

                        new Product(null, "Women's Jeans", "jeans.jpg",
                                "Slim fit denim jeans", 40, 1499, 12, 1319,
                                clothing, seller1, new ArrayList<>()),

                        // Beauty & Personal Care
                        new Product(null, "Face Cream", "cream.jpg",
                                "Moisturizing face cream 50ml", 30, 499, 5, 474,
                                beauty, seller1, new ArrayList<>()),

                        new Product(null, "Shampoo", "shampoo.jpg",
                                "Herbal anti-hairfall shampoo 200ml", 25, 299, 8, 275,
                                beauty, seller1, new ArrayList<>())
                );

                productRepository.saveAll(products);
            }
        };
    }
}
