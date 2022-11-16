module.exports = (err, middleware) => {
  return {
    log: `Error in ${middleware}: ${err}`,
    status: 400,
    message: {
      err: `An error occurred in ${middleware}, please check log for details.`,
    },
  };
};
