package com.example.demo.Repositories;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{
    Set<Admin> findByName(String name);

    boolean existsByCitizenIdentification(String citizenIdentification);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<Admin> findByPhoneNumber(String phoneNumber);

    Optional<Admin> findByEmail(String email);

    Optional<Admin> findByCitizenIdentification(String citizenIdentification);

    Optional<Admin> findByUserId(Long id);

}
