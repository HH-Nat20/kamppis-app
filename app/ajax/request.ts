export const baseUrl = "https://kamppis.hellmanstudios.fi/api"; // TODO: Use environment variable

// CRUD operations for the API
export const get = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  return response;
};

export const create = async (url: string, newObject: object) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  });
  return response;
};

export const update = async (url: string, updatedObject: object) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedObject),
  });
  return response;
};

export const remove = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  return response;
};
