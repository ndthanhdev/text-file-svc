import * as TextReaderSvc from "../text-reader-svc";

export function read(url, options) {
  if (url === "db") {
    return readDb;
  }

  return TextReaderSvc.read(url);
}

function readDb() {}
