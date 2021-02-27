const logger = () => (next) => (action) => {
  console.log(action.type, action.payload);
  next(action);
};

export default logger;
