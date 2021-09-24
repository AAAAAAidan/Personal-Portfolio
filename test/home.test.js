const app = require("../app");
const request = require("request");

describe("Test status codes on the home pages", () => {

  it("/index should return 200", function (done) {
    request.get("http://localhost:8080/", function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("/portfolio should return 200", function (done) {
    request.get("http://localhost:8080/portfolio", function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("/enjoyment should return 200", function (done) {
    request.get("http://localhost:8080/enjoyment", function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("/aaaaaa should return 404", function (done) {
    request.get("http://localhost:8080/aaaaaa", function (error, response, body) {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

});
