const facade = require("../facade/participation");

const get = async (req, res) => {
  try {
    console.log("Endpoint /eventCounts chamado");
    const counts = await facade.getEventParticipantsCount();
    console.log("Contagens a serem retornadas:", counts);
    res.status(200).json(counts);
  } catch (error) {
    console.error("Erro ao obter contagem de participantes:", error);
    res.status(500).json({ error: "Erro ao obter contagem de participantes" });
  }
};

module.exports = {
  get
};