const jsonUtilities = require("../lib/jsonUtilities");
const cloudUtilities = require("../lib/cloudUtilities");
const Image = require("../models/image");
const Video = require("../models/video");

////////////
// Images //
////////////

const api_image_get_all = (request, response) => {
  var regex = "..*$";

  if (request.query.type) {
    regex = regex.replace(".*", request.query.type);
  }

  Image.find({"filename": {$regex: regex}})
  .then((results) => {
    response.send(jsonUtilities.formatResults(results, request.query.type));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResults());
  });
}

const api_image_post = (request, response) => {
  // TODO - Add credentials check
  // if (request.body.username != username || request.body.password != password) {
  //   response.status(403).send(jsonUtilities.formatResult());
  // }

  const image = new Image({
    filename: request.body.filename,
    title: request.body.title,
    description: request.body.description
  });

  image.save()
  .then((result) => {
    response.send(jsonUtilities.formatResult(image));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

const api_image_get = (request, response) => {
  Image.findById(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

const api_image_put = (request, response) => {
  Image.findByIdAndUpdate(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

const api_image_delete = (request, response) => {
  Image.findByIdAndDelete(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

////////////
// Videos //
////////////

const api_video_get_all = (request, response) => {
  Video.find()
  .then((results) => {
    response.send(results);
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResults());
  });
}

const api_video_post = (request, response) => {
  // TODO - Add credentials check
  // if (request.body.username != username || request.body.password != password) {
  //   response.status(403).send(jsonUtilities.formatResult());
  // }

  const video = new Video({
    videoId: request.body.videoId,
    title: request.body.title,
    description: request.body.description
  });

  video.save()
  .then((result) => {
    response.send(jsonUtilities.formatResult(video));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

const api_video_get = (request, response) => {
  Video.findById(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

const api_video_put = (request, response) => {
  Video.findByIdAndUpdate()(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

const api_video_delete = (request, response) => {
  Video.findByIdAndDelete(request.params.id)
  .then((result) => {
    response.send(jsonUtilities.formatResult(result));
  })
  .catch((error) => {
    console.log(error);
    response.status(400).send(jsonUtilities.formatResult());
  });
}

module.exports = {
  // Images
  api_image_get_all,
  api_image_post,
  api_image_get,
  api_image_put,
  api_image_delete,

  // Videos
  api_video_get_all,
  api_video_post,
  api_video_get,
  api_video_put,
  api_video_delete
};
