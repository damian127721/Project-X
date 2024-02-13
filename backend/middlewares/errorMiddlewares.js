const errorCustom = (err, req, res, next) => {
  if (res.statusCode === 200) {
    res.status(500);
  }

  res.json({
    message: err.message,
  });
};

const notFound = (req, res, next) => {
  res.status(404);
  res.redirect("https://project-x-vzmk.onrender.com");
  next(new Error("Not found"));
};

module.exports = { errorCustom, notFound };
