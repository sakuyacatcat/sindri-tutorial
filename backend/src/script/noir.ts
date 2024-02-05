import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { CompiledCircuit, ProofData } from "@noir-lang/types/lib/esm/types";
import { fileURLToPath } from "url";
import circuit from "../../../circuit-noir/target/circuit_noir.json" assert { type: "json" };

type ProofInput = {
  input: number;
};

class NoirClient {
  private noir: Noir;

  constructor(circuitJson: CompiledCircuit) {
    const backend = new BarretenbergBackend(circuitJson);
    this.noir = new Noir(circuitJson, backend);
  }

  async generateProof(input: ProofInput): Promise<ProofData> {
    console.log("logs", "Generating proof... ⌛");
    try {
      const proof = await this.noir.generateFinalProof(input);
      console.log("logs", "Generating proof... ✅");
      console.log("results", proof.proof);
      return proof;
    } catch (error) {
      console.error("Error generating proof", error);
      throw error;
    }
  }

  async verifyProof(proof: ProofData): Promise<boolean> {
    console.log("logs", "Verifying proof... ⌛");
    try {
      const verification = await this.noir.verifyFinalProof(proof);
      if (verification) console.log("logs", "Verifying proof... ✅");
      return verification;
    } catch (error) {
      console.error("Error verifying proof", error);
      throw error;
    }
  }
}

async function main() {
  try {
    const client = new NoirClient(circuit as CompiledCircuit);
    const input = { input: 20 };
    const proof = await client.generateProof(input);
    const verification = await client.verifyProof(proof);
    if (verification) {
      console.log("Proof verified successfully");
    }
  } catch (error) {
    console.error("An error occurred in main function", error);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
