import { readFileSync } from "fs";
import { dirname, join } from "path";
import { groth16 } from "snarkjs";
import { fileURLToPath } from "url";

async function main() {
  const dirName = dirname(fileURLToPath(import.meta.url));

  const vk = JSON.parse(
    readFileSync(join(dirName, "../../out/verification_key.json"), "utf8")
  );
  const publicSignals = JSON.parse(
    readFileSync(join(dirName, "../../out/public.json"), "utf8")
  );
  const proof = JSON.parse(
    readFileSync(join(dirName, "../../out/proof.json"), "utf8")
  );
  const isValid = await groth16.verify(vk, publicSignals, proof);
  console.log(`The proof is ${isValid ? "valid" : "invalid"}`);
  return;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
