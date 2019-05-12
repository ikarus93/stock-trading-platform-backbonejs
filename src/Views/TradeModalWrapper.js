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
    },

    events: {
        "click .loadBuy": "showBuyModal",
        "click .loadSell": "showSellModal"
    },


    showBuyModal() {
        this.getChildView("tradeOut") && this.getChildView("tradeOut").destroy();
        this.showChildView("tradeIn", new TradeModal({ model: new BuyRequest({}) }))
    },
    showSellModal() {
        this.getChildView("tradeIn") && this.getChildView("tradeIn").destroy();
        this.showChildView("tradeOut", new TradeModal({ model: new SellRequest({}) }))
    },

})