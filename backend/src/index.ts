import { fileURLToPath } from "url";

function main() {
  console.log("Hello World");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
