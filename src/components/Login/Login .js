import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";

function Login({ isOpen, onClose, onLogin, onBottomLinkClick, submitError, setSubmitError, isPending }) {

    const { register, handleSubmit, reset, clearErrors,formState, formState: { errors }} = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        onLogin({ email: data.email, password: data.password });
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
            title="Sign in"
            submitTitle={isPending? "Signing in..." : "Sign in"}
            onSubmit={handleSubmit(onSubmit)}
            bottomLink="Sign up"
            bottomLinkText="or "
            onBottomLinkClick={onBottomLinkClick}
            isValid={formState.isValid}>

            <label className="popup__form-field">Email</label>
            <input className="popup__input popup__input_place_login" {...register("email", { required: "Email is requird", pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i, message: "Invalid email address" }})} placeholder="Enter email"/>
            <p className="popup__error-text popup__error-text_place_login">{errors.email && errors.email.message}</p>

            <label className="popup__form-field">Password</label>
            <input className="popup__input popup__input_place_login" type="password" {...register("password", { required: "Password is requird" })} placeholder="Enter password"/>
            <p className="popup__error-text popup__error-text_place_login">{errors.password && errors.password.message}</p>

            <p className="popup__error-text popup__error-text_place_center">{submitError}</p>
        </PopupWithForm>


    );
}

export default Login;
