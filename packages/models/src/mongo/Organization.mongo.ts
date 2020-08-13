import shortid from 'shortid';

export default {
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  userId: {
    type:  String,
    required: false,
  },
  createdAt: {
    type:  Number,
    required: false,
  },
  lastUpdatedAt: {
    type: Number,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
};
