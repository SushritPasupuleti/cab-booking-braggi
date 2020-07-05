const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    displayName: {
        type: String,
        default: 'User'
    },
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    otp: {
        value: {
            type: String
        },
        expiry: {
            type: Date // + 2mins from creation
        }
    },
    cab: {
        cabId: {
            type: mongoose.Schema.Types.ObjectId
        },
        cabModelName: {
            type: String
        },
        cabColor: {
            type: String
        },
        cabNo: {
            type: String
        },
        cabSlot: {
            type: String //{cabTo, cabFrom, cabTime}
        }
    },
    banned: {
        type: Boolean,
        default: false
    },
},
{usePushEach: true});

module.exports = mongoose.model('users', UsersSchema)