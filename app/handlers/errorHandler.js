// recursive function that manages errors globally to avoid "try catch"
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);

    // return fn(req, res, next).catch(err => next(err));
  };
};

// handle 404 errors
exports.notFound = (req, res, next) => {
  const error = new Error("Not Found");
  console.error(error);
  res.status(404).render("error", {
    message: `An error occured:\n${error.message}`,
    status: 404,
  });
};

// handle 500 errors for dev environnement
exports.errorsCollectors = (err, req, res, next) => {
  const status = err.status || 500;

  res.format({
    "text/html": () => {
      res.status(status).render("error", {
        message: err.message,
        stack: err.stack,
        status: status,
      });
    },
  });
};

// handle 500 errors for users
exports.collectErrors = (err, req, res, next) => {
  const status = err.status || 500;

  res.format({
    "text/html": () => {
      res.status(status).render("error", {
        message: err.message,
        status: status,
      });
    },
  });
};
