var validator = require("validator");
var dns = require("dns");
var url = require("url");

//Returns true if text record with key/value match is found
module.exports.check_TXT_record = function(hostUrl, value) {
  return new Promise(function(resolve, reject) {
    const hostName = url.parse(hostUrl).hostname;

    dns.resolveTxt(hostName, function(err, records) {
      if (err) {
        reject(false);
      } else {
        let foundMatch = false;
        if (records.length) {
          records.forEach(function(txtRecords) {
            if (txtRecords.length) {
              txtRecords.forEach(function(record) {
      
                try {
                  //   const recordKey = record.split("=")[0];
                  //    const recordValue = record.split("=")[1];
                  //if (recordKey === key && recordValue === value)
                  if (record === value) foundMatch = true;
                } catch (err) {
                  console.log(err);
                }
              });
            }
          });
        }
        if (foundMatch) resolve(true);
        reject(false);

        return foundMatch;
      }
    });
  });
};
