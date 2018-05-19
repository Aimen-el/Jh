package com.leanovia.consultant.web.rest.vm;

import com.leanovia.consultant.service.dto.UserDTO;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {

    private String num_sec_soc;
    private Long telephone;
    private String fonction;
    private Long date_entree;

    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    public String getNum_sec_soc() {
        return num_sec_soc;
    }

    public Long getTelephone() {
        return telephone;
    }

    public String getFonction() {
        return fonction;
    }

    public Long getDate_entree() {
        return date_entree;
    }

    @Override
    public String toString() {
        return "ManagedUserVM{" +
            "} " + super.toString();
    }
}
