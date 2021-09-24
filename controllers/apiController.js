const jsonUtilities = require("../lib/jsonUtilities");
const cloudUtilities = require("../lib/cloudUtilities");
const File = require("../models/file");
const message403 = "You don't have permission to complete this request! >:(";
const message500 = "The server was unable to complete your request. :(";

const api_file_get_all = (request, response) => {
  const page = request.query.page || 1;
  const resultsPerPage = request.query.resultsPerPage || 10;
  const fileExtension = request.query.fileExtension || null;
  const regex = fileExtension ? "." + fileExtension + "$" : ".*";

  File.find({"filename": {$regex: regex}})
  .then((results) => {
    response.send(jsonUtilities.formatResults(results, page, resultsPerPage, fileExtension));
  })
  .catch((error) => {
    console.log(error);
    response.status(500).send(jsonUtilities.formatError(message500));
  });
}

const api_file_post = (request, response) => {
  cloudUtilities.fetchCredentials()
  .then(credentials => {
    console.log("Valid credentials: " + JSON.stringify(credentials));
    console.log("Given credentials: " + JSON.stringify(request.body));

    if (request.body.username != credentials.username
      ||request.body.password != credentials.password) {
      console.log("Invalid credentials! >:(");
      response.status(403).send(jsonUtilities.formatError(message403));
    }
    else {
      const file = new File({
        filename: request.body.filename,
        title: request.body.title,
        description: request.body.description
      });

      file.save()
      .then((result) => {
        console.log("Saved new file! :)");
        response.send(jsonUtilities.formatResult(file));
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send(jsonUtilities.formatError(message500));
      });
    }
  })
  .catch(error => {
    console.log(error);
    response.status(500).send(jsonUtilities.formatError(message500));
  });
}

const api_file_get = (request, response) => {
  File.findById(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(500).send(jsonUtilities.formatError(message500));
  });
}

const api_file_put = (request, response) => {
  File.findByIdAndUpdate(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(500).send(jsonUtilities.formatError(message500));
  });
}

const api_file_delete = (request, response) => {
  File.findByIdAndDelete(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(500).send(jsonUtilities.formatError(message500));
  });
}

module.exports = {
  api_file_get_all,
  api_file_post,
  api_file_get,
  api_file_put,
  api_file_delete,
};
