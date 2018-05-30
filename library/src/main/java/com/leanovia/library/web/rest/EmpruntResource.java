package com.leanovia.library.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.leanovia.library.domain.Emprunt;
import com.leanovia.library.repository.EmpruntRepository;
import com.leanovia.library.web.rest.errors.BadRequestAlertException;
import com.leanovia.library.web.rest.util.HeaderUtil;
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
 * REST controller for managing Emprunt.
 */
@RestController
@RequestMapping("/api")
public class EmpruntResource {

    private final Logger log = LoggerFactory.getLogger(EmpruntResource.class);

    private static final String ENTITY_NAME = "emprunt";

    private final EmpruntRepository empruntRepository;

    public EmpruntResource(EmpruntRepository empruntRepository) {
        this.empruntRepository = empruntRepository;
    }

    /**
     * POST  /emprunts : Create a new emprunt.
     *
     * @param emprunt the emprunt to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emprunt, or with status 400 (Bad Request) if the emprunt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/emprunts")
    @Timed
    public ResponseEntity<Emprunt> createEmprunt(@Valid @RequestBody Emprunt emprunt) throws URISyntaxException {
        log.debug("REST request to save Emprunt : {}", emprunt);
        if (emprunt.getId() != null) {
            throw new BadRequestAlertException("A new emprunt cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Emprunt result = empruntRepository.save(emprunt);
        return ResponseEntity.created(new URI("/api/emprunts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /emprunts : Updates an existing emprunt.
     *
     * @param emprunt the emprunt to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emprunt,
     * or with status 400 (Bad Request) if the emprunt is not valid,
     * or with status 500 (Internal Server Error) if the emprunt couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/emprunts")
    @Timed
    public ResponseEntity<Emprunt> updateEmprunt(@RequestBody Emprunt emprunt) throws URISyntaxException {
        log.debug("REST request to update Emprunt : {}", emprunt);
        if (emprunt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Emprunt result = empruntRepository.save(emprunt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emprunt.getId().toString()))
            .body(result);
    }

    /**
     * GET  /emprunts : get all the emprunts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emprunts in body
     */
    @GetMapping("/emprunts")
    @Timed
    public List<Emprunt> getAllEmprunts() {
        log.debug("REST request to get all Emprunts");
        return empruntRepository.findAll();
    }

    /**
     * GET  /emprunts/:id : get the "id" emprunt.
     *
     * @param id the id of the emprunt to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emprunt, or with status 404 (Not Found)
     */
    @GetMapping("/emprunts/{id}")
    @Timed
    public ResponseEntity<Emprunt> getEmprunt(@PathVariable Long id) {
        log.debug("REST request to get Emprunt : {}", id);
        Optional<Emprunt> emprunt = empruntRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(emprunt);
    }

    /**
     * DELETE  /emprunts/:id : delete the "id" emprunt.
     *
     * @param id the id of the emprunt to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/emprunts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        log.debug("REST request to delete Emprunt : {}", id);
        empruntRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
