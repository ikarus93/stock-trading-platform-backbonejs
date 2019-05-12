import { Model } from "backbone";
import $ from "jquery"

export const RegisterRequest = Model.extend({
    url: "http://localhost:8082/api/auth/register",
    defaults: {
        type: "register"
    }
});

export const LoginRequest = Model.extend({
    url: "http://localhost:8082/api/auth/login",
    defaults: {
        type: "login"
    }
});

export const AuthRequest = Model.extend({
    url: "http://localhost:8082/api/auth/"
})