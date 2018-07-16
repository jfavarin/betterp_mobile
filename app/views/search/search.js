var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var searchBarModule = require("ui/search-bar");
var geolocation = require("nativescript-geolocation");
var frameModule = require("ui/frame");
var applicationSettings = require("application-settings");
var http = require("http");

var products = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var searchBar = new searchBarModule.SearchBar();
var page;

exports.onPageLoaded = function(args) {
   page = args.object;
   pageData.set("productSearch", "");
   pageData.set("products", products);
   page.bindingContext = pageData;
   
    if (applicationSettings.hasKey("radiusSearch")==false) {
        applicationSettings.setNumber("radiusSearch", 2000);
        console.log(applicationSettings.getNumber("radiusSearch"));        
    } else {
        console.log(applicationSettings.getNumber("radiusSearch"));
    }

    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}

exports.getProductsSearch = function (args) {
    var serverUrl = "https://better-p-favarin.c9users.io/product";
    // var serverUrl = "https://testapi-favarin.c9users.io/product";
    var productName = pageData.get("productSearch");
    //var apiKey = "j4G-jf8sQKdVapffrBa8xJO3uWKB6CoA";
    viewModule.getViewById(page,"productSearch").dismissSoftInput();

    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(loc) {
        if (loc) {
            var radiusSearch = applicationSettings.getNumber("radiusSearch")
            console.log(serverUrl + "?name=" + encodeURIComponent(productName) + "&lat=" + loc.latitude + "&long=" + loc.longitude + "&rad=" + radiusSearch);
            http.getJSON(serverUrl + "?name=" + encodeURIComponent(productName) + "&lat=" + loc.latitude + "&long=" + loc.longitude + "&rad=" + radiusSearch).then(function (r){
                    console.log(r);
                    for(var i=0; i<r.length; i++){
                        products.push(r[i]);
                    }
            }, function (e) {
                    console.log(e);
                    done(e);
            });
        }
    }, function(e){
        console.log("Error: " + e.message);
    });
}

exports.clearProductsSearch = function (args) {
    pageData.set("productSearch", "");
    products.splice(0,products.length);
}

exports.config = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/config/config");
};