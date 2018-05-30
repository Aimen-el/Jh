package com.leanovia.consultant.repository;

import com.leanovia.consultant.domain.Consultant;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Consultant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Long> {

}
