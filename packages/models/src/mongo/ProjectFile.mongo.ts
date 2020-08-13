import shortid from "shortid";

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
  projectId: {
    type: String,
    requred: true,
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
  audioUrl: {
    type: String,
    required: false,

  },
  textUrl: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  lastUpdatedAt: {
    type: Number,
    required: true,
  },
  lastUpdatedBy: {
    type: String,
    required: true,
  },
};
