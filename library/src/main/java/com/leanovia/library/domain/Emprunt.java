package com.leanovia.library.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Emprunt.
 */
@Entity
@Table(name = "emprunt")
public class Emprunt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_emprunt")
    private LocalDate dateEmprunt;

    @Column(name = "date_retour")
    private LocalDate dateRetour;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Livre livre;
    
    @ManyToOne(optional = false)
    @NotNull
    @JoinColumn()
    private User user;
    
    
	// jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateEmprunt() {
        return dateEmprunt;
    }

    public Emprunt dateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
        return this;
    }

    public void setDateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
    }

    public LocalDate getDateRetour() {
        return dateRetour;
    }

    public Emprunt dateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
        return this;
    }

    public void setDateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
    }

    public Livre getLivre() {
        return livre;
    }

    public Emprunt livre(Livre livre) {
        this.livre = livre;
        return this;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }
    
    public User getUser() {
		return user;
	}
    
    public Emprunt user(User user) {
        this.user = user;
        return this;
    }

	public void setUser(User user) {
		this.user = user;
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
        Emprunt emprunt = (Emprunt) o;
        if (emprunt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emprunt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Emprunt{" +
            "id=" + getId() +
            ", dateEmprunt='" + getDateEmprunt() + "'" +
            ", dateRetour='" + getDateRetour() + "'" +
            "}";
    }
}
