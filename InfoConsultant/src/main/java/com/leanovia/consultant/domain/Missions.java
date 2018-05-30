package com.leanovia.consultant.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Missions.
 */
@Entity
@Table(name = "missions")
public class Missions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client")
    private String client;

    @Column(name = "projet")
    private String projet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClient() {
        return client;
    }

    public Missions client(String client) {
        this.client = client;
        return this;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getProjet() {
        return projet;
    }

    public Missions projet(String projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(String projet) {
        this.projet = projet;
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
        Missions missions = (Missions) o;
        if (missions.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), missions.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Missions{" +
            "id=" + getId() +
            ", client='" + getClient() + "'" +
            ", projet='" + getProjet() + "'" +
            "}";
    }
}
