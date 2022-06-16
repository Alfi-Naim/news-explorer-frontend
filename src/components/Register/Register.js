import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";

function Register({ isOpen, onClose, onRegister, onBottomLinkClick, submitError, setSubmitError, isPending }) {

    const { register, handleSubmit, reset, clearErrors, formState, formState: { errors }} = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        onRegister({ email: data.email, password: data.password, name: data.username });
    };

    useEffect(() => {
        onReset();
        clearErrors();
        setSubmitError("");
      }, [ isOpen ]);

    const onReset = () => {
        reset();
    };

    return (

        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Sign up"
            submitTitle={isPending? "Signing up..." : "Sign up"}
            onSubmit={handleSubmit(onSubmit)}
            bottomLink="Sign in"
            bottomLinkText="or "
            onBottomLinkClick={onBottomLinkClick}
            isValid={formState.isValid}>

            <label className="popup__form-field">Email</label>
            <input className="popup__input" {...register("email", { required: "Email is requird", pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i, message: "Invalid email address" }})} placeholder="Enter email" />
            <p className="popup__error-text">{errors.email && errors.email.message}</p>

            <label className="popup__form-field">Password</label>
            <input className="popup__input" type="password" {...register("password", { required: "Password is requird" })} placeholder="Enter password" />
            <p className="popup__error-text">{errors.password && errors.password.message}</p>

            <label className="popup__form-field">Username</label>
            <input className="popup__input" type="text" {...register("username", { required: "Username is requird" , minLength: { value: 2, message: "Username minimum lengh is 2"}, maxLength: { value: 30, message: "Username maximum lengh is 30" }})} placeholder="Enter your username" />
            <p className="popup__error-text">{errors.username && errors.username.message}</p>

            <p className="popup__error-text popup__error-text_place_center">{submitError}</p>
        </PopupWithForm>
    );
}

export default Register;
