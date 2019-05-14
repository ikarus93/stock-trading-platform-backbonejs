import _ from "underscore";
import { Application, MnObject } from 'backbone.marionette';
import { history } from "backbone";
import AppRouter from "marionette.approuter";
import "./main.scss"

//Channels
import { authChannel, mainChannel } from "./Radio/channels"

//Collections
import NavCollection from "./Collections/NavCollection";
import StockSymbolCollection from "./Collections/StockSymbolCollection.js";

//Models
import User from "./Models/User";
import NavItem from "./Models/NavItem"
import { AuthRequest } from "./Models/AuthRequests"
import { LoadStocksRequest } from "./Models/TradeRequests"

//Views
import MainView from "./Views/MainView";

const MyApp = Application.extend({
    region: '#output',
    initialize() {
        _.bindAll(this, "updateUser");
        //Instantiate navigation collection for NavView component
        this.navCollection = new NavCollection([new NavItem({ href: "/", name: "Home" }), new NavItem({ href: "/#login", name: "Login" })]);
        // instantiate Main App view and keep reference to it in appview property
        this.appView = new MainView({ navCollection: this.navCollection });


        this.authenticateUser();
        this.loadStockNames();

        authChannel.on("update:user", this.updateUser); //listens to login/register validation
    },

    onStart() {
        history.start();

        this.showView(this.appView); //render main view
    },

    loadStockNames() {
        //Loads an array of all available stocks to trade and saves them in a StockSymbolCollection (for autocomplete and request validation purposes)
        let request = new LoadStocksRequest({});
        request.fetch({
            error: (_, err) => {
                console.log(err)
            },
            success: (_, res) => {
                this.allStockNames = new StockSymbolCollection(res);
            }
        })
    },

    updateUser(user) {
        //updates user global and sets user id in local storage, also sets global for stocks owned currently by user
        this.user = new User(user);
        localStorage.setItem("id", user.id)
        console.log("USER", user)
        //as user is authenticated, remove login/register from navbar and instead add link to logout button
        this.navCollection.pop();
        this.navCollection.add(new NavItem({ href: "/#logout", name: "Logout" }))
        history.navigate("/private", { trigger: true });
    },

    authenticateUser() {
        //authenticates user on pageload if token exists and is valid, else deletes token and user reference from local storage
        let token = localStorage.getItem("token");
        if (token) {
            let request = new AuthRequest();
            request.fetch({
                headers: { 'x-auth-token': token },
                error: (_, err) => this.clearUserCache(),
                success: (_, res) => this.updateUser(res)
            })
        }
    },

    clearUserCache() {
        //deletes token and user reference from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("id")
        this.user = null;
        this.stocksOwned = null;
        history.navigate("/", { trigger: true })
        history.loadUrl();
    },

    logoutUser() {
        //logsout user
        this.clearUserCache()
    }
});





const myApp = new MyApp();
myApp.start();


const routesController = MnObject.extend({
    initialize() {
        this.mainView = myApp.appView;
    },
    loadLoginModal() {
        //Loads login/register modal
        this.mainView.showLoginModal();
    },
    loadPrivateRoute() {
        //if user is authenticated show private area/user area
        if (myApp.user) {
            this.mainView.showUserArea(myApp.user);
        }

    },

    logoutUser() {
        myApp.logoutUser();
    }
});

const MyRouter = new AppRouter({
    controller: new routesController(),
    appRoutes: {
        "login": "loadLoginModal",
        "private": "loadPrivateRoute",
        "logout": "logoutUser"
    }
});

