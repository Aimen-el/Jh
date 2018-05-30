package com.leanovia.library.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Livre.class)
public abstract class Livre_ {

	public static volatile SingularAttribute<Livre, String> titre;
	public static volatile SingularAttribute<Livre, String> isbn;
	public static volatile SingularAttribute<Livre, Boolean> disponibilite;
	public static volatile SingularAttribute<Livre, LocalDate> dateAchat;
	public static volatile ListAttribute<Livre, Emprunt> emprunts;
	public static volatile SingularAttribute<Livre, String> edition;
	public static volatile SingularAttribute<Livre, Long> id;
	public static volatile SingularAttribute<Livre, String> auteur;

}

