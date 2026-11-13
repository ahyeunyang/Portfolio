import fs from "node:fs";
import path from "node:path";

const variablesPath = "src/styles/_variables.scss";
const tokensPath = "src/styles/_tokens.scss";
let variables = fs.readFileSync(variablesPath, "utf8");
let tokens = fs.readFileSync(tokensPath, "utf8");
const existing = new Map();
const normalize = value => {
  if (/^#[\da-f]+$/i.test(value)) {
    let hex = value.slice(1).toLowerCase();
    if (hex.length === 3) hex = [...hex].map(c => c + c).join("");
    return "#" + hex;
  }
  const match = value.match(/^(-?[\d.]+)(px|rem)$/);
  return match ? `${Number(match[1]) * (match[2] === "rem" ? 16 : 1)}px` : value;
};
for (const match of variables.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
  const key = normalize(match[2].trim());
  if (!existing.has(key)) existing.set(key, match[1]);
}
const added = new Map();
function token(value, property) {
  const key = normalize(value);
  if (existing.has(key)) return `var(--${existing.get(key)})`;
  const group = value.startsWith("#") ? "color" : /ms$|s$/.test(value) ? "duration" : property.includes("opacity") ? "opacity" : "value";
  const name = `${group}-${value.replace(/^-/, "negative-").replace(/\./g, "-").replace(/%/g, "percent").replace(/#/g, "").replace(/[^\w-]/g, "")}`;
  existing.set(key, name);
  added.set(name, value);
  return `var(--${name})`;
}
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith(".scss") ? [file] : [];
  });
}
for (const file of walk("src")) {
  if (["_variables.scss", "_tokens.scss", "_fonts.scss", "_mixins.scss"].includes(path.basename(file))) continue;
  let source = fs.readFileSync(file, "utf8");
  // Declaration values only: selectors, keyframe stops and media conditions stay intact.
  source = source.replace(/(^|[;{\n])(\s*)([\w-]+)\s*:\s*([^;{}]+)(;|(?=\}))/g, (all, prefix, space, property, value, end) => {
    if (property.startsWith("--") || ["syntax", "inherits", "initial-value", "animation-timeline", "font-family"].includes(property)) return all;
    const result = value.replace(/var\([^)]*\)|url\([^)]*\)|"[^"]*"|'[^']*'|#[\da-f]{3,8}\b|(?<![\w$-])-?(?:\d*\.)?\d+(?:rem|px|ms|s|vh|vw|%|deg)?\b/g, (literal) => {
      if (/^(var\(|url\(|["'])/.test(literal)) return literal;
      if (literal.endsWith("%")) return token(literal, property);
      return token(literal, property);
    });
    return `${prefix}${space}${property}: ${result}${end}`;
  });
  fs.writeFileSync(file, source);
}
// Brand backgrounds are also shared color tokens rather than inline hex literals.
const dataPath = "src/data/technologySkills.js";
let data = fs.readFileSync(dataPath, "utf8");
data = data.replace(/"(#[\da-f]{3,8})"/gi, (_, color) => JSON.stringify(token(color, "background")));
fs.writeFileSync(dataPath, data);
if (added.size) {
  variables += "\n// Shared values used by page and component styles.\n:root {\n";
  for (const [name, value] of added) variables += `  --${name}: ${value};\n`;
  variables += "}\n";
}
fs.writeFileSync(variablesPath, variables);
console.log(`Added ${added.size} shared tokens and updated component/page declarations.`);
for (const file of walk("src")) {
  if (["_variables.scss", "_tokens.scss", "_fonts.scss", "_mixins.scss"].includes(path.basename(file))) continue;
  const source = fs.readFileSync(file, "utf8").replace(/var\((--[\w-]+)\)%/g, "calc(var($1) * 1%)");
  fs.writeFileSync(file, source);
}
