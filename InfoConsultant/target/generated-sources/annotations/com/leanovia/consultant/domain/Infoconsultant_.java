package com.leanovia.consultant.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Infoconsultant.class)
public abstract class Infoconsultant_ {

	public static volatile SingularAttribute<Infoconsultant, String> numSecSoc;
	public static volatile SingularAttribute<Infoconsultant, String> phone;
	public static volatile SingularAttribute<Infoconsultant, Missions> missions;
	public static volatile SingularAttribute<Infoconsultant, String> fonction;
	public static volatile SingularAttribute<Infoconsultant, Long> id;
	public static volatile SingularAttribute<Infoconsultant, LocalDate> dateEntree;
	public static volatile SingularAttribute<Infoconsultant, Certifications> certifications;
	public static volatile SingularAttribute<Infoconsultant, User> user;

}

