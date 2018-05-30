package com.leanovia.consultant.web.rest;

import com.leanovia.consultant.InfoConsultantApp;

import com.leanovia.consultant.domain.Infoconsultant;
import com.leanovia.consultant.repository.InfoconsultantRepository;
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
 * Test class for the InfoconsultantResource REST controller.
 *
 * @see InfoconsultantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InfoConsultantApp.class)
public class InfoconsultantResourceIntTest {

    private static final LocalDate DEFAULT_DATE_ENTREE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ENTREE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_FONCTION = "AAAAAAAAAA";
    private static final String UPDATED_FONCTION = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_SEC_SOC = "AAAAAAAAAA";
    private static final String UPDATED_NUM_SEC_SOC = "BBBBBBBBBB";

    @Autowired
    private InfoconsultantRepository infoconsultantRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInfoconsultantMockMvc;

    private Infoconsultant infoconsultant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InfoconsultantResource infoconsultantResource = new InfoconsultantResource(infoconsultantRepository);
        this.restInfoconsultantMockMvc = MockMvcBuilders.standaloneSetup(infoconsultantResource)
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
    public static Infoconsultant createEntity(EntityManager em) {
        Infoconsultant infoconsultant = new Infoconsultant()
            .dateEntree(DEFAULT_DATE_ENTREE)
            .phone(DEFAULT_PHONE)
            .fonction(DEFAULT_FONCTION)
            .numSecSoc(DEFAULT_NUM_SEC_SOC);
        return infoconsultant;
    }

    @Before
    public void initTest() {
        infoconsultant = createEntity(em);
    }

    @Test
    @Transactional
    public void createInfoconsultant() throws Exception {
        int databaseSizeBeforeCreate = infoconsultantRepository.findAll().size();

        // Create the Infoconsultant
        restInfoconsultantMockMvc.perform(post("/api/infoconsultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(infoconsultant)))
            .andExpect(status().isCreated());

        // Validate the Infoconsultant in the database
        List<Infoconsultant> infoconsultantList = infoconsultantRepository.findAll();
        assertThat(infoconsultantList).hasSize(databaseSizeBeforeCreate + 1);
        Infoconsultant testInfoconsultant = infoconsultantList.get(infoconsultantList.size() - 1);
        assertThat(testInfoconsultant.getDateEntree()).isEqualTo(DEFAULT_DATE_ENTREE);
        assertThat(testInfoconsultant.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testInfoconsultant.getFonction()).isEqualTo(DEFAULT_FONCTION);
        assertThat(testInfoconsultant.getNumSecSoc()).isEqualTo(DEFAULT_NUM_SEC_SOC);
    }

    @Test
    @Transactional
    public void createInfoconsultantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = infoconsultantRepository.findAll().size();

        // Create the Infoconsultant with an existing ID
        infoconsultant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInfoconsultantMockMvc.perform(post("/api/infoconsultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(infoconsultant)))
            .andExpect(status().isBadRequest());

        // Validate the Infoconsultant in the database
        List<Infoconsultant> infoconsultantList = infoconsultantRepository.findAll();
        assertThat(infoconsultantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInfoconsultants() throws Exception {
        // Initialize the database
        infoconsultantRepository.saveAndFlush(infoconsultant);

        // Get all the infoconsultantList
        restInfoconsultantMockMvc.perform(get("/api/infoconsultants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(infoconsultant.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEntree").value(hasItem(DEFAULT_DATE_ENTREE.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].fonction").value(hasItem(DEFAULT_FONCTION.toString())))
            .andExpect(jsonPath("$.[*].numSecSoc").value(hasItem(DEFAULT_NUM_SEC_SOC.toString())));
    }
    

    @Test
    @Transactional
    public void getInfoconsultant() throws Exception {
        // Initialize the database
        infoconsultantRepository.saveAndFlush(infoconsultant);

        // Get the infoconsultant
        restInfoconsultantMockMvc.perform(get("/api/infoconsultants/{id}", infoconsultant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(infoconsultant.getId().intValue()))
            .andExpect(jsonPath("$.dateEntree").value(DEFAULT_DATE_ENTREE.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.fonction").value(DEFAULT_FONCTION.toString()))
            .andExpect(jsonPath("$.numSecSoc").value(DEFAULT_NUM_SEC_SOC.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInfoconsultant() throws Exception {
        // Get the infoconsultant
        restInfoconsultantMockMvc.perform(get("/api/infoconsultants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInfoconsultant() throws Exception {
        // Initialize the database
        infoconsultantRepository.saveAndFlush(infoconsultant);

        int databaseSizeBeforeUpdate = infoconsultantRepository.findAll().size();

        // Update the infoconsultant
        Infoconsultant updatedInfoconsultant = infoconsultantRepository.findById(infoconsultant.getId()).get();
        // Disconnect from session so that the updates on updatedInfoconsultant are not directly saved in db
        em.detach(updatedInfoconsultant);
        updatedInfoconsultant
            .dateEntree(UPDATED_DATE_ENTREE)
            .phone(UPDATED_PHONE)
            .fonction(UPDATED_FONCTION)
            .numSecSoc(UPDATED_NUM_SEC_SOC);

        restInfoconsultantMockMvc.perform(put("/api/infoconsultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInfoconsultant)))
            .andExpect(status().isOk());

        // Validate the Infoconsultant in the database
        List<Infoconsultant> infoconsultantList = infoconsultantRepository.findAll();
        assertThat(infoconsultantList).hasSize(databaseSizeBeforeUpdate);
        Infoconsultant testInfoconsultant = infoconsultantList.get(infoconsultantList.size() - 1);
        assertThat(testInfoconsultant.getDateEntree()).isEqualTo(UPDATED_DATE_ENTREE);
        assertThat(testInfoconsultant.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testInfoconsultant.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testInfoconsultant.getNumSecSoc()).isEqualTo(UPDATED_NUM_SEC_SOC);
    }

    @Test
    @Transactional
    public void updateNonExistingInfoconsultant() throws Exception {
        int databaseSizeBeforeUpdate = infoconsultantRepository.findAll().size();

        // Create the Infoconsultant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInfoconsultantMockMvc.perform(put("/api/infoconsultants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(infoconsultant)))
            .andExpect(status().isBadRequest());

        // Validate the Infoconsultant in the database
        List<Infoconsultant> infoconsultantList = infoconsultantRepository.findAll();
        assertThat(infoconsultantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInfoconsultant() throws Exception {
        // Initialize the database
        infoconsultantRepository.saveAndFlush(infoconsultant);

        int databaseSizeBeforeDelete = infoconsultantRepository.findAll().size();

        // Get the infoconsultant
        restInfoconsultantMockMvc.perform(delete("/api/infoconsultants/{id}", infoconsultant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Infoconsultant> infoconsultantList = infoconsultantRepository.findAll();
        assertThat(infoconsultantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Infoconsultant.class);
        Infoconsultant infoconsultant1 = new Infoconsultant();
        infoconsultant1.setId(1L);
        Infoconsultant infoconsultant2 = new Infoconsultant();
        infoconsultant2.setId(infoconsultant1.getId());
        assertThat(infoconsultant1).isEqualTo(infoconsultant2);
        infoconsultant2.setId(2L);
        assertThat(infoconsultant1).isNotEqualTo(infoconsultant2);
        infoconsultant1.setId(null);
        assertThat(infoconsultant1).isNotEqualTo(infoconsultant2);
    }
}
