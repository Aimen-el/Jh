package com.leanovia.consultant.web.rest;

import com.leanovia.consultant.MsconsultantApp;

import com.leanovia.consultant.domain.Consultant;
import com.leanovia.consultant.repository.ConsultantRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.ArrayList;

import static com.leanovia.consultant.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConsultantResource REST controller.
 *
 * @see ConsultantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MsconsultantApp.class)
public class ConsultantResourceIntTest {

    private static final LocalDate DEFAULT_DATE_ENTREE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ENTREE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CONGE_PAYE = 1;
    private static final Integer UPDATED_CONGE_PAYE = 2;

    private static final String DEFAULT_MISSION = "AAAAAAAAAA";
    private static final String UPDATED_MISSION = "BBBBBBBBBB";

    private static final String DEFAULT_FONCTION = "AAAAAAAAAA";
    private static final String UPDATED_FONCTION = "BBBBBBBBBB";

    @Autowired
    private ConsultantRepository consultantRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConsultantMockMvc;

    private Consultant consultant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsultantResource consultantResource = new ConsultantResource(consultantRepository);
        this.restConsultantMockMvc = MockMvcBuilders.standaloneSetup(consultantResource)
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
    public static Consultant createEntity(EntityManager em) {
        Consultant consultant = new Consultant()
            .dateEntree(DEFAULT_DATE_ENTREE)
            .telephone(DEFAULT_TELEPHONE)
            .congePaye(DEFAULT_CONGE_PAYE)
            .mission(DEFAULT_MISSION)
            .fonction(DEFAULT_FONCTION);
        return consultant;
    }

    @Before
    public void initTest() {
        consultant = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultant() throws Exception {
        int databaseSizeBeforeCreate = consultantRepository.findAll().size();

        // Create the Consultant
        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isCreated());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeCreate + 1);
        Consultant testConsultant = consultantList.get(consultantList.size() - 1);
        assertThat(testConsultant.getDateEntree()).isEqualTo(DEFAULT_DATE_ENTREE);
        assertThat(testConsultant.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testConsultant.getCongePaye()).isEqualTo(DEFAULT_CONGE_PAYE);
        assertThat(testConsultant.getMission()).isEqualTo(DEFAULT_MISSION);
        assertThat(testConsultant.getFonction()).isEqualTo(DEFAULT_FONCTION);
    }

    @Test
    @Transactional
    public void createConsultantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultantRepository.findAll().size();

        // Create the Consultant with an existing ID
        consultant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultantMockMvc.perform(post("/api/consultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsultants() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        // Get all the consultantList
        restConsultantMockMvc.perform(get("/api/consultants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultant.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEntree").value(hasItem(DEFAULT_DATE_ENTREE.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].congePaye").value(hasItem(DEFAULT_CONGE_PAYE)))
            .andExpect(jsonPath("$.[*].mission").value(hasItem(DEFAULT_MISSION.toString())))
            .andExpect(jsonPath("$.[*].fonction").value(hasItem(DEFAULT_FONCTION.toString())));
    }
    

    @Test
    @Transactional
    public void getConsultant() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        // Get the consultant
        restConsultantMockMvc.perform(get("/api/consultants/{id}", consultant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consultant.getId().intValue()))
            .andExpect(jsonPath("$.dateEntree").value(DEFAULT_DATE_ENTREE.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.congePaye").value(DEFAULT_CONGE_PAYE))
            .andExpect(jsonPath("$.mission").value(DEFAULT_MISSION.toString()))
            .andExpect(jsonPath("$.fonction").value(DEFAULT_FONCTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingConsultant() throws Exception {
        // Get the consultant
        restConsultantMockMvc.perform(get("/api/consultants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultant() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        int databaseSizeBeforeUpdate = consultantRepository.findAll().size();

        // Update the consultant
        Consultant updatedConsultant = consultantRepository.findById(consultant.getId()).get();
        // Disconnect from session so that the updates on updatedConsultant are not directly saved in db
        em.detach(updatedConsultant);
        updatedConsultant
            .dateEntree(UPDATED_DATE_ENTREE)
            .telephone(UPDATED_TELEPHONE)
            .congePaye(UPDATED_CONGE_PAYE)
            .mission(UPDATED_MISSION)
            .fonction(UPDATED_FONCTION);

        restConsultantMockMvc.perform(put("/api/consultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultant)))
            .andExpect(status().isOk());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeUpdate);
        Consultant testConsultant = consultantList.get(consultantList.size() - 1);
        assertThat(testConsultant.getDateEntree()).isEqualTo(UPDATED_DATE_ENTREE);
        assertThat(testConsultant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testConsultant.getCongePaye()).isEqualTo(UPDATED_CONGE_PAYE);
        assertThat(testConsultant.getMission()).isEqualTo(UPDATED_MISSION);
        assertThat(testConsultant.getFonction()).isEqualTo(UPDATED_FONCTION);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultant() throws Exception {
        int databaseSizeBeforeUpdate = consultantRepository.findAll().size();

        // Create the Consultant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConsultantMockMvc.perform(put("/api/consultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultant)))
            .andExpect(status().isBadRequest());

        // Validate the Consultant in the database
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsultant() throws Exception {
        // Initialize the database
        consultantRepository.saveAndFlush(consultant);

        int databaseSizeBeforeDelete = consultantRepository.findAll().size();

        // Get the consultant
        restConsultantMockMvc.perform(delete("/api/consultants/{id}", consultant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Consultant> consultantList = consultantRepository.findAll();
        assertThat(consultantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consultant.class);
        Consultant consultant1 = new Consultant();
        consultant1.setId(1L);
        Consultant consultant2 = new Consultant();
        consultant2.setId(consultant1.getId());
        assertThat(consultant1).isEqualTo(consultant2);
        consultant2.setId(2L);
        assertThat(consultant1).isNotEqualTo(consultant2);
        consultant1.setId(null);
        assertThat(consultant1).isNotEqualTo(consultant2);
    }
}
