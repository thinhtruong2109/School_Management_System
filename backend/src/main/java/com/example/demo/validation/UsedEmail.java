package com.example.demo.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = UsedEmailValidator.class)
public @interface UsedEmail {

    String message() default "Email not associated!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}