const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();
 
  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}

async function getAllData() {
  const db = new Firestore();

  const predictCollection = db.collection('prediction');

  try {
    const snapshot = await predictCollection.get();
    const data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    console.error('Error saat mengambil data:', error);
    throw error;
  }
}

module.exports = {storeData, getAllData}
