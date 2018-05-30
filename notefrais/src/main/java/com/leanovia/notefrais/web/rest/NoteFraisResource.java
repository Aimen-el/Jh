package com.leanovia.notefrais.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.leanovia.notefrais.domain.NoteFrais;
import com.leanovia.notefrais.repository.NoteFraisRepository;
import com.leanovia.notefrais.web.rest.errors.BadRequestAlertException;
import com.leanovia.notefrais.web.rest.util.HeaderUtil;
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
 * REST controller for managing NoteFrais.
 */
@RestController
@RequestMapping("/api")
public class NoteFraisResource {

    private final Logger log = LoggerFactory.getLogger(NoteFraisResource.class);

    private static final String ENTITY_NAME = "noteFrais";

    private final NoteFraisRepository noteFraisRepository;

    public NoteFraisResource(NoteFraisRepository noteFraisRepository) {
        this.noteFraisRepository = noteFraisRepository;
    }

    /**
     * POST  /note-frais : Create a new noteFrais.
     *
     * @param noteFrais the noteFrais to create
     * @return the ResponseEntity with status 201 (Created) and with body the new noteFrais, or with status 400 (Bad Request) if the noteFrais has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/note-frais")
    @Timed
    public ResponseEntity<NoteFrais> createNoteFrais(@RequestBody NoteFrais noteFrais) throws URISyntaxException {
        log.debug("REST request to save NoteFrais : {}", noteFrais);
        if (noteFrais.getId() != null) {
            throw new BadRequestAlertException("A new noteFrais cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        NoteFrais result = noteFraisRepository.save(noteFrais);
        return ResponseEntity.created(new URI("/api/note-frais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /note-frais : Updates an existing noteFrais.
     *
     * @param noteFrais the noteFrais to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated noteFrais,
     * or with status 400 (Bad Request) if the noteFrais is not valid,
     * or with status 500 (Internal Server Error) if the noteFrais couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/note-frais")
    @Timed
    public ResponseEntity<NoteFrais> updateNoteFrais(@RequestBody NoteFrais noteFrais) throws URISyntaxException {
        log.debug("REST request to update NoteFrais : {}", noteFrais);
        if (noteFrais.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        NoteFrais result = noteFraisRepository.save(noteFrais);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, noteFrais.getId().toString()))
            .body(result);
    }

    /**
     * GET  /note-frais : get all the noteFrais.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of noteFrais in body
     */
    @GetMapping("/note-frais")
    @Timed
    public List<NoteFrais> getAllNoteFrais() {
        log.debug("REST request to get all NoteFrais");
        return noteFraisRepository.findAll();
    }

    /**
     * GET  /note-frais/:id : get the "id" noteFrais.
     *
     * @param id the id of the noteFrais to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the noteFrais, or with status 404 (Not Found)
     */
    @GetMapping("/note-frais/{id}")
    @Timed
    public ResponseEntity<NoteFrais> getNoteFrais(@PathVariable Long id) {
        log.debug("REST request to get NoteFrais : {}", id);
        Optional<NoteFrais> noteFrais = noteFraisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(noteFrais);
    }

    /**
     * DELETE  /note-frais/:id : delete the "id" noteFrais.
     *
     * @param id the id of the noteFrais to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/note-frais/{id}")
    @Timed
    public ResponseEntity<Void> deleteNoteFrais(@PathVariable Long id) {
        log.debug("REST request to delete NoteFrais : {}", id);
        noteFraisRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
