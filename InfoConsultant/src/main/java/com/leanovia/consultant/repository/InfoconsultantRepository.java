package com.leanovia.consultant.repository;

import com.leanovia.consultant.domain.Infoconsultant;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Infoconsultant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfoconsultantRepository extends JpaRepository<Infoconsultant, Long> {

}
