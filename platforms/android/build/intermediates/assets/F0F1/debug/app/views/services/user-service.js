var http = require("http");

exports.register = function (user){
    console.log(user.email);
    console.log(user.password);
    http.request({
        url: "https://betterp-favarin.c9users.io/user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            email: user.email,
            senha: user.password
        })
    }).then((response) => {
        const result = response.content.toJSON();
        console.log(result);
    }, (e) => {
        console.log(e);
        done(e);
    });
};