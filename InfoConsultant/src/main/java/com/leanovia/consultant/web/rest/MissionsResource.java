package com.leanovia.consultant.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.leanovia.consultant.domain.Missions;
import com.leanovia.consultant.repository.MissionsRepository;
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
 * REST controller for managing Missions.
 */
@RestController
@RequestMapping("/api")
public class MissionsResource {

    private final Logger log = LoggerFactory.getLogger(MissionsResource.class);

    private static final String ENTITY_NAME = "missions";

    private final MissionsRepository missionsRepository;

    public MissionsResource(MissionsRepository missionsRepository) {
        this.missionsRepository = missionsRepository;
    }

    /**
     * POST  /missions : Create a new missions.
     *
     * @param missions the missions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new missions, or with status 400 (Bad Request) if the missions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/missions")
    @Timed
    public ResponseEntity<Missions> createMissions(@RequestBody Missions missions) throws URISyntaxException {
        log.debug("REST request to save Missions : {}", missions);
        if (missions.getId() != null) {
            throw new BadRequestAlertException("A new missions cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Missions result = missionsRepository.save(missions);
        return ResponseEntity.created(new URI("/api/missions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /missions : Updates an existing missions.
     *
     * @param missions the missions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated missions,
     * or with status 400 (Bad Request) if the missions is not valid,
     * or with status 500 (Internal Server Error) if the missions couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/missions")
    @Timed
    public ResponseEntity<Missions> updateMissions(@RequestBody Missions missions) throws URISyntaxException {
        log.debug("REST request to update Missions : {}", missions);
        if (missions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Missions result = missionsRepository.save(missions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, missions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /missions : get all the missions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of missions in body
     */
    @GetMapping("/missions")
    @Timed
    public List<Missions> getAllMissions() {
        log.debug("REST request to get all Missions");
        return missionsRepository.findAll();
    }

    /**
     * GET  /missions/:id : get the "id" missions.
     *
     * @param id the id of the missions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the missions, or with status 404 (Not Found)
     */
    @GetMapping("/missions/{id}")
    @Timed
    public ResponseEntity<Missions> getMissions(@PathVariable Long id) {
        log.debug("REST request to get Missions : {}", id);
        Optional<Missions> missions = missionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(missions);
    }

    /**
     * DELETE  /missions/:id : delete the "id" missions.
     *
     * @param id the id of the missions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/missions/{id}")
    @Timed
    public ResponseEntity<Void> deleteMissions(@PathVariable Long id) {
        log.debug("REST request to delete Missions : {}", id);
        missionsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
