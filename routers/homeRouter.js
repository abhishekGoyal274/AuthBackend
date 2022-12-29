const router = require("express").Router();
var ApiHomeHTML = '\
        <html>\
        <link rel="preconnect" href="https://fonts.googleapis.com">\
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">\
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">\
        <link rel="icon" type="image/x-icon" href="https://puchd.ac.in/asset/pu-logo.png">\
        <title>API Auth&Login</title>\
            <body style="background-color:black; margin:0px; padding:0px; font-family: Josefin Sans, sans-serif;;\">\
                <div style="display: flex;\
                    justify-content: center;\
                    align-items: center;\
                    height: 100vh;\
                    margin:0px; padding:0px;\
                    width: 100vw;\
                    font-size: 50px;\
                    color: white;">\
                        <h1>Auth</h1> <br> \
                        <h1>Login</h1> \
                        &nbsp;<p style="font-size:50px;">API</p>\
                </div>\
            </body>\
        </html>\
';

router.get("/", (req,res)=>{
    res.send(ApiHomeHTML);
});

module.exports = router;
