'use strict';
var mongoose = require('mongoose');

const heightsSchema = {
    type: { type: String },
    properties: {
        building_height: { type: Number, alias: 'properties.height' },
        iou: { type: Number }
    },
    geometry: {
        type: { type: String },
        coordinates: { type: Array }
    }
};

var mytishiSchema = new mongoose.Schema(
    heightsSchema,
    { toObject: { virtuals: true }, toJSON: { virtuals: true } },
);
mytishiSchema.index({ geometry: '2dsphere' });

const mytishiModel = mongoose.model('GeoJSON', mytishiSchema, 'mytishi');

exports.mytishiModel = mytishiModel;

exports.within = (polygon, callback, model = mytishiModel) => {
    return model.where('geometry').within().geometry(polygon).exec(callback);
}

exports.intersects = (polygon, callback, model = mytishiModel) => {
    return model.where('geometry').intersects().geometry(polygon).exec(callback);
}