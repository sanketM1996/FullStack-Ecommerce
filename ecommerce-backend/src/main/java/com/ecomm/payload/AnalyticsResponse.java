package com.ecomm.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private String productCount;
    private String totalRevenue;
    private String userCount;
    private String totalOrders;
}
