const path = require("path");
const fs = require("fs");
const http = require("http");
const express = require("express");
const compression = require("compression");
const app = express();
const server = http.createServer(app);
const cwd = process.cwd();

const dir = cwd.split("\\").pop();

if (dir.indexOf("website-") !== 0 && dir.indexOf("template-") !== 0) {
    console.error(`Server can be launched only from the following directories:\n1. website-*\n2. templates/template-*`);
    return;
}
const build_dir = path.join(cwd, "build");
const index_file = path.join(build_dir, "index.html");
if (!fs.existsSync(index_file)) {
    console.log(`Error: ${index_file} does not exist.`);
    return;
}

console.log(index_file);
const html = fs.readFileSync(index_file, "utf8");

app.use(compression());
app.use(express.static(build_dir));
app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: Googlebot\nDisallow: /nogooglebot/\nUser-agent: *\nAllow: /");
});

app.get("/category/:alias", (req, res) => {
    res.send(html.replace(`<!--hiddenguid-->`, `<input type="hidden" value="category" id="hidGuid">`));
});
app.get("/product/:name/:code", (req, res) => {
    const { name } = req.params;
    if (name === "search") {
        res.send(html);
    } else {
        res.send(html.replace(`<!--hiddenguid-->`, `<input type="hidden" value="product" id="hidGuid">`));
    }
});
app.get("/*", (req, res) => {
    res.send(html);
});

server.listen(0, () => {
    console.log(`Listening on port ${server.address().port}`);
    console.log(`Local:   http://localhost:${server.address().port}/`);
});

// var args = process.argv;
// // console.log(args);
// console.log(process.cwd())
