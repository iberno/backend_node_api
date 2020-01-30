const mongoose = require('mongoose');

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
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
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

module.exports = mongoose.model('Bootcamp', BootcampSchema);