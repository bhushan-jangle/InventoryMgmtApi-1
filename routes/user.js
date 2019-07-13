var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
      userId: {
            type: String,
            trim: true,
            default: '',
            required: true
      },
      productName: {
            type: String,
            trim: true,
            default: '',
            required:true
      },
      availableStock: {
            type: String,
            trim: true,
            default: '',
            required: true,
      },
      minStockLimit: {
            type: String,
            trim: true,
            default: '',
            required: true
      },

      measuringUnit: {
            type: String,
            trim: true,
            default: '',
            required: true
      },
      purchasingCost: {
            type: String,
            trim: true,
            default: '',
            required: true
      },
      salePrice: {
            type: String,
            trim: true,
            default: '',
            required: true
      }
});
mongoose.model('inventoryMgmt', UserSchema);

module.exports = mongoose.model('inventoryMgmt');
