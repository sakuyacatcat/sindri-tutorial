import dotenv from "dotenv";
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
  console.log(proof);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
