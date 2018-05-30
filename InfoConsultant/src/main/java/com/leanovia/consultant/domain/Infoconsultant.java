package com.leanovia.consultant.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Infoconsultant.
 */
@Entity
@Table(name = "infoconsultant")
public class Infoconsultant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_entree")
    private LocalDate dateEntree;

    @Column(name = "phone")
    private String phone;

    @Column(name = "fonction")
    private String fonction;

    @Column(name = "num_sec_soc")
    private String numSecSoc;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Missions missions;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Certifications certifications;
    
    @ManyToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateEntree() {
        return dateEntree;
    }

    public Infoconsultant dateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
        return this;
    }

    public void setDateEntree(LocalDate dateEntree) {
        this.dateEntree = dateEntree;
    }

    public String getPhone() {
        return phone;
    }

    public Infoconsultant phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFonction() {
        return fonction;
    }

    public Infoconsultant fonction(String fonction) {
        this.fonction = fonction;
        return this;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public String getNumSecSoc() {
        return numSecSoc;
    }

    public Infoconsultant numSecSoc(String numSecSoc) {
        this.numSecSoc = numSecSoc;
        return this;
    }

    public void setNumSecSoc(String numSecSoc) {
        this.numSecSoc = numSecSoc;
    }

    public Missions getMissions() {
        return missions;
    }

    public Infoconsultant missions(Missions missions) {
        this.missions = missions;
        return this;
    }

    public void setMissions(Missions missions) {
        this.missions = missions;
    }

    public Certifications getCertifications() {
        return certifications;
    }

    public Infoconsultant certifications(Certifications certifications) {
        this.certifications = certifications;
        return this;
    }

    public void setCertifications(Certifications certifications) {
        this.certifications = certifications;
    }
    
    public User getUser() {
        return user;
    }

    public Infoconsultant user(User user) {
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
        Infoconsultant infoconsultant = (Infoconsultant) o;
        if (infoconsultant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), infoconsultant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Infoconsultant{" +
            "id=" + getId() +
            ", dateEntree='" + getDateEntree() + "'" +
            ", phone='" + getPhone() + "'" +
            ", fonction='" + getFonction() + "'" +
            ", numSecSoc='" + getNumSecSoc() + "'" +
            "}";
    }
}
