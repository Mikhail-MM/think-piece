const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
    const snapshots = await firestore.collection('posts').get();
    const posts = snapshots.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
    });
    response.json({ posts });
})

exports.sanitizeContent = functions
    .firestore
    .document('posts/{postId}')
    .onWrite(async change => {
        //We will get the Before + After
        if(!change.after.exists) return // Do nothing if doc deleted
        const { content, sanitized } = change.after.data();
        if (content && !sanitized) {
            // The function actually runs twice on each doc write
            // We need to add the sanitized property to avoid an infinite loop
            return change.after.ref.update({
                content: content.replace(/CoffeeScript/g, '*********'),
                sanitized: true
            });
        }
        return null;
    })