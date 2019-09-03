db.getCollection('collection').update(
    {
        _id: ObjectId("")
    },
    {
        $unset: {
            name: ""
        },
        $set: {
            key: "val"
        }
    },
    {
        multi: false
    }
)
