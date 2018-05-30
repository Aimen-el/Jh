package com.leanovia.consultant.repository;

import com.leanovia.consultant.domain.Missions;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Missions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MissionsRepository extends JpaRepository<Missions, Long> {

}
