import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { CompiledCircuit, ProofData } from "@noir-lang/types/lib/esm/types";
import { fileURLToPath } from "url";
import circuit from "../../../circuit-noir/target/circuit_noir.json" assert { type: "json" };

type ProofInput = {
  input: number;
};

function initNoirClient() {
  const circuitJson = circuit as CompiledCircuit;
  const backend = new BarretenbergBackend(circuitJson);
  const noir = new Noir(circuitJson, backend);
  return noir;
}

async function getProof(noir: Noir, input: ProofInput): Promise<ProofData> {
  console.log("logs", "Generating proof... ⌛");
  const proof = await noir.generateFinalProof(input);
  console.log("logs", "Generating proof... ✅");
  console.log("results", proof.proof);
  return proof;
}

async function verifyProof(noir: Noir, proof: ProofData): Promise<boolean> {
  console.log("logs", "Verifying proof... ⌛");
  const verification = await noir.verifyFinalProof(proof);
  return verification;
}

async function main() {
  const client = initNoirClient();
  const input = { input: 20 };
  const proof = await getProof(client, input);
  const verification = await verifyProof(client, proof);
  if (verification) console.log("logs", "Verifying proof... ✅");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
