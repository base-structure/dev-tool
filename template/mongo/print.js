print([
    'id'
].join(','))

db.getCollection('collectionName').find({
    "_id": {
        $in: [
             ObjectId("")
        ]
    },
}).sort({
    // createdAt: 1
}).forEach(item => {
    print([
        item._id
    ].join(','))
});
