const app = require("../app");
const request = require("request");

describe("Test status codes on the API pages", () => {

  it("/api/images should return 200", function (done) {
    request.get("http://localhost:8080/api/images", function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("/api/videos should return 200", function (done) {
    request.get("http://localhost:8080/api/videos", function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

});
