const admin = require('firebase-admin');
admin.initializeApp(); // Initialize Firebase Admin SDK
const db = admin.firestore(); // Get Firestore instance

module.exports = { db }; // Export Firestore instance for use in functions
