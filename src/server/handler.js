const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const {storeData, getAllData} = require('../services/storeData');
const Hapi = require('@hapi/hapi');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  await storeData(id, data);
 
  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

async function allHistories(req, h) {
  try {
    const allData = await getAllData();
    const response = h.response({
      status: 'success',
      data: allData,
    })
    response.code(200);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return h.response({ message: 'Terjadi kesalahan saat mengambil data.' }).code(500);
  }
}
 
module.exports = {postPredictHandler, allHistories};
