const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

/**
 * Gets the project's MongoDB credentials from Google Cloud Secret Manager.
 *
 * @returns {Object} Returns object containing username, password, connection
 */
const fetchCredentials = async function() {
  try {
    const name = "projects/siivagunner-database/secrets/personal-portfolio-credentials/versions/latest";
    const [version] = await client.accessSecretVersion({name: name});
    return JSON.parse(version.payload.data.toString());
  }
  catch (exception) {
    console.log(exception);
    console.log("Failed to fetch cloud amin credentials; switching to read-only credentials");
    return {
      username: "username",
      password: "passkey",
      connection: "personal-portfolio-clus.qedes.mongodb.net/personal-portfolio-db"
    }
  }
}

module.exports = {
  fetchCredentials
};
