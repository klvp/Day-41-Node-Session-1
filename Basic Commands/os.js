/** @format */

const os = require("os");
console.log(`Total RAM `, os.totalmem() / Math.pow(1024, 3), "GB");
console.log(`Free RAM `, os.freemem() / Math.pow(1024, 3), "GB");
console.log(`OS version `, os.version());
console.log(`CPUs `, os.cpus());
