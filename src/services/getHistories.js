const { Firestore } = require('@google-cloud/firestore');

// Inisialisasi Firestore
const firestore = new Firestore();

const getHistories = async () => {
    try {
        // Ambil koleksi `predictions`
        const snapshot = await firestore.collection('predictions').get();
        const histories = [];

        // Iterasi setiap dokumen
        snapshot.forEach(doc => {
            const data = doc.data();
            histories.push({
                id: doc.id,
                history: {
                    result: data.result,
                    createdAt: data.createdAt,
                    suggestion: data.suggestion,
                    id: doc.id,
                }
            });
        });

        return {
            status: "success",
            data: histories,
        };
    } catch (error) {
        console.error('Error retrieving histories:', error);
        throw new Error('Failed to retrieve prediction histories.');
    }
};

module.exports = getHistories;
