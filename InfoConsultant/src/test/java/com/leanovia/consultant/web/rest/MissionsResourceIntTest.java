package com.leanovia.consultant.web.rest;

import com.leanovia.consultant.InfoConsultantApp;

import com.leanovia.consultant.domain.Missions;
import com.leanovia.consultant.repository.MissionsRepository;
import com.leanovia.consultant.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.ArrayList;

import static com.leanovia.consultant.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MissionsResource REST controller.
 *
 * @see MissionsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InfoConsultantApp.class)
public class MissionsResourceIntTest {

    private static final String DEFAULT_CLIENT = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT = "BBBBBBBBBB";

    private static final String DEFAULT_PROJET = "AAAAAAAAAA";
    private static final String UPDATED_PROJET = "BBBBBBBBBB";

    @Autowired
    private MissionsRepository missionsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMissionsMockMvc;

    private Missions missions;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MissionsResource missionsResource = new MissionsResource(missionsRepository);
        this.restMissionsMockMvc = MockMvcBuilders.standaloneSetup(missionsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Missions createEntity(EntityManager em) {
        Missions missions = new Missions()
            .client(DEFAULT_CLIENT)
            .projet(DEFAULT_PROJET);
        return missions;
    }

    @Before
    public void initTest() {
        missions = createEntity(em);
    }

    @Test
    @Transactional
    public void createMissions() throws Exception {
        int databaseSizeBeforeCreate = missionsRepository.findAll().size();

        // Create the Missions
        restMissionsMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(missions)))
            .andExpect(status().isCreated());

        // Validate the Missions in the database
        List<Missions> missionsList = missionsRepository.findAll();
        assertThat(missionsList).hasSize(databaseSizeBeforeCreate + 1);
        Missions testMissions = missionsList.get(missionsList.size() - 1);
        assertThat(testMissions.getClient()).isEqualTo(DEFAULT_CLIENT);
        assertThat(testMissions.getProjet()).isEqualTo(DEFAULT_PROJET);
    }

    @Test
    @Transactional
    public void createMissionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = missionsRepository.findAll().size();

        // Create the Missions with an existing ID
        missions.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMissionsMockMvc.perform(post("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(missions)))
            .andExpect(status().isBadRequest());

        // Validate the Missions in the database
        List<Missions> missionsList = missionsRepository.findAll();
        assertThat(missionsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMissions() throws Exception {
        // Initialize the database
        missionsRepository.saveAndFlush(missions);

        // Get all the missionsList
        restMissionsMockMvc.perform(get("/api/missions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(missions.getId().intValue())))
            .andExpect(jsonPath("$.[*].client").value(hasItem(DEFAULT_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].projet").value(hasItem(DEFAULT_PROJET.toString())));
    }
    

    @Test
    @Transactional
    public void getMissions() throws Exception {
        // Initialize the database
        missionsRepository.saveAndFlush(missions);

        // Get the missions
        restMissionsMockMvc.perform(get("/api/missions/{id}", missions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(missions.getId().intValue()))
            .andExpect(jsonPath("$.client").value(DEFAULT_CLIENT.toString()))
            .andExpect(jsonPath("$.projet").value(DEFAULT_PROJET.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMissions() throws Exception {
        // Get the missions
        restMissionsMockMvc.perform(get("/api/missions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMissions() throws Exception {
        // Initialize the database
        missionsRepository.saveAndFlush(missions);

        int databaseSizeBeforeUpdate = missionsRepository.findAll().size();

        // Update the missions
        Missions updatedMissions = missionsRepository.findById(missions.getId()).get();
        // Disconnect from session so that the updates on updatedMissions are not directly saved in db
        em.detach(updatedMissions);
        updatedMissions
            .client(UPDATED_CLIENT)
            .projet(UPDATED_PROJET);

        restMissionsMockMvc.perform(put("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMissions)))
            .andExpect(status().isOk());

        // Validate the Missions in the database
        List<Missions> missionsList = missionsRepository.findAll();
        assertThat(missionsList).hasSize(databaseSizeBeforeUpdate);
        Missions testMissions = missionsList.get(missionsList.size() - 1);
        assertThat(testMissions.getClient()).isEqualTo(UPDATED_CLIENT);
        assertThat(testMissions.getProjet()).isEqualTo(UPDATED_PROJET);
    }

    @Test
    @Transactional
    public void updateNonExistingMissions() throws Exception {
        int databaseSizeBeforeUpdate = missionsRepository.findAll().size();

        // Create the Missions

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMissionsMockMvc.perform(put("/api/missions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(missions)))
            .andExpect(status().isBadRequest());

        // Validate the Missions in the database
        List<Missions> missionsList = missionsRepository.findAll();
        assertThat(missionsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMissions() throws Exception {
        // Initialize the database
        missionsRepository.saveAndFlush(missions);

        int databaseSizeBeforeDelete = missionsRepository.findAll().size();

        // Get the missions
        restMissionsMockMvc.perform(delete("/api/missions/{id}", missions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Missions> missionsList = missionsRepository.findAll();
        assertThat(missionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Missions.class);
        Missions missions1 = new Missions();
        missions1.setId(1L);
        Missions missions2 = new Missions();
        missions2.setId(missions1.getId());
        assertThat(missions1).isEqualTo(missions2);
        missions2.setId(2L);
        assertThat(missions1).isNotEqualTo(missions2);
        missions1.setId(null);
        assertThat(missions1).isNotEqualTo(missions2);
    }
}
