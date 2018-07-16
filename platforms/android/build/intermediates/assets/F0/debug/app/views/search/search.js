var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var searchBarModule = require("ui/search-bar");
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

    // http.getJSON("https://testapi-favarin.c9users.io:8080/product").then(function (r){
    //     console.log(r)
    //     for(var i=0; i<r.length; i++){
    //         products.push(r[i]);
    //     }
    // }, function (e) {
    //         console.log(e);
    //         done(e);
    // });
}

exports.getProductsSearch = function (args) { //add "lat" and "long" when configure geolocation
    var serverUrl = "https://testapi-favarin.c9users.io/product";
    var productName = pageData.get("productSearch");
    //var apiKey = "j4G-jf8sQKdVapffrBa8xJO3uWKB6CoA";
    viewModule.getViewById(page,"productSearch").dismissSoftInput();
    console.log("está saindo " + productName);

    http.getJSON(serverUrl + "?name=" + productName).then(function (r){
        console.log(r);
        for(var i=0; i<r.length; i++){
            products.push(r[i]);
        }
    }, function (e) {
            console.log(e);
            done(e);
    });
}

exports.clearProductsSearch = function (args) {
    pageData.set("productSearch", "");
    for(var i=0; i<=products.length; i++){
        products.pop(products[i]);
    }
}