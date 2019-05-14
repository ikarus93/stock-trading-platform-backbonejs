import _ from "underscore";
import { View } from 'backbone.marionette';

//Models
import { BuyRequest, SellRequest } from "../Models/TradeRequests";

//Views
import TradeModal from "./TradeModal"

export default View.extend({
    //Wrapper for trade modal to enable dynamic rendering of each form
    template: _.template(document.querySelector("#trade-modal-wrapper-temp").innerHTML),
    regions: {
        tradeIn: "#buy-form",
        tradeOut: "#sell-form"
    },

    initialize() {
        _.bindAll(this, "showBuyModal", "showSellModal");
        this.showChildView("tradeIn", new TradeModal({ model: new BuyRequest({}) }))
    },

    events: {
        "click .loadBuy": "showBuyModal",
        "click .loadSell": "showSellModal",
        "click .trade-modal-container--active": "closeModal"
    },

    closeModal(e) {
        if (e.target.classList.contains("trade-modal-container")) {
            e.target.classList.remove("trade-modal-container--active");
            this.destroy();
        }

    },

    toggleActiveClass(target) {

        //add active modifier to parent class for div overlay

        if (!target.classList.contains("active-trade-link")) {
            document.querySelector(".active-trade-link").classList.remove("active-trade-link");
            target.classList.add("active-trade-link");
        }

    },


    showBuyModal(e) {
        this.toggleActiveClass(e.target)
        this.getChildView("tradeOut") && this.getChildView("tradeOut").destroy();
        this.showChildView("tradeIn", new TradeModal({ model: new BuyRequest({}) }))
    },
    showSellModal(e) {
        this.toggleActiveClass(e.target)
        this.getChildView("tradeIn") && this.getChildView("tradeIn").destroy();
        this.showChildView("tradeOut", new TradeModal({ model: new SellRequest({}) }))
    },

})