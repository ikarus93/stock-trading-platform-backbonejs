import _ from "underscore";
import { CollectionView } from 'backbone.marionette';

//Views
import NavItemView from "./NavItemView";

export default CollectionView.extend({
    //Actual list of nav items
    template: _.template(document.querySelector("#nav-temp").innerHTML),
    childView: NavItemView,
    childViewContainer: "#nav-list",

})