const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");
const userService = require("../services/user-service");
const topmost = require("ui/frame").topmost;

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        email: "",
        password: "",
        nomecompleto: "",
        cpf: "",
        isLoggingIn: true,
        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;
        },
        submit() {
            if (this.email.trim() === "" || this.password.trim() === "") {
                alert("Please provide both an email address and password.");
                return;
            }

            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },
        register() {
            userService.register({
                email: this.email,
                senha: this.password
            }).then(() => {
                    alert("Your account was successfully created. You can now login.");
                    this.isLoggingIn = true;
                })
                .catch((err) => {
                    alert("Unfortunately we were unable to create your account.");
                    console.log(err);
                });
        },
    });

    return viewModel;
}

module.exports = LoginViewModel;
