package com.leanovia.notefrais.web.rest;

import com.leanovia.notefrais.NotefraisApp;

import com.leanovia.notefrais.domain.NoteFrais;
import com.leanovia.notefrais.repository.NoteFraisRepository;
import com.leanovia.notefrais.web.rest.errors.ExceptionTranslator;

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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.ArrayList;

import static com.leanovia.notefrais.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NoteFraisResource REST controller.
 *
 * @see NoteFraisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NotefraisApp.class)
public class NoteFraisResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATEUPLOAD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEUPLOAD = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FICHIER = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FICHIER = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_FICHIER_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FICHIER_CONTENT_TYPE = "image/png";

    @Autowired
    private NoteFraisRepository noteFraisRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNoteFraisMockMvc;

    private NoteFrais noteFrais;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NoteFraisResource noteFraisResource = new NoteFraisResource(noteFraisRepository);
        this.restNoteFraisMockMvc = MockMvcBuilders.standaloneSetup(noteFraisResource)
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
    public static NoteFrais createEntity(EntityManager em) {
        NoteFrais noteFrais = new NoteFrais()
            .name(DEFAULT_NAME)
            .dateupload(DEFAULT_DATEUPLOAD)
            .etat(DEFAULT_ETAT)
            .motif(DEFAULT_MOTIF)
            .fichier(DEFAULT_FICHIER)
            .fichierContentType(DEFAULT_FICHIER_CONTENT_TYPE);
        return noteFrais;
    }

    @Before
    public void initTest() {
        noteFrais = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoteFrais() throws Exception {
        int databaseSizeBeforeCreate = noteFraisRepository.findAll().size();

        // Create the NoteFrais
        restNoteFraisMockMvc.perform(post("/api/note-frais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteFrais)))
            .andExpect(status().isCreated());

        // Validate the NoteFrais in the database
        List<NoteFrais> noteFraisList = noteFraisRepository.findAll();
        assertThat(noteFraisList).hasSize(databaseSizeBeforeCreate + 1);
        NoteFrais testNoteFrais = noteFraisList.get(noteFraisList.size() - 1);
        assertThat(testNoteFrais.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNoteFrais.getDateupload()).isEqualTo(DEFAULT_DATEUPLOAD);
        assertThat(testNoteFrais.isEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testNoteFrais.getMotif()).isEqualTo(DEFAULT_MOTIF);
        assertThat(testNoteFrais.getFichier()).isEqualTo(DEFAULT_FICHIER);
        assertThat(testNoteFrais.getFichierContentType()).isEqualTo(DEFAULT_FICHIER_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createNoteFraisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noteFraisRepository.findAll().size();

        // Create the NoteFrais with an existing ID
        noteFrais.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoteFraisMockMvc.perform(post("/api/note-frais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteFrais)))
            .andExpect(status().isBadRequest());

        // Validate the NoteFrais in the database
        List<NoteFrais> noteFraisList = noteFraisRepository.findAll();
        assertThat(noteFraisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNoteFrais() throws Exception {
        // Initialize the database
        noteFraisRepository.saveAndFlush(noteFrais);

        // Get all the noteFraisList
        restNoteFraisMockMvc.perform(get("/api/note-frais?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noteFrais.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].dateupload").value(hasItem(DEFAULT_DATEUPLOAD.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF.toString())))
            .andExpect(jsonPath("$.[*].fichierContentType").value(hasItem(DEFAULT_FICHIER_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fichier").value(hasItem(Base64Utils.encodeToString(DEFAULT_FICHIER))));
    }
    

    @Test
    @Transactional
    public void getNoteFrais() throws Exception {
        // Initialize the database
        noteFraisRepository.saveAndFlush(noteFrais);

        // Get the noteFrais
        restNoteFraisMockMvc.perform(get("/api/note-frais/{id}", noteFrais.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(noteFrais.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.dateupload").value(DEFAULT_DATEUPLOAD.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF.toString()))
            .andExpect(jsonPath("$.fichierContentType").value(DEFAULT_FICHIER_CONTENT_TYPE))
            .andExpect(jsonPath("$.fichier").value(Base64Utils.encodeToString(DEFAULT_FICHIER)));
    }
    @Test
    @Transactional
    public void getNonExistingNoteFrais() throws Exception {
        // Get the noteFrais
        restNoteFraisMockMvc.perform(get("/api/note-frais/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoteFrais() throws Exception {
        // Initialize the database
        noteFraisRepository.saveAndFlush(noteFrais);

        int databaseSizeBeforeUpdate = noteFraisRepository.findAll().size();

        // Update the noteFrais
        NoteFrais updatedNoteFrais = noteFraisRepository.findById(noteFrais.getId()).get();
        // Disconnect from session so that the updates on updatedNoteFrais are not directly saved in db
        em.detach(updatedNoteFrais);
        updatedNoteFrais
            .name(UPDATED_NAME)
            .dateupload(UPDATED_DATEUPLOAD)
            .etat(UPDATED_ETAT)
            .motif(UPDATED_MOTIF)
            .fichier(UPDATED_FICHIER)
            .fichierContentType(UPDATED_FICHIER_CONTENT_TYPE);

        restNoteFraisMockMvc.perform(put("/api/note-frais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoteFrais)))
            .andExpect(status().isOk());

        // Validate the NoteFrais in the database
        List<NoteFrais> noteFraisList = noteFraisRepository.findAll();
        assertThat(noteFraisList).hasSize(databaseSizeBeforeUpdate);
        NoteFrais testNoteFrais = noteFraisList.get(noteFraisList.size() - 1);
        assertThat(testNoteFrais.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNoteFrais.getDateupload()).isEqualTo(UPDATED_DATEUPLOAD);
        assertThat(testNoteFrais.isEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testNoteFrais.getMotif()).isEqualTo(UPDATED_MOTIF);
        assertThat(testNoteFrais.getFichier()).isEqualTo(UPDATED_FICHIER);
        assertThat(testNoteFrais.getFichierContentType()).isEqualTo(UPDATED_FICHIER_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingNoteFrais() throws Exception {
        int databaseSizeBeforeUpdate = noteFraisRepository.findAll().size();

        // Create the NoteFrais

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNoteFraisMockMvc.perform(put("/api/note-frais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(noteFrais)))
            .andExpect(status().isBadRequest());

        // Validate the NoteFrais in the database
        List<NoteFrais> noteFraisList = noteFraisRepository.findAll();
        assertThat(noteFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNoteFrais() throws Exception {
        // Initialize the database
        noteFraisRepository.saveAndFlush(noteFrais);

        int databaseSizeBeforeDelete = noteFraisRepository.findAll().size();

        // Get the noteFrais
        restNoteFraisMockMvc.perform(delete("/api/note-frais/{id}", noteFrais.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NoteFrais> noteFraisList = noteFraisRepository.findAll();
        assertThat(noteFraisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoteFrais.class);
        NoteFrais noteFrais1 = new NoteFrais();
        noteFrais1.setId(1L);
        NoteFrais noteFrais2 = new NoteFrais();
        noteFrais2.setId(noteFrais1.getId());
        assertThat(noteFrais1).isEqualTo(noteFrais2);
        noteFrais2.setId(2L);
        assertThat(noteFrais1).isNotEqualTo(noteFrais2);
        noteFrais1.setId(null);
        assertThat(noteFrais1).isNotEqualTo(noteFrais2);
    }
}
