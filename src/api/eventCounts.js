const facade = require("../facade/participation");

const get = async (req, res) => {
  try {
    // console.log("Endpoint /eventCounts chamado");
    // console.log("Usuário requisitando:", req.cookies.cookieID);
    
    const counts = await facade.getEventParticipantsCount();
    
    // console.log("Contagens obtidas do banco:", counts);
    // console.log("Tipo de dados das contagens:", typeof counts);
    // console.log("Chaves nas contagens:", Object.keys(counts));
    
    res.status(200).json(counts);
  } catch (error) {
    console.error("Erro ao obter contagem de participantes:", error);
    res.status(500).json({ error: "Erro ao obter contagem de participantes" });
  }
};

module.exports = {
  get
};