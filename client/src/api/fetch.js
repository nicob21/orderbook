export const fetchGet = async (uri) => {
  return await fetchRes("GET", uri);
};

export const fetchPost = (uri, body) => {
  return fetchRes("POST", uri, body);
};

export const fetchDelete = (uri, body = {}) => {
  return fetchRes("DELETE", uri, body);
};

const fetchRes = async (method, uri, body) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await fetch(`/api/${uri}`, {
      method,
      headers,
      body: JSON.stringify(body),
      timeout: 30 * 1000,
    });
    if (res.status === 200 || res.status === 202 || res.status === 201) {
      if (
        res.headers &&
        res.headers.get("content-type").indexOf("application/json") !== -1
      ) {
        res = await res.json();
      }
      return res;
    } else {
      throw new Error("API call failed.");
    }
  } catch (e) {
    console.log("Fetch", e);
    throw e;
  }
};
