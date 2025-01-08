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
const regex = /table\.(?:\w+)\("(\w+)"\)/g
let match

while ((match = regex.exec(migrationContent)) !== null) {
  const fieldName = match[1]

  // Ignorando campos específicos
  if (
    fieldName !== "created_at" &&
    fieldName !== "updated_at" &&
    fieldName !== "deleted_at" &&
    fieldName !== "id"
  ) {
    fields.push(fieldName)
  }
}

// 3. Gere o conteúdo da facade
const facadeName = camelCase(path.basename(latestMigrationFile).split("_")[1])
const facadeContent = generateFacadeContent(fields, facadeName)

// 4. Salve o arquivo de facade
const facadePath = path.join(__dirname, "..", "facade", `${facadeName}`)
fs.writeFileSync(facadePath, facadeContent, "utf-8")

function camelCase(str) {
  return str
    .split("_")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("")
}

function generateFacadeContent(fields, facadeName) {
  const tableName = facadeName
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase()
  let content = `const dbo = require("../dbo/base")
const validation = require("../model/${facadeName}")
const { messages } = require("joi-translation-pt-br")
const tableName = "${tableName}"\n\n`

  content += `const get = async (object) => {
const limit = object.limit
const page = object.page\n\n`

  for (const field of fields) {
    content += `  if (object.${camelCase(field)}) {
  const params = { column: "${field}", value: \`%\${object.${camelCase(
      field
    )}}%\`, operator: 'like'}
  return await dbo.get(tableName, limit, page, params)
}\n`
  }

  content += `  return await dbo.get(tableName, limit, page)
}\n\n`

  // Adicionando os métodos padrões
  content += `const insert = async (object) => {
try {
  await validation.object.validateAsync(object, {
    abortEarly: false,
    messages: messages,
  })
} catch (error) {
  const errors = error.details.map((el) => el.message)
  return { errors }
}

return await dbo.insert(object, tableName)
}\n\n`

  content += `const update = async (object, id) => {
if (!id) {
  return false
}
try {
  await validation.object.validateAsync(object, {
    abortEarly: false,
    messages: messages,
  })
} catch (error) {
  const errors = error.details.map((el) => el.message)
  return { errors }
}
return await dbo.update(object, id, tableName)
}\n\n`

  content += `const remove = async (id) => {
if (!id) {
  return false
}
return await dbo.remove(id, tableName)
}\n\n`

  content += `module.exports = {
get,
insert,
update,
remove,
}`

  return content
}
