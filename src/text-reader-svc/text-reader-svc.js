/**
 * @typedef ReadOptions
 * @property {number} maxLen limit size in KB
 */

function isUrl(urlOrPath) {
  return true;
}

const DefaultOptions = {
  maxLen: Number.MAX_SAFE_INTEGER, // 100kb
  chunkSize: 100 * 1024 // 128kb
};

/**
 *
 * @param {*} urlOrPath
 * @param {ReadOptions} options
 */
export async function read(urlOrPath, options = {}) {
  options = {
    ...DefaultOptions,
    ...options
  };

  let metadata;

  if (isUrl(urlOrPath)) {
    metadata = await readMetadata(urlOrPath, options);
  } else {
    metadata = await readMetadata(urlOrPath, options);
  }

  const [size, text] = await readText(urlOrPath, options);

  return {
    ...metadata,
    size,
    text
  };
}

async function readText(url, { maxLen, chunkSize }) {
  const blob = await readBlob(url);

  maxLen = Math.min(maxLen, blob.size);

  let r = "";
  let startOffset = 0;
  let endOffset = Math.min(maxLen, startOffset + chunkSize);

  while (startOffset < maxLen) {
    const [chunkText, nextOffset] = await readChunk(
      blob,
      startOffset,
      endOffset
    );
    startOffset = nextOffset;
    endOffset = Math.min(maxLen, startOffset + chunkSize);
    r += chunkText;
  }

  return [blob.size, r];
}

function readChunk(blob, startOffset, endOffset) {
  return new Promise((rs) => {
    const reader = new FileReader();

    endOffset = Math.min(endOffset, blob.size);

    reader.onloadend = () => {
      rs([reader.result, endOffset]);
    };

    reader.readAsText(blob.slice(startOffset, endOffset));
  });
}

function readBlob(url) {
  return fetch(url).then((r) => r.blob());
}

const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
function parseMetadata(xhr) {
  if (!xhr) {
    return {};
  }

  const size = +xhr.getResponseHeader("Content-Length");

  let name;
  const disposition = xhr.getResponseHeader("Content-Disposition");
  const matches = disposition && filenameRegex.exec(disposition);
  if (matches != null && matches[1]) {
    name = matches[1].replace(/['"]/g, "");
  }

  return {
    size,
    name
  };
}

function readMetadata(url) {
  return new Promise((rs, rj) => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url);
    xhr.onreadystatechange = () => {
      rs(parseMetadata(xhr));
      xhr.abort();
    };
    xhr.send();
  });
}
