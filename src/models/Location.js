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
    default: ""
  }, 
  country_code: {
    type: String,
    default: ""
  },
  timezone: {
    type: String,
    default: ""
  },
  currency: {
    type: String,
    default: ""
  }
},
{
  timestamps: true
});

//Indexing 
locationSchema.index({city: 'text', region: 'text', country: 'text'});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
