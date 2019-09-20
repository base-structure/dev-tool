db.getCollection('collectionName').aggregate(
    [
        {
            $match : {
                "_id" : {
                    $in: [
                        ObjectId("")
                    ]
                }
            }
        },
        {
            $unwind:"$arr"
        },
        {
          $group : {
            _id : {
                key: "$key"
            }
          }
        },
        {
            $project: {
                _id: 0,
                key: "$_id.key"
            }
        }
    ]
)
