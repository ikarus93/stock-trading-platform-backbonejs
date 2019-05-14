import _ from "underscore";
import { CollectionView } from 'backbone.marionette';

//Channels
import { mainChannel } from "../Radio/channels";

//Collections
import StockCollection from "../Collections/StockCollection";

//Views
import StockItem from "./StockItem";

export default CollectionView.extend({
    //Renders table of stocks owned by user
    template: _.template(document.getElementById("stock-table-temp").innerHTML),
    initialize() {
        _.bindAll(this, "updateCollection");
        //If user did a trade this event will occur
        mainChannel.on("update:table", this.updateCollection);
        this.collection = new StockCollection(this.collection);

    },
    childView: StockItem,
    childViewContainer: ".stock-table",

    updateCollection(args) {
        //Updates stock collection on user trade
        this.collection = new StockCollection(args);
        this.render();
    }
})