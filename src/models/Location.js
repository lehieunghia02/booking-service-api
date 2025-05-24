const { default: mongoose } = require("mongoose");


const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    index: true
  },
  region: {
    type: String,
  },
  country: {
    type: String,
    required: true
  }, 
  country_code: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  is_popular: {
    type: Boolean,
    default: false
  },
  timezone: {
    type: String,
  },
  locale_code: {
    type: String,
  },
  currency: {
    type: String,
  }
},
{
  timestamps: true
});

//Indexing 
locationSchema.index({city: 'text', region: 'text', country: 'text'});
locationSchema.index({ is_popular: 1 });
locationSchema.index({ coordinates: '2dsphere' }, { sparse: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
