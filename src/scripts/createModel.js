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
  const fieldType = match[1]
  const fieldName = match[2]

  // Ignorando campos específicos
  if (
    fieldName !== "created_at" &&
    fieldName !== "updated_at" &&
    fieldName !== "deleted_at" &&
    fieldName !== "id"
  ) {
    fields.push({ type: fieldType, name: fieldName })
  }
}

// 3. Crie o arquivo de modelo
const modelName = path.basename(latestMigrationFile).split("_")[1]
const modelPath = path.join(__dirname, "..", "model", `${modelName}`)
const modelContent = generateModelContent(fields)

fs.writeFileSync(modelPath, modelContent, "utf-8")

function generateModelContent(fields) {
  let content = 'const Joi = require("joi")\n\n'
  content += "const object = Joi.object().keys({\n"

  for (const field of fields) {
    const camelCaseName = camelCase(field.name)
    content += `  ${camelCaseName}: Joi.${fieldTypeToJoiType(
      field.type
    )}().required().label("${labelName(camelCaseName)}"),\n`
  }

  content += "})\n\n"
  content += "module.exports = { object }"
  return content
}

function camelCase(str) {
  return str
    .split("_")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("")
}

function fieldTypeToJoiType(fieldType) {
  switch (fieldType) {
    case "integer":
      return "number"
    case "string":
      return "string"
    case "datetime":
      return "date"
    default:
      return "any" // Handle other types as needed
  }
}

function labelName(name) {
  return name
    .split(/(?=[A-Z])/)
    .join(" ")
    .toUpperCase()
}
