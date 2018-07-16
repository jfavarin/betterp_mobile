var http = require("http");

exports.register = function (user){
    return new Promise((resolve, reject) => {
        logout()
            .then(() => {
                console.log("chegou no then");
                signup(user.email, user.password)
                    .then(resolve)
                    .catch((error) => { handleErrors(error); reject(); })
            })
            .catch((error) => { console.log("foi rejeitado"); handleErrors(error); reject(); })
    });
};

function logout(){
    console.log("logout");
}


function signup (email, password){
    console.log(email);
    console.log(password);
    http.request({
        url: "https://betterp-favarin.c9users.io/user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            email: email,
            senha: password
        })
    }).then((response) => {
        const result = response.content.toJSON();
        console.log(result);
    }, (e) => {
        console.log(e);
        done(e);
    });
}

function handleErrors(error) {
    console.error(error.message);
}