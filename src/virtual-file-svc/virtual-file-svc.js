export function save({ path, content }) {
  localStorage.setItem(
    path,
    JSON.stringify({ path, content, dateModified: Date.now() })
  );
  return Promise.resolve();
}

export function read(path) {
  return Promise.resolve(JSON.parse(localStorage.getItem(path)));
}

export function remove(path) {
  localStorage.removeItem(path);

  return Promise.resolve();
}

export function isExist(path) {
  return Promise.resolve(localStorage.getItem(path) != null);
}
