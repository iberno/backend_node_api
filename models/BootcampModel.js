const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const slugify = require('slugify');

const BootcampSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more them 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [ true, 'Please add a Bootcamp description'],
    maxlength: [500, 'description cannot be more them 500 characters'],
  },
  website: {
    type: String,
    match: [/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'Please use a valid URL with HTTP or HTTPS'
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone Number can not be longer them 20 characters']
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add a bootcamp address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    number: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'other',
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing: {
    type: String,
    default: false
  },
  jobAssistance: {
    type: String,
    default: false
  },
  jobGuarantee: {
    type: String,
    default: false
  },
  acceptGi: {
    type: String,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

// Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Geocode & create location field
BootcampSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    number: loc[0].streetNumber,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  //Do not save address in DB
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);