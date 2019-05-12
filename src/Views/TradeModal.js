import _ from "underscore";
import { View } from 'backbone.marionette';

//Channels
import { mainChannel } from "../Radio/channels";

//Views
import ErrorView from "./ErrorView";

export default View.extend({
    //Modal to trade stocks
    template: _.template(document.querySelector("#trade-modal-temp").innerHTML),
    events: {
        "click .trade__modal__btn": "makeRequest"
    },

    regions: {
        "error": ".trade__modal__error"
    },

    makeRequest() {
        //Makes request to backend for trading stock
        let [stock, amount] = [document.querySelector(".trade__modal__stock").value, document.querySelector(".trade__modal__amount").value]
        this.model.set("stock", stock);
        this.model.set("amount", amount);
        this.model.set("id", localStorage.getItem("id"))
        this.model.save({}, {
            error: (_, err) => {
                this.showChildView('error', new ErrorView({ message: err.responseJSON.message }));
            },
            success: (_, res) => {
                if (this.getChildView("error")) this.getChildView('error').destroy();
                mainChannel.trigger("update:table", res.updated);
            }
        })
    }
})