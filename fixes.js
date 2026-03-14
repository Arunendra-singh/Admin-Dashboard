const fs = require("fs");

fs.readdirSync("common/hooks/react/api/").forEach((file) => {
    let path = `common/hooks/react/api/${file}`;
    let data = fs.readFileSync(path, "utf8");
    fs.writeFileSync(path, data.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n"));
    console.log(file);
});
console.log("done");
