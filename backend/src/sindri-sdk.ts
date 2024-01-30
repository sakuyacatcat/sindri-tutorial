import dotenv from "dotenv";
import { dirname, join } from "path";
import sindri from "sindri";
import { fileURLToPath } from "url";

const dirName = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(dirName, "../.env") });

async function main() {
  sindri.authorize({ apiKey: process.env.SINDRI_API_KEY });
  const circuit = await sindri.getCircuit(process.env.SINDRI_CIRCUIT_ID || "");
  console.log(circuit);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
