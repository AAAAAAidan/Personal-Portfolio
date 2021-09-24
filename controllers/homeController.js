const index_get = (request, response) => {
  response.render("index");
}

const portfolio_get = (request, response) => {
  response.render("portfolio");
}

const enjoyment_get = (request, response) => {
  response.render("enjoyment");
}

const add_get = (request, response) => {
  response.render("add");
}

module.exports = {
  index_get,
  portfolio_get,
  enjoyment_get,
  add_get
};
