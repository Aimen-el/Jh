package com.leanovia.consultant.repository;

import com.leanovia.consultant.domain.Certifications;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Certifications entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CertificationsRepository extends JpaRepository<Certifications, Long> {

}
