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
            // We need to add the sanitized property to avoid an infinite loopcd t
            return change.after.ref.update({
                content: content.replace(/CoffeeScript/g, '*********'),
                sanitized: true
            });
        }
        return null;    
    })

exports.incrementCommentCount = functions.firestore.document('posts/{postId}/comments/{commentId}').onCreate(async (snapshot, context) => {
    // We only have access to AFTER, not BEFORE onCreate
    // GETTING THE POST ID:
        // We could navigate UP THE PARENTS using the doc-ref
        // We could take them from the Params object.
        const { postId, commentId } = context.params;
        const postRef = firestore.doc(`posts/${postId}`);
        // .data() will get all properties
        // .get() will get one key-value (or more, not sure.)
        // Actually, .get() is called on the reference, which returns the doccument comments object
        const snap = await postRef.get('comments');
        const comments = snap.get('comments')
        return postRef.update({ comments: comments + 1});
})

// We can listen on AuthChanges - auth.create - can create that user doc on firebase cloud functions instead on front-end.