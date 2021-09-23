// TODO - Make this stuff work!!!! xD

// Google Cloud Secret Manager
const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

// Axios
const axios = require("axios");
const path = "computeMetadata/v1/project/project-id";
const axiosInstance = axios.create({
  baseURL: "http://metadata.google.internal/",
  timeout: 1000,
  headers: {"Metadata-Flavor": "Google"}
});

/**
 * Gets the current Google Cloud project ID.
 *
 * @returns {String} Returns the current Google Cloud project ID.
 */
const getProjectId = async function() {
  axiosInstance.get(path)
  .then(response => {
    console.log(response.status)
    console.log(response.data);
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
}

/**
 * Gets the project's MongoDB credentials from Google Cloud Secret Manager.
 *
 * @returns {Object} Returns object containing username, password, connection
 */
const getCredentials = async function() {
  const name = "projects/" + getProjectId() + "/secrets/personal-portfolio-credentials/versions/latest";
  const [version] = await client.accessSecretVersion({name: name});
  console.log(version.payload.data.toString());
  const payload = JSON.parse(version.payload.data.toString());
}

module.exports = {
  getProjectId,
  getCredentials
};
