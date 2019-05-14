import _ from "underscore";
import { View } from 'backbone.marionette';

//Views
import StockTable from "./StockTable";
import TradeModalWrapper from "./TradeModalWrapper";

export default View.extend({
    //Private component for logged in user, containg table of stocks owned and trading opportunities
    template: _.template(document.getElementById("user-area-temp").innerHTML),
    regions: {
        stockTable: "#stock-table-region",
        tradeModal: "#trade-modal-region"
    },

    events: {
        "click .tradeBtn": "loadTradeModalWrapper"
    },

    initialize(options) {
        this.stockCollection = this.model.get("stocksOwned");
    },

    onRender() {
        this.showChildView("stockTable", new StockTable({ collection: this.model.get("stocksOwned") }))
    },

    loadTradeModalWrapper() {
        this.showChildView("tradeModal", new TradeModalWrapper({}));
    }
})