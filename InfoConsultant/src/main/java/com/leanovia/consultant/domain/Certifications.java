package com.leanovia.consultant.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Certifications.
 */
@Entity
@Table(name = "certifications")
public class Certifications implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certification")
    private String certification;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCertification() {
        return certification;
    }

    public Certifications certification(String certification) {
        this.certification = certification;
        return this;
    }

    public void setCertification(String certification) {
        this.certification = certification;
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
        Certifications certifications = (Certifications) o;
        if (certifications.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), certifications.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Certifications{" +
            "id=" + getId() +
            ", certification='" + getCertification() + "'" +
            "}";
    }
}
