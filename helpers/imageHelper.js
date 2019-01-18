
var path = require("path");
const aws = require("aws-sdk");
const keys = require("../config/keys.js");
var request = require("request");

//Returns true if text record with key/value match is found
module.exports.saveImage = function(url, key) {
    let ext = path.extname(url);
    let params = {
      Key: key + ext,
      Bucket:  keys.awsBucket,
      ACL: "public-read"
    };
    return new Promise(function(resolve, reject) {
      request.get(url).on("response", function(response) {
        if (response.statusCode === 200) {
          params.ContentType = response.headers["content-type"];
          var s3 = new aws.S3({ params })
            .upload({ Body: response })
            .send(function(err, data) {
              resolve(data);
            });
        } else {
          // return false;
          reject(false);
        }
      });
    });
};
