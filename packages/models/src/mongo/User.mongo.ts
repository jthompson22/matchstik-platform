import shortid from 'shortid';
import MetaData from './MetaData.mongo';

export default {
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: false,
    default: null,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  organizationId: {
    type: String,
    required: false,
  },
  verifyEmailCode: {
    type: String,
    required: false,
    default: null,
  },
  emailVerifiedAt: {
    type: Number,
    required: false,
    default: null,
  },
  resetPasswordCode: {
    type: String,
    required: false,
    default: null,
  },
  resetPasswordCodeSetAt: {
    type: Number,
    required: false,
    default: null
  },
  meta: MetaData,
}
