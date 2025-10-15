package com.ecomm.service;


import com.ecomm.payload.StripePaymentDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface StripeService {

    PaymentIntent paymentIntent(StripePaymentDto stripePaymentDto) throws StripeException;
}
