const {
    Schema,
    Types
} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get() {
            return `${Date.toLocaleString([], {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}`
        }
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
})

module.exports = reactionSchema;