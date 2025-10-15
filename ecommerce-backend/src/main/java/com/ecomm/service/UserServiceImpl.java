package com.ecomm.service;

import com.ecomm.exception.ResourceNotFoundException;
import com.ecomm.model.User;
import com.ecomm.payload.UserDTO;
import com.ecomm.payload.UserResponse;
import com.ecomm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // ✅ Injected

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setUsername(user.getUserName());
        dto.setEmail(user.getEmail());
        // Never expose encoded password in DTO if this is returned to clients.
        dto.setPassword(user.getPassword());
        dto.setRoles(user.getRoles());
        return dto;
    }

    private User mapToEntity(UserDTO dto) {
        User user = new User();
        user.setUserId(dto.getUserId());
        user.setUserName(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // Will be encoded later
        user.setRoles(dto.getRoles());
        return user;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = mapToEntity(userDTO);

        // ✅ Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return mapToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return mapToDTO(user);
    }

    @Override
    public UserResponse getAllUsers(Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);
        UserResponse response = new UserResponse();
        response.setContent(page.getContent().stream().map(this::mapToDTO).collect(Collectors.toList()));
        response.setPageNumber(page.getNumber());
        response.setPageSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setLastPage(page.isLast());
        return response;
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        existing.setUserName(userDTO.getUsername());
        existing.setEmail(userDTO.getEmail());

        // ✅ Encode only if a new password is provided
        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        existing.setRoles(userDTO.getRoles());

        return mapToDTO(userRepository.save(existing));
    }

    @Override
    public void deleteUser(Long id) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(existing);
    }
}
