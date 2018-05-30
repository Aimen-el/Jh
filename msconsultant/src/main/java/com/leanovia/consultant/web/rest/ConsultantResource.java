package com.leanovia.consultant.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.leanovia.consultant.domain.Consultant;
import com.leanovia.consultant.repository.ConsultantRepository;
import com.leanovia.consultant.web.rest.errors.BadRequestAlertException;
import com.leanovia.consultant.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Consultant.
 */
@RestController
@RequestMapping("/api")
public class ConsultantResource {

    private final Logger log = LoggerFactory.getLogger(ConsultantResource.class);

    private static final String ENTITY_NAME = "consultant";

    private final ConsultantRepository consultantRepository;

    public ConsultantResource(ConsultantRepository consultantRepository) {
        this.consultantRepository = consultantRepository;
    }

    /**
     * POST  /consultants : Create a new consultant.
     *
     * @param consultant the consultant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consultant, or with status 400 (Bad Request) if the consultant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consultants")
    @Timed
    public ResponseEntity<Consultant> createConsultant(@RequestBody Consultant consultant) throws URISyntaxException {
        log.debug("REST request to save Consultant : {}", consultant);
        if (consultant.getId() != null) {
            throw new BadRequestAlertException("A new consultant cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Consultant result = consultantRepository.save(consultant);
        return ResponseEntity.created(new URI("/api/consultants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consultants : Updates an existing consultant.
     *
     * @param consultant the consultant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consultant,
     * or with status 400 (Bad Request) if the consultant is not valid,
     * or with status 500 (Internal Server Error) if the consultant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consultants")
    @Timed
    public ResponseEntity<Consultant> updateConsultant(@RequestBody Consultant consultant) throws URISyntaxException {
        log.debug("REST request to update Consultant : {}", consultant);
        if (consultant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Consultant result = consultantRepository.save(consultant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consultant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consultants : get all the consultants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of consultants in body
     */
    @GetMapping("/consultants")
    @Timed
    public List<Consultant> getAllConsultants() {
        log.debug("REST request to get all Consultants");
        return consultantRepository.findAll();
    }

    /**
     * GET  /consultants/:id : get the "id" consultant.
     *
     * @param id the id of the consultant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consultant, or with status 404 (Not Found)
     */
    @GetMapping("/consultants/{id}")
    @Timed
    public ResponseEntity<Consultant> getConsultant(@PathVariable Long id) {
        log.debug("REST request to get Consultant : {}", id);
        Optional<Consultant> consultant = consultantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consultant);
    }

    /**
     * DELETE  /consultants/:id : delete the "id" consultant.
     *
     * @param id the id of the consultant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consultants/{id}")
    @Timed
    public ResponseEntity<Void> deleteConsultant(@PathVariable Long id) {
        log.debug("REST request to delete Consultant : {}", id);
        consultantRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
