import _ from "underscore";
import { View } from 'backbone.marionette';

//Views
import NavView from "./NavView";
import AuthModalWrapper from "./AuthModalWrapper"
import UserArea from "./UserArea"

export default View.extend({
    //Root View of application
    template: _.template(document.querySelector("#main-temp").innerHTML),
    regions: {
        nav: "#nav-view",
        content: "#content-view"
    },

    initialize(options) {
        this.navCollection = options.navCollection;
    },

    onRender() {
        this.showChildView('nav', new NavView({ collection: this.navCollection }));
    },

    showLoginModal() {
        this.showChildView("content", new AuthModalWrapper({}))
    },

    showUserArea(user) {
        this.showChildView("content", new UserArea({ model: user }))
    }
})