// Arquivo: api/exportCheckIn.js

const facade = require("../facade/checkIn");

const getExportData = async (req, res) => {
  try {
    const { hour, eventId } = req.query;

    if (!hour || !eventId) {
      return res.status(400).json({ 
        error: "Parâmetros obrigatórios: hour e eventId" 
      });
    }

    const data = await facade.getCheckInExportData(hour, eventId);
    
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao obter dados para exportação:", error);
    res.status(500).json({ 
      error: "Erro ao obter dados para exportação" 
    });
  }
};

module.exports = {
  getExportData
};