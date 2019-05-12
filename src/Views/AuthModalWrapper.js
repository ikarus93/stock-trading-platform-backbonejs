import _ from "underscore";
import { View } from 'backbone.marionette';


//Models
import { RegisterRequest, LoginRequest } from "../Models/AuthRequests";

//Views
import AuthModal from "./AuthModal"


export default View.extend({
    //Wrapper for AuthModal to enable nav tab navigation (this view is the actual modal)
    template: _.template(document.querySelector("#auth-modal-wrapper-temp").innerHTML),
    regions: {
        loginForm: "#login-form",
        registerForm: "#register-form"
    },

    initialize() {
        _.bindAll(this, "showLoginModal", "showRegisterModal");
        this.showChildView("loginForm", new AuthModal({ type: "login", model: new LoginRequest({}) }))


    },

    events: {
        "click .loadLogin": "showLoginModal",
        "click .loadRegister": "showRegisterModal"
    },

    toggleActiveClass(target) {
        if (!target.classList.contains("active-auth-link")) {
            document.querySelector(".active-auth-link").classList.remove("active-auth-link");
            target.classList.add("active-auth-link");
        }

    },

    showLoginModal(e) {
        this.toggleActiveClass(e.target)
        this.getChildView("registerForm") && this.getChildView("registerForm").destroy();
        this.showChildView("loginForm", new AuthModal({ type: "login", model: new LoginRequest({}) }))
    },
    showRegisterModal(e) {
        this.toggleActiveClass(e.target);
        this.getChildView("loginForm") && this.getChildView("loginForm").destroy();
        this.showChildView("registerForm", new AuthModal({ type: "register", model: new RegisterRequest({}) }))
    },

})