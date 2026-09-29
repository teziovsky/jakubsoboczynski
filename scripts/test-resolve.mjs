// Lets `node --test` load TypeScript from src/: maps `@/` to src/ and adds the
// `.ts` extension that Vite infers for extensionless imports.
import { existsSync, statSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";

const src = new URL("../src/", import.meta.url);

function isFile(url) {
  const path = fileURLToPath(url);
  return existsSync(path) && statSync(path).isFile();
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    const aliased = specifier.startsWith("@/");
    const relative = specifier.startsWith("./") || specifier.startsWith("../");
    if (!aliased && !relative) return nextResolve(specifier, context);

    const url = aliased ? new URL(specifier.slice(2), src) : new URL(specifier, context.parentURL);
    if (!isFile(url)) {
      for (const suffix of [".ts", "/index.ts"]) {
        const candidate = new URL(`${url.href}${suffix}`);
        if (isFile(candidate)) return nextResolve(candidate.href, context);
      }
    }
    return nextResolve(url.href, context);
  },
});
