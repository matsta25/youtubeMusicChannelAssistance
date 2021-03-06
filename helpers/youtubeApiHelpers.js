const Youtube = require("youtube-api");
const fs = require("fs");

exports.sendToYoutube = function(data) {
  let promise = new Promise(function(resolve, reject) {
    Youtube.authenticate({
      type: "oauth",
      token: data.accessToken
    });

    Youtube.videos.insert(
      {
        resource: {
          snippet: {
            title: data.title,
            description: data.descritpion
          },
          status: {
            privacyStatus: "private"
          }
        },
        part: "snippet,status",
        media: {
          body: fs.createReadStream("./dist" + data.path)
        }
      },
      (err, data) => {
        if (err) {
          // eslint-disable-next-line
          console.log("err: " + err);
          code = 1;
        } else if (data.status.uploadStatus === "uploaded") {
          code = 0;
        }
        io.emit("sendToYoutube", {
          data: {
            code: code,
            err: err
          }
        });
      }
    );
  });
  return promise;
};
