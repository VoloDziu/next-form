#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import { satisfies } from "compare-versions";
import * as z from "zod";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const libDependencies = {
  "react-hook-form": "^7.49.2",
};
const libDevDependencies = {
  tailwindcss: "^3.3.6",
};

async function main() {
  const packageJsonPath = path.join("package.json");
  let config: PackageJson;

  try {
    config = fs.readJSONSync(packageJsonPath);
  } catch {
    console.log(
      "This command must be ran in the root project folder (where your `package.json` is located)"
    );
    process.exit(1);
  }

  const messages: string[] = [];

  for (const [dependency, versionRange] of Object.entries(libDependencies)) {
    const version = config?.dependencies && config.dependencies[dependency];

    console.log(
      dependency,
      version,
      version && satisfies(version, versionRange)
    );

    if (!version || !satisfies(version, versionRange)) {
      messages.push(
        `This project requires ${dependency} of version ${versionRange}`
      );
    }
  }

  for (const [dependency, versionRange] of Object.entries(libDevDependencies)) {
    const version = config?.dependencies && config.dependencies[dependency];

    if (!version || !satisfies(version, versionRange)) {
      messages.push(
        `This project requires ${dependency} of version ${versionRange}`
      );
    }
  }

  if (messages.length > 0) {
    console.log(messages.join("\n"));
    console.log("Would you like to install the dependencies?");
  }

  // const packageInfo = await getPackageInfo();
  // console.log(packageInfo);

  // const config = await loadConfig();
  // console.log(config);

  const program = new Command().description(
    "add forms and dependencies to your project"
  );
  // .version(
  //   packageInfo.version || "0.0.1",
  //   "-v, --version",
  //   "display the version number"
  // );

  program.parse();
}

main();

// 1. find out if dependencies are installed
// 2. check versions of dependencies
// 3. offer to install or update dependencies
// 4. check TW config for prefix to set up classes
// 5. init TW if not initialized
