// import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
// import { Noir } from "@noir-lang/noir_js";
// import { CompiledCircuit } from "@noir-lang/types/lib/esm/types";
// import { readFileSync } from "fs";
// import { join } from "path";
// import { fileURLToPath } from "url";
// import circuit from "../../../circuit-noir/target/circuit_noir.json" assert { type: "json" };

// function hexStringToUint8Array(hexString: string): Uint8Array {
//   if (hexString.length % 2 !== 0) {
//     throw new Error("不正な16進数文字列です。");
//   }

//   const bytes = new Uint8Array(hexString.length / 2);

//   for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
//     bytes[j] = parseInt(hexString.substring(i, i + 2), 16);
//   }

//   return bytes;
// }

// async function main() {
//   const circuitJson = circuit as CompiledCircuit;
//   const backend = new BarretenbergBackend(circuitJson);
//   const noir = new Noir(circuitJson, backend);

//   const proofString = JSON.parse(
//     readFileSync(join(process.cwd(), "out/noir-proof.json"), "utf8")
//   );

//   const proofBytes = hexStringToUint8Array(proofString.proof);

//   const proofData = {
//     publicInputs: proofString.publicInputs,
//     proof: proofBytes,
//   };

//     const input = { input: 20 };
//     console.log("logs", "Generating proof... ⌛");
//     const proof = await noir.generateFinalProof(input);
//     console.log("logs", "Generating proof... ✅");
//     console.log("results", proof.proof);
//     console.log("logs", "Verifying proof... ⌛");
//     const verification = await noir.verifyFinalProof(proof);
//     if (verification) console.log("logs", "Verifying proof... ✅");
// }

// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   main();
// }
