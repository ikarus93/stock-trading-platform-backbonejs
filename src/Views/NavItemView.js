import _ from "underscore";
import { View } from 'backbone.marionette';

export default View.extend({
    //Single Item /link in navbar
    template: _.template("<li><a href='<%= href %>'><%= name %></a></li>")
})