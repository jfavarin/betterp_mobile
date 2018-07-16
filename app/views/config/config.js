var observableModule = require("data/observable");
var applicationSettings = require("application-settings");

var pageData = new observableModule.Observable();
var page;

exports.onPageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
}

exports.saveButton = function(args){
    var radius = Number(pageData.get("radius"));
    applicationSettings.setNumber("radiusSearch", radius);
    console.log(applicationSettings.getNumber("radiusSearch"));
}