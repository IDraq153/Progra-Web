
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "merged_code.txt");

const FOLDERS = [
    "api",
    "admin",
    "configs",
    "website"
];

let result = "";

function collectJS(folder) {
    const fullPath = path.join(ROOT, folder);

    if (!fs.existsSync(fullPath)) {
        console.warn(`Carpeta no encontrada: ${folder}`);
        return;
    }

    const entries = fs.readdirSync(fullPath, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const entryPath = path.join(fullPath, entry.name);

        if (entry.isDirectory()) {
            collectJS(path.relative(ROOT, entryPath));
        } else if (
            entry.isFile() &&
            entry.name.toLowerCase().endsWith(".js")
        ) {
            const content = fs.readFileSync(entryPath, "utf8");

            result += `
==================================================
ARCHIVO: ${path.relative(ROOT, entryPath)}
==================================================

${content}

`;
        }
    }
}

for (const folder of FOLDERS) {
    collectJS(folder);
}

fs.writeFileSync(OUTPUT, result, "utf8");

console.log("==================================");
console.log("Archivos JS unidos correctamente");
console.log(`Archivo generado: ${OUTPUT}`);
console.log("==================================");
