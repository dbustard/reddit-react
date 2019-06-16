const stage = process.env.STAGE || "dev";
const config = require(`./config.${stage}`).default;

export default config;