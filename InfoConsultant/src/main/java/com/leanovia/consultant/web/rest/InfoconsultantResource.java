package com.leanovia.consultant.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.leanovia.consultant.domain.Infoconsultant;
import com.leanovia.consultant.repository.InfoconsultantRepository;
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

import javax.validation.Valid;

/**
 * REST controller for managing Infoconsultant.
 */
@RestController
@RequestMapping("/api")
public class InfoconsultantResource {

    private final Logger log = LoggerFactory.getLogger(InfoconsultantResource.class);

    private static final String ENTITY_NAME = "infoconsultant";

    private final InfoconsultantRepository infoconsultantRepository;

    public InfoconsultantResource(InfoconsultantRepository infoconsultantRepository) {
        this.infoconsultantRepository = infoconsultantRepository;
    }

    /**
     * POST  /infoconsultants : Create a new infoconsultant.
     *
     * @param infoconsultant the infoconsultant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new infoconsultant, or with status 400 (Bad Request) if the infoconsultant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/infoconsultants")
    @Timed
    public ResponseEntity<Infoconsultant> createInfoconsultant(@Valid @RequestBody Infoconsultant infoconsultant) throws URISyntaxException {
        log.debug("REST request to save Infoconsultant : {}", infoconsultant);
        if (infoconsultant.getId() != null) {
            throw new BadRequestAlertException("A new infoconsultant cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Infoconsultant result = infoconsultantRepository.save(infoconsultant);
        return ResponseEntity.created(new URI("/api/infoconsultants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /infoconsultants : Updates an existing infoconsultant.
     *
     * @param infoconsultant the infoconsultant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated infoconsultant,
     * or with status 400 (Bad Request) if the infoconsultant is not valid,
     * or with status 500 (Internal Server Error) if the infoconsultant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/infoconsultants")
    @Timed
    public ResponseEntity<Infoconsultant> updateInfoconsultant(@RequestBody Infoconsultant infoconsultant) throws URISyntaxException {
        log.debug("REST request to update Infoconsultant : {}", infoconsultant);
        if (infoconsultant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Infoconsultant result = infoconsultantRepository.save(infoconsultant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, infoconsultant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /infoconsultants : get all the infoconsultants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of infoconsultants in body
     */
    @GetMapping("/infoconsultants")
    @Timed
    public List<Infoconsultant> getAllInfoconsultants() {
        log.debug("REST request to get all Infoconsultants");
        return infoconsultantRepository.findAll();
    }

    /**
     * GET  /infoconsultants/:id : get the "id" infoconsultant.
     *
     * @param id the id of the infoconsultant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the infoconsultant, or with status 404 (Not Found)
     */
    @GetMapping("/infoconsultants/{id}")
    @Timed
    public ResponseEntity<Infoconsultant> getInfoconsultant(@PathVariable Long id) {
        log.debug("REST request to get Infoconsultant : {}", id);
        Optional<Infoconsultant> infoconsultant = infoconsultantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(infoconsultant);
    }

    /**
     * DELETE  /infoconsultants/:id : delete the "id" infoconsultant.
     *
     * @param id the id of the infoconsultant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/infoconsultants/{id}")
    @Timed
    public ResponseEntity<Void> deleteInfoconsultant(@PathVariable Long id) {
        log.debug("REST request to delete Infoconsultant : {}", id);
        infoconsultantRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
