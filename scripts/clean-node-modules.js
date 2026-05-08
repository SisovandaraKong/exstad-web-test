const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const nodeModules = path.join(root, "node_modules");

function removeFolder(folder) {
  if (!fs.existsSync(folder)) return;
  console.log("Removing", folder);

  const rimraf = require("fs-rimraf") || require("rimraf");
  // try to use rimraf if available
  try {
    const rimrafSync = require("rimraf").sync;
    rimrafSync(folder);
    console.log("Removed", folder);
  } catch (err) {
    // fallback: recursive rm
    try {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log("Removed", folder);
    } catch (e) {
      console.error("Failed to remove", folder, e);
      process.exit(1);
    }
  }
}

removeFolder(nodeModules);
process.exit(0);
