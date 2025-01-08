const fs = require("fs")
const path = require("path")

// 1. Encontre o último arquivo de migração
const migrationsPath = "src/config/migrations"
const migrationFiles = fs.readdirSync(migrationsPath).sort()
const latestMigrationFile = path.join(
  migrationsPath,
  migrationFiles[migrationFiles.length - 1]
)

// 2. Analise o arquivo de migração
const migrationContent = fs.readFileSync(latestMigrationFile, "utf-8")

const fields = []
const regex = /table\.(\w+)\("(\w+)"\)/g
let match

while ((match = regex.exec(migrationContent)) !== null) {
  const fieldData = { type: match[1], name: match[2] }
  if (fieldData.name !== "id" && fieldData.name !== "deleted_at") {
    fields.push(fieldData)
  }
}

// 3. Gere o conteúdo da seed
const seedName = camelCase(path.basename(latestMigrationFile).split("_")[1])
const seedContent = generateSeedContent(fields)

// 4. Salve o arquivo da seed
const seedsPath = path.join(
  __dirname,
  "..",
  "config",
  "seeds",
  `${seedName}Seed.js`
)
fs.writeFileSync(seedsPath, seedContent, "utf-8")

function camelCase(str) {
  return str
    .split("_")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("")
}

function generateSeedContent(fields) {
  const tableName = "item_movement" // Nome da tabela extraído do arquivo de migração

  let content = `/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('${tableName}').insert([\n`

  content += "    {\n"
  for (const field of fields) {
    if (field.type === "string") {
      content += `      ${field.name}: 'Dado genérico para ${field.name}',\n`
    } else if (field.type === "integer" || field.type === "increments") {
      content += `      ${field.name}: 1,\n`
    } else if (field.type === "float") {
      content += `      ${field.name}: 1.0,\n`
    } else if (field.type === "datetime") {
      content += `      ${field.name}: '2023-09-04 12:00:00',\n`
    }
    // Você pode adicionar condições para outros tipos de campo, se necessário.
  }
  content += "    },\n"

  content += "  ])\n"
  content += "}\n"

  return content
}
