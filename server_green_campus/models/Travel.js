const mongoose = require('mongoose');

const { Schema } = mongoose;

const travelSchema = new Schema({
    fourVheelersEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },

    publicTransitEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },

    twoVheelersEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    collegeBusEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
},{
    timestamps: true
  },)

module.exports = travelSchema;