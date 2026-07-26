const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const reactBuild = path.join(projectRoot, "build");
const sitesBuild = path.join(projectRoot, "dist");
const clientBuild = path.join(sitesBuild, "client");
const serverBuild = path.join(sitesBuild, "server");

if (!fs.existsSync(path.join(reactBuild, "index.html"))) {
    throw new Error("The React production build is missing.");
}

fs.rmSync(sitesBuild, { recursive: true, force: true });
fs.mkdirSync(serverBuild, { recursive: true });
fs.cpSync(reactBuild, clientBuild, { recursive: true });

const workerSource = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const fallbackUrl = new URL(request.url);
    fallbackUrl.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(fallbackUrl, request));
  },
};

export default worker;
`;

fs.writeFileSync(path.join(serverBuild, "index.js"), workerSource);
