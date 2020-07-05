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
        type: String, //generated post sign in by auth
    },
    cab: {
        cabLocation: {
            type: String
        },
        cabModelName: {
            type: String
        },
        cabType: {
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

module.exports = mongoose.model('cabs', UsersSchema)