const contentfulManagement = require("contentful-management");

console.log("process.env: ", process.env);

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT));
};
