
export default next => (pbType, args) => {
  if (pbType === 'oneOf') {
    return {
      type: 'string',
      enum: args[0],
    };
  }
  return next(pbType);
};
