const { execSync } = require('child_process');

const folders = {};
const staged = execSync(`git diff --name-only --cached`).toString().trim().split("\n");

const deleted = execSync(`git diff --diff-filter=d --name-only --cached`).toString().trim().split("\n");

const buildDirs = ["website-"];

const dirsToCheck = ["common", "templates/template-", "website-"];
const filterStaged = staged.filter(file => dirsToCheck.some(d => file.indexOf(d) === 0));

filterStaged.forEach(f => {
    let folder = f.split("/")[0];
    let filePath = f.replace(`${folder}/`, "")
    if (folders[folder] === undefined) {
        folders[folder] = [];
    }
    folders[folder].push({ path: filePath, deleted: !deleted.includes(f) })
});
console.log("Changes\n", folders);


let allowed = ["js", "ts", "jsx", "tsx"];
const errors = [];
Object.keys(folders).sort().forEach(folder => {
    let files = folders[folder].filter(x => allowed.includes(x.path.split(".").pop())).filter(x => !x.deleted).map(x => x.path);
    // console.log("allowed", files);

    if (files.length > 0) {
        try {
            const command = `cd ${folder} && npx eslint --cache ${files.join(" ")}`;
            console.log(command);
            execSync(command).toString();
        } catch (err) {
            errors.push(err.stdout);
            // [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr' ]
        }
    }
});

if (errors.length > 0) {
    throw new Error(errors)
} else {
    console.log("Lint passed.");

    const filteredFolders = Object.keys(folders).filter(f => buildDirs.some(b => f.indexOf(b) === 0));
    filteredFolders.forEach(dir => {
        if (folders[dir] !== undefined) {
            try {
                const command = `cd ${dir} && yarn build`;
                console.log(command);
                let buildOutput = execSync(command).toString();
                console.log(buildOutput);
            } catch (err) {
                throw new Error(err.stdout);
            }
        }
    })
}