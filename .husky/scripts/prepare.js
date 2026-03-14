const isCi = process.env.PWD?.indexOf("b2b-monorepo-deployment/ewizsaas-") > -1;
if (!isCi) {
    // console.log(JSON.stringify(process.env, null, 4));
    require("husky").install();
} else {
    console.log(`CI detected. Skip installing husky hooks.`);
}
