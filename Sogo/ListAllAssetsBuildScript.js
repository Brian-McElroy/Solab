const fs = require("fs");
const path = require("path");

const publicDir = "."; // Change to your website root folder if needed
const swPath = path.join(publicDir, "serviceWorker.js"); // or wherever your service worker file is

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      const relPath = "/" + path.relative(publicDir, filePath).replace(/\\/g, "/");
      if (!relPath.includes("serviceWorker.js") && !relPath.includes("node_modules")) {
        results.push(relPath);
      }
    }
  });

  return results;
};

const updateServiceWorker = () => {
  const files = walk(publicDir);
  const assetList = files.map(f => `  "${f}"`).join(",\n");

  const swContent = fs.readFileSync(swPath, "utf8");
  const newSwContent = swContent.replace(
    /const assets = \[[\s\S]*?\]/,
    `const assets = [\n${assetList}\n]`
  );

  fs.writeFileSync(swPath, newSwContent);
  console.log("✅ Service worker asset list updated.");
};

updateServiceWorker();