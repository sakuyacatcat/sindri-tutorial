import axios from "axios";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const dirName = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(dirName, "../.env") });

const API_KEY = process.env.SINDRI_API_KEY || "";
const API_URL_PREFIX = process.env.SINDRI_API_URL || "https://sindri.app/api/";

const API_VERSION = "v1";
const API_URL = API_URL_PREFIX.concat(API_VERSION);

const headersJson = {
  Accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function main() {
  const circuits = await axios.get(API_URL + "/circuit/list", {
    headers: headersJson,
    validateStatus: (status) => status === 200,
  });

  console.log(circuits.data);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
