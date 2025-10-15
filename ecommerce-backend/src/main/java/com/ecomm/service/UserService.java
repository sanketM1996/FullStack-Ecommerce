package com.ecomm.service;

import com.ecomm.payload.UserDTO;
import com.ecomm.payload.UserResponse;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);
    UserResponse getAllUsers(Pageable pageable);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
}
