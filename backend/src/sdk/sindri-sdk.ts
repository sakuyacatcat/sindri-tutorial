import dotenv from "dotenv";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import sindri from "sindri";
import { fileURLToPath } from "url";

const dirName = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(dirName, "../../.env") });

async function main() {
  sindri.authorize({ apiKey: process.env.SINDRI_API_KEY });
  const proof = await sindri.proveCircuit(
    process.env.SINDRI_CIRCUIT_ID || "",
    '{"X":1,"Y":1}'
  );
  const outDir = join(dirName, "../../out");
  writeFileSync(
    join(outDir, "verification_key.json"),
    JSON.stringify(proof.verification_key)
  );
  writeFileSync(
    join(outDir, "proof.json"),
    JSON.stringify(proof.proof, null, 2)
  );
  writeFileSync(
    join(outDir, "public.json"),
    JSON.stringify(proof.public, null, 2)
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
