import dotenv from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";
import sindri from "sindri";
import { fileURLToPath } from "url";

const rootDir = process.cwd();
dotenv.config({ path: join(rootDir, ".env") });

async function main() {
  sindri.authorize({ apiKey: process.env.SINDRI_API_KEY });
  const proof = await sindri.proveCircuit(
    process.env.SINDRI_NOIR_CIRCUIT_ID || "",
    "input = 20"
  );

  const outDir = join(rootDir, "out");
  writeFileSync(
    join(outDir, "noir-proof.json"),
    JSON.stringify(proof.proof, null, 2)
  );
  writeFileSync(
    join(outDir, "Verifier.toml"),
    JSON.stringify(proof.public["Verifier.toml"], null, 2)
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
