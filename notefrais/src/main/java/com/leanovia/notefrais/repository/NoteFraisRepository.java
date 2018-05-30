package com.leanovia.notefrais.repository;

import com.leanovia.notefrais.domain.NoteFrais;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the NoteFrais entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteFraisRepository extends JpaRepository<NoteFrais, Long> {

}
