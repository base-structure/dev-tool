db.getCollection('collectionName').findAndModify({
    query: {
        "key": "value"
    },
    update: {
        $inc: { data: -1 }
    }
})
