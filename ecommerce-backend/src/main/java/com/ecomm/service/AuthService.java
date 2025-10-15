package com.ecomm.service;

import com.ecomm.payload.AuthenticationResult;
import com.ecomm.payload.UserResponse;
import com.ecomm.security.request.LoginRequest;
import com.ecomm.security.request.SignupRequest;
import com.ecomm.security.response.MessageResponse;
import com.ecomm.security.response.UserInfoResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface AuthService {

    AuthenticationResult login(LoginRequest loginRequest);

    ResponseEntity<MessageResponse> register(SignupRequest signUpRequest);

    UserInfoResponse getCurrentUserDetails(Authentication authentication);

    ResponseCookie logoutUser();

    UserResponse getAllSellers(Pageable pageable);
}
