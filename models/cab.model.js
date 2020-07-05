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
    cab: {
        cabLocation: {
            type: String
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
            type: String
        }
    },
    banned: {
        type: Boolean,
        default: false
    },
},
{usePushEach: true});

module.exports = mongoose.model('cabs', UsersSchema)