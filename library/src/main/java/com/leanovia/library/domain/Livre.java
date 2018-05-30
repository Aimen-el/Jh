package com.leanovia.library.domain;


import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Livre.
 */
@Entity
@Table(name = "livre")
public class Livre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Column(name = "auteur")
    private String auteur;

    @Column(name = "edition")
    private String edition;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "disponibilite")
    private Boolean disponibilite;

    @Column(name = "date_achat")
    private LocalDate dateAchat;
    
    @OneToMany(mappedBy="livre", cascade=CascadeType.ALL)
	private List<Emprunt> emprunts = new ArrayList<Emprunt>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Livre titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAuteur() {
        return auteur;
    }

    public Livre auteur(String auteur) {
        this.auteur = auteur;
        return this;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public String getEdition() {
        return edition;
    }

    public Livre edition(String edition) {
        this.edition = edition;
        return this;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getIsbn() {
        return isbn;
    }

    public Livre isbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Boolean isDisponibilite() {
        return disponibilite;
    }

    public Livre disponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
        return this;
    }

    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    public LocalDate getDateAchat() {
        return dateAchat;
    }

    public Livre dateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
        return this;
    }

    public void setDateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
    }
    

	public List<Emprunt> getEmprunts() {
		return emprunts;
	}
	
	public void setEmprunts(List<Emprunt> emprunts) {
		this.emprunts = emprunts;
	}
	
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Livre livre = (Livre) o;
        if (livre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), livre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Livre{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", auteur='" + getAuteur() + "'" +
            ", edition='" + getEdition() + "'" +
            ", isbn='" + getIsbn() + "'" +
            ", disponibilite='" + isDisponibilite() + "'" +
            ", dateAchat='" + getDateAchat() + "'" +
            "}";
    }
}
