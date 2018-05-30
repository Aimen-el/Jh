package com.leanovia.consultant.web.rest;

import com.leanovia.consultant.InfoConsultantApp;

import com.leanovia.consultant.domain.Certifications;
import com.leanovia.consultant.repository.CertificationsRepository;
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
 * Test class for the CertificationsResource REST controller.
 *
 * @see CertificationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InfoConsultantApp.class)
public class CertificationsResourceIntTest {

    private static final String DEFAULT_CERTIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_CERTIFICATION = "BBBBBBBBBB";

    @Autowired
    private CertificationsRepository certificationsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCertificationsMockMvc;

    private Certifications certifications;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CertificationsResource certificationsResource = new CertificationsResource(certificationsRepository);
        this.restCertificationsMockMvc = MockMvcBuilders.standaloneSetup(certificationsResource)
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
    public static Certifications createEntity(EntityManager em) {
        Certifications certifications = new Certifications()
            .certification(DEFAULT_CERTIFICATION);
        return certifications;
    }

    @Before
    public void initTest() {
        certifications = createEntity(em);
    }

    @Test
    @Transactional
    public void createCertifications() throws Exception {
        int databaseSizeBeforeCreate = certificationsRepository.findAll().size();

        // Create the Certifications
        restCertificationsMockMvc.perform(post("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifications)))
            .andExpect(status().isCreated());

        // Validate the Certifications in the database
        List<Certifications> certificationsList = certificationsRepository.findAll();
        assertThat(certificationsList).hasSize(databaseSizeBeforeCreate + 1);
        Certifications testCertifications = certificationsList.get(certificationsList.size() - 1);
        assertThat(testCertifications.getCertification()).isEqualTo(DEFAULT_CERTIFICATION);
    }

    @Test
    @Transactional
    public void createCertificationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = certificationsRepository.findAll().size();

        // Create the Certifications with an existing ID
        certifications.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCertificationsMockMvc.perform(post("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifications)))
            .andExpect(status().isBadRequest());

        // Validate the Certifications in the database
        List<Certifications> certificationsList = certificationsRepository.findAll();
        assertThat(certificationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCertifications() throws Exception {
        // Initialize the database
        certificationsRepository.saveAndFlush(certifications);

        // Get all the certificationsList
        restCertificationsMockMvc.perform(get("/api/certifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(certifications.getId().intValue())))
            .andExpect(jsonPath("$.[*].certification").value(hasItem(DEFAULT_CERTIFICATION.toString())));
    }
    

    @Test
    @Transactional
    public void getCertifications() throws Exception {
        // Initialize the database
        certificationsRepository.saveAndFlush(certifications);

        // Get the certifications
        restCertificationsMockMvc.perform(get("/api/certifications/{id}", certifications.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(certifications.getId().intValue()))
            .andExpect(jsonPath("$.certification").value(DEFAULT_CERTIFICATION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCertifications() throws Exception {
        // Get the certifications
        restCertificationsMockMvc.perform(get("/api/certifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCertifications() throws Exception {
        // Initialize the database
        certificationsRepository.saveAndFlush(certifications);

        int databaseSizeBeforeUpdate = certificationsRepository.findAll().size();

        // Update the certifications
        Certifications updatedCertifications = certificationsRepository.findById(certifications.getId()).get();
        // Disconnect from session so that the updates on updatedCertifications are not directly saved in db
        em.detach(updatedCertifications);
        updatedCertifications
            .certification(UPDATED_CERTIFICATION);

        restCertificationsMockMvc.perform(put("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCertifications)))
            .andExpect(status().isOk());

        // Validate the Certifications in the database
        List<Certifications> certificationsList = certificationsRepository.findAll();
        assertThat(certificationsList).hasSize(databaseSizeBeforeUpdate);
        Certifications testCertifications = certificationsList.get(certificationsList.size() - 1);
        assertThat(testCertifications.getCertification()).isEqualTo(UPDATED_CERTIFICATION);
    }

    @Test
    @Transactional
    public void updateNonExistingCertifications() throws Exception {
        int databaseSizeBeforeUpdate = certificationsRepository.findAll().size();

        // Create the Certifications

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCertificationsMockMvc.perform(put("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifications)))
            .andExpect(status().isBadRequest());

        // Validate the Certifications in the database
        List<Certifications> certificationsList = certificationsRepository.findAll();
        assertThat(certificationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCertifications() throws Exception {
        // Initialize the database
        certificationsRepository.saveAndFlush(certifications);

        int databaseSizeBeforeDelete = certificationsRepository.findAll().size();

        // Get the certifications
        restCertificationsMockMvc.perform(delete("/api/certifications/{id}", certifications.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Certifications> certificationsList = certificationsRepository.findAll();
        assertThat(certificationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Certifications.class);
        Certifications certifications1 = new Certifications();
        certifications1.setId(1L);
        Certifications certifications2 = new Certifications();
        certifications2.setId(certifications1.getId());
        assertThat(certifications1).isEqualTo(certifications2);
        certifications2.setId(2L);
        assertThat(certifications1).isNotEqualTo(certifications2);
        certifications1.setId(null);
        assertThat(certifications1).isNotEqualTo(certifications2);
    }
}
