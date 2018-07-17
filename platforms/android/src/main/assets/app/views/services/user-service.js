var http = require("http");

function handleErrors(error) {
    console.error(error.message);
};

// exports.register = function (args){
//     return new Promise((resolve, reject) => {
//         if(args === ""){
//             reject(new Error('vazio'));
//         } else {
//             resolve(console.log(JSON.stringify(args)));
//         }
//     })
// };
exports.register = function (user){
    return new Promise((resolve, reject) => {
        signup(user)
            .then(resolve)
            .catch((error) => { handleErrors(error); reject(); })
    })
};

function signup(user){
    http.request({
        url: "https://betterp-favarin.c9users.io/user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(user)
    }).then((response) => {
        const result = response.content.toJSON();
        console.log(JSON.stringify(result));
    }, (e) => {
        console.log(e);
    })
};