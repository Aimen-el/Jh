package com.leanovia.library.repository;

import com.leanovia.library.domain.Emprunt;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Emprunt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {

}
