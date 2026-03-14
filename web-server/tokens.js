const fs = require("fs");
const http = require("https");
const path = require("path");
const env = process.argv[2] ?? "";
const cwd = process.cwd();
const dir = cwd.split("\\").pop();
const subDir = dir.indexOf("web-server") === 0 ? "" : "public/js";
const targetDir = path.join(cwd, subDir);
const filePath = path.join(targetDir, "web-ms-tokens.js");
console.log(filePath);
fs.mkdirSync(targetDir, { recursive: true });

const run = async () => {
    const url = env !== "beta" ? "https://demo.ewizsaas.com/home/healthcheckall" : "https://beta.ewizsaas.com/home/healthcheckall";
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
            const fileData =
                "window.tokens = " +
                JSON.stringify(arr, null, 4)
                    .replace(/\"SaaS_/g, "SaaS_")
                    .replace(/_Token\"/g, "_Token") +
                ";";
            fs.writeFileSync(filePath, fileData.replace(/\n/g, "\r\n") + "\r\n");
        });
    }).on("error", function (err) {
        console.log(err);
    });
};
run();
