import _ from "underscore";
import { View } from 'backbone.marionette';

export default View.extend({
    //Single entry in stock table
    template: _.template("<tr><td><%= name %></td><td><%= amount %></td></tr>")
})