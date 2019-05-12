import { Model } from "backbone";

export const BuyRequest = Model.extend({
    url: "http://localhost:8082/api/stocks/buy",
    defaults: {
        type: "buy"
    }
});

export const SellRequest = Model.extend({
    url: "http://localhost:8082/api/stocks/sell",
    defaults: {
        type: "trade"
    }
});

export const LoadStocksRequest = Model.extend({
    url: "http://localhost:8082/api/stocks/all",

});