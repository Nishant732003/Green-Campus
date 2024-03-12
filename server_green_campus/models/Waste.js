const mongoose = require('mongoose');

const { Schema } = mongoose;

const WasteSchema = new Schema({
    messFoodEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },

    paperWasteEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },

    metalWasteEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    plasticWasteEmissions: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
},{
    timestamps: true
  },)

module.exports = WasteSchema;