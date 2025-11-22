import fs from "fs";
import path from "path";

const modulesPath = path.join(__dirname, "../../app/modules");

export const schema: Record<string, any> = {};

for (const moduleFolder of fs.readdirSync(modulesPath)) {
  const schemaFile = path.join(
    modulesPath,
    moduleFolder,
    `${moduleFolder}.schema.ts`
  );

  if (fs.existsSync(schemaFile)) {
    const mod = require(schemaFile);
    Object.assign(schema, mod);
  }
}
