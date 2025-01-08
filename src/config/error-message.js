const message = (field) => {
  return {
    'string.base': `${field} deve ser do tipo texto.`,
    'string.empty': `${field} não pode ser um campo vazio.`,
    'string.min': `${field} deve ter um tamanho mínimo de {#limit}.`,
    'any.required': `${field} é um campo obrigatório.`,
  }
}

module.exports = { message }
