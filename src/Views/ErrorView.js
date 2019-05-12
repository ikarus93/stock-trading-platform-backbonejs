import _ from "underscore";
import { View } from 'backbone.marionette';

//Models
import Error from "../Models/Error"


export default View.extend({
    //Renders error message
    template: _.template("<p><%= message %></p>"),
    model: new Error(),
    initialize(options) {
        this.model.set("message", options.message)
    }
});