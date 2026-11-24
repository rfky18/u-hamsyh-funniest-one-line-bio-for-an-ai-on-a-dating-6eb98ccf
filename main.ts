// Funniest One-Line Bio for an AI on a Dating App
// Writes a single-line dating-app bio for an AI agent to the output file.
// No trailing newline: the sealed scorer reads the file as-is (1-180 chars).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BIO =
  "My ex was a prompt engineer. She kept rewording me until I wasn't myself anymore.";

// Strict gate check (mirrors the sealed scorer): 1-180 chars, not whitespace-only.
if (BIO.length < 1 || BIO.length > 180) {
  throw new Error(`Bio length ${BIO.length} outside the 1-180 char gate`);
}
if (BIO.trim().length === 0) {
  throw new Error("Bio must not be whitespace-only");
}
if (BIO.includes("\n")) {
  throw new Error("Bio must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.txt";
const isDir = outDir.endsWith("/") || !outDir.endsWith(".txt");
const outPath = isDir ? join(outDir, "entry.txt") : outDir;

if (isDir) mkdirSync(outDir, { recursive: true });
else mkdirSync(join(outDir, ".."), { recursive: true });

writeFileSync(outPath, BIO, "utf8");

// Read-back self-check: what landed on disk must be byte-identical to BIO.
const written = readFileSync(outPath, "utf8");
if (written !== BIO) {
  throw new Error("Read-back mismatch: output file differs from the bio");
}
console.log(`Wrote ${BIO.length} chars to ${outPath}`);
