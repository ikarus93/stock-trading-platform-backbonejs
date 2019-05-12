import _ from "underscore";
import { View } from 'backbone.marionette';

//Channels
import { authChannel } from "../Radio/channels"

//Views
import ErrorView from "./ErrorView"

export default View.extend({
    //View that loads a form/modal for login and register requests
    template: _.template(document.querySelector("#auth-modal-temp").innerHTML),
    events: {
        "click .auth__modal__btn": "makeRequest"
    },


    regions: {
        "error": ".auth__modal__error"
    },

    makeRequest() {
        //Makes dynamic request based on type of model tied to instance of this view(login and register requests need different parameters)
        let [pw, email] = [document.querySelector(".auth__modal__pw").value, document.querySelector(".auth__modal__email").value]
        this.model.set("pw", pw);
        this.model.set("email", email);
        if (this.model.get("type") === "register") {
            let name = document.querySelector(".auth__modal__name").value;
            this.model.set("name", name);
        }
        this.model.save({}, {
            error: (_, err) => {
                this.showChildView('error', new ErrorView({ message: err.responseJSON.message }));
            },
            success: (_, res) => {
                if (this.getChildView("error")) this.getChildView('error').destroy();
                localStorage.setItem("token", res.token);
                authChannel.trigger("update:user", res.user);
            }
        })
    }
})