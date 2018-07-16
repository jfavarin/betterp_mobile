const frameModule = require("ui/frame");
const LoginViewModel = require("./loginview");

const loginViewModel = new LoginViewModel();

exports.pageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = loginViewModel;
}
