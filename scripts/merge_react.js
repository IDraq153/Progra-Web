import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "merged_react.txt");

// Carpetas de la app React
const FOLDERS = [
    "src"
];

// Extensiones que se incluyen
const EXTENSIONS = [".js", ".jsx", ".css"];

// Archivos que se omiten (copias de respaldo)
const SKIP = (name) => name.toLowerCase().includes(" copy");

let result = "";
let count = 0;

function collect(folder) {
    const fullPath = path.join(ROOT, folder);

    if (!fs.existsSync(fullPath)) {
        console.warn(`Carpeta no encontrada: ${folder}`);
        return;
    }

    const entries = fs
        .readdirSync(fullPath, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
        const entryPath = path.join(fullPath, entry.name);

        if (entry.isDirectory()) {
            collect(path.relative(ROOT, entryPath));
        } else if (
            entry.isFile() &&
            EXTENSIONS.includes(path.extname(entry.name).toLowerCase()) &&
            !SKIP(entry.name)
        ) {
            const content = fs.readFileSync(entryPath, "utf8");

            result += `
==================================================
ARCHIVO: ${path.relative(ROOT, entryPath)}
==================================================

${content}

`;
            count++;
        }
    }
}

for (const folder of FOLDERS) {
    collect(folder);
}

fs.writeFileSync(OUTPUT, result, "utf8");

console.log("==================================");
console.log(`Archivos React unidos: ${count} (js, jsx, css)`);
console.log(`Archivo generado: ${OUTPUT}`);
console.log("==================================");
