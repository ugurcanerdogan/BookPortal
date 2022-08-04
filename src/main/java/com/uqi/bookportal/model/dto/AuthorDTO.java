package com.uqi.bookportal.model.dto;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AuthorDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid name")
    private String name;
    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid email")
    @Email
    private String email;

    private char gender;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }
}
