import shortid from "shortid";
import MetaData from './MetaData.mongo';

export default {
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  organizationId: {
    type: String,
    required: true,
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
  fileIds: [{
    type: String,
    required: false,
    default: [],
  }],
  meta: MetaData,
};
