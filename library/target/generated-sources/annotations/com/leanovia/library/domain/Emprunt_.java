package com.leanovia.library.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Emprunt.class)
public abstract class Emprunt_ {

	public static volatile SingularAttribute<Emprunt, LocalDate> dateEmprunt;
	public static volatile SingularAttribute<Emprunt, LocalDate> dateRetour;
	public static volatile SingularAttribute<Emprunt, Long> id;
	public static volatile SingularAttribute<Emprunt, User> user;
	public static volatile SingularAttribute<Emprunt, Livre> livre;

}

