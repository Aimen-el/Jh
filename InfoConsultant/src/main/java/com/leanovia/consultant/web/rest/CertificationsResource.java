package com.leanovia.consultant.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.leanovia.consultant.domain.Certifications;
import com.leanovia.consultant.repository.CertificationsRepository;
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
 * REST controller for managing Certifications.
 */
@RestController
@RequestMapping("/api")
public class CertificationsResource {

    private final Logger log = LoggerFactory.getLogger(CertificationsResource.class);

    private static final String ENTITY_NAME = "certifications";

    private final CertificationsRepository certificationsRepository;

    public CertificationsResource(CertificationsRepository certificationsRepository) {
        this.certificationsRepository = certificationsRepository;
    }

    /**
     * POST  /certifications : Create a new certifications.
     *
     * @param certifications the certifications to create
     * @return the ResponseEntity with status 201 (Created) and with body the new certifications, or with status 400 (Bad Request) if the certifications has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/certifications")
    @Timed
    public ResponseEntity<Certifications> createCertifications(@RequestBody Certifications certifications) throws URISyntaxException {
        log.debug("REST request to save Certifications : {}", certifications);
        if (certifications.getId() != null) {
            throw new BadRequestAlertException("A new certifications cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Certifications result = certificationsRepository.save(certifications);
        return ResponseEntity.created(new URI("/api/certifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /certifications : Updates an existing certifications.
     *
     * @param certifications the certifications to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated certifications,
     * or with status 400 (Bad Request) if the certifications is not valid,
     * or with status 500 (Internal Server Error) if the certifications couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/certifications")
    @Timed
    public ResponseEntity<Certifications> updateCertifications(@RequestBody Certifications certifications) throws URISyntaxException {
        log.debug("REST request to update Certifications : {}", certifications);
        if (certifications.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Certifications result = certificationsRepository.save(certifications);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, certifications.getId().toString()))
            .body(result);
    }

    /**
     * GET  /certifications : get all the certifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of certifications in body
     */
    @GetMapping("/certifications")
    @Timed
    public List<Certifications> getAllCertifications() {
        log.debug("REST request to get all Certifications");
        return certificationsRepository.findAll();
    }

    /**
     * GET  /certifications/:id : get the "id" certifications.
     *
     * @param id the id of the certifications to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the certifications, or with status 404 (Not Found)
     */
    @GetMapping("/certifications/{id}")
    @Timed
    public ResponseEntity<Certifications> getCertifications(@PathVariable Long id) {
        log.debug("REST request to get Certifications : {}", id);
        Optional<Certifications> certifications = certificationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(certifications);
    }

    /**
     * DELETE  /certifications/:id : delete the "id" certifications.
     *
     * @param id the id of the certifications to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/certifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteCertifications(@PathVariable Long id) {
        log.debug("REST request to delete Certifications : {}", id);
        certificationsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
