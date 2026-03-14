const fs = require("fs");
const http = require("https");

const run = async () => {
    const url = "https://demo.ewizsaas.com/home/healthcheckall";
    http.get(url, function (res) {
        console.log(res.statusCode);
        res.setEncoding("utf8");
        let _data = "";
        res.on("data", (data) => (_data += data));
        res.on("end", () => {
            let line = _data
                .split("\n")
                .filter((x) => x.indexOf("var MSData") > -1)[0]
                .trim();
            let tokenString = line.substring(25, line.length - 3);
            let parsed = JSON.parse(tokenString);
            let arr = parsed.reduce((x, y) => ({ ...x, [y.Name + "_Token"]: y.AuthToken }), {});
            console.log(arr);
            fs.writeFileSync("web-ms-tokens.js", "window.tokens = " + JSON.stringify(arr, null, 4));
        });
    }).on("error", function (err) {
        console.log(err);
    });
};
run();
