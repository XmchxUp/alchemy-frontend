export function uuid() {
  return "1314521xxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function fetchUser() {
  return localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
}

export function fetchCategories() {
  return localStorage.getItem("categories") !== "undefined"
    ? JSON.parse(localStorage.getItem("categories"))
    : null;
}