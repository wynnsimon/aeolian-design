export const uploadProps = {
  uploadUrl: {
    type: String,
    required: true,
  },
  mergeUrl: {
    type: String,
    required: true,
  },
  verifyUrl: {
    type: String,
    required: true,
  },
  chunkSize: {
    type: Number,
    default: 1024 * 1024 * 5,
  },
};
