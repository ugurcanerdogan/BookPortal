package com.uqi.bookportal.model.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid name")
    private String name;

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid username")
    @Email
    private String username;

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter a valid password")
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
