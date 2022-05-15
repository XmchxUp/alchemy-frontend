import { API_BASE_URL, ACCESS_TOKEN } from "./constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function githubLogin(code) {
  return request({
    url: `${API_BASE_URL}/auth/github/signin?code=${code}`,
    method: "POST",
  });
}


export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export function register(signUpRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });
}

// TODO: 用于提高前端用户体验
export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET",
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET",
  });
}

export function getAllCategory() {
  return request({
    url: API_BASE_URL + "/category/all",
    method: "GET",
  });
}

export function getAllPin() {
  return request({
    url: API_BASE_URL + "/pin/all",
    method: "GET",
  });
}

export function getPinDetail(pinId) {
  return request({
    url: API_BASE_URL + `/pin/${pinId}`,
    method: "GET",
  });
}