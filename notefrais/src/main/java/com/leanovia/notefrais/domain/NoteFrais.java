package com.leanovia.notefrais.domain;


import javax.persistence.*;
import javax.validation.constraints.NotNull;


import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A NoteFrais.
 */
@Entity
@Table(name = "note_frais")
public class NoteFrais implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "consultant")
    private String consultant;

    
	@Column(name = "name")
    private String name;

    @Column(name = "dateupload")
    private LocalDate dateupload;

    @Column(name = "etat")
    private Boolean etat;

    @Column(name = "motif")
    private String motif;

    @Lob
    @Column(name = "fichier")
    private byte[] fichier;

    @Column(name = "fichier_content_type")
    private String fichierContentType;
    
   /* @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;*/

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }
    

    public String getConsultant() {
		return consultant;
	}


    public NoteFrais consultant(String consultant) {
        this.consultant = consultant;
        return this;
    }
	public void setConsultant(String consultant) {
		this.consultant = consultant;
	}


    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public NoteFrais name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateupload() {
        return dateupload;
    }

    public NoteFrais dateupload(LocalDate dateupload) {
        this.dateupload = dateupload;
        return this;
    }

    public void setDateupload(LocalDate dateupload) {
        this.dateupload = dateupload;
    }

    public Boolean isEtat() {
        return etat;
    }

    public NoteFrais etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public String getMotif() {
        return motif;
    }

    public NoteFrais motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public byte[] getFichier() {
        return fichier;
    }

    public NoteFrais fichier(byte[] fichier) {
        this.fichier = fichier;
        return this;
    }

    public void setFichier(byte[] fichier) {
        this.fichier = fichier;
    }

    public String getFichierContentType() {
        return fichierContentType;
    }

    public NoteFrais fichierContentType(String fichierContentType) {
        this.fichierContentType = fichierContentType;
        return this;
    }

    public void setFichierContentType(String fichierContentType) {
        this.fichierContentType = fichierContentType;
    }
    
    /*public User getUser() {
        return user;
    }

    public NoteFrais user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }*/
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NoteFrais noteFrais = (NoteFrais) o;
        if (noteFrais.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), noteFrais.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NoteFrais{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dateupload='" + getDateupload() + "'" +
            ", etat='" + isEtat() + "'" +
            ", motif='" + getMotif() + "'" +
            ", fichier='" + getFichier() + "'" +
            ", fichierContentType='" + getFichierContentType() + "'" +
            "}";
    }
}
