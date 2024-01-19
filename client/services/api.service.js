// const BASE_URL = "http://localhost:3333/api/v1";
// const BASE_URL = "http://192.168.0.19:3333/api/v1";
const BASE_URL = process.env.NEXT_PUBLIC_URL;

const fetchApi = async (
  url,
  options = { method: "GET", isMultiPart: false }
) => {
  // console.log("user", user);
  const { method, data } = options;

  const authToken = localStorage.getItem("authToken") || "";
  let bodyData = undefined;

  let headers = {
    // "Content-Type": "application/json",
    Authorization: `bearer ${authToken}`,
  };

  if (options?.isMultiPart) {
    bodyData = data;
  } else {
    // default is json
    headers["Content-Type"] = "application/json";
    bodyData = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    body: bodyData,
    headers,
  });
  // console.log("res", response);
  const result = await response.json();

  if (!response.ok) {
    throw { statusText: response.statusText, code: response.status, ...result };
  }

  // const formatted = normalize(result, "camel");
  return result;
};

// Login API
export const authLogin = (creds) => {
  // console.log("hi")
  return fetchApi(`/auth/login`, { data: creds, method: "POST" });
};

// User Registration Api
export const userRegister = (user) => {
  return fetchApi("/auth/register", { data: user, method: "POST" });
};

// Logout API
export const logout = () => {
  return fetchApi("/auth/logout", { method: "POST" });
};

export const getAllContacts = async () => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  if(user.id){

    return fetchApi(`/users/${user.id}/contacts`, { method: "GET" });
  }else{
    return "user id not found";
  }

};

export const getContactById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return fetchApi(`/users/${user.id}/contacts/${id}`);
};

//here we are fetching countries,company,idustry,designation data
export const fetchUserById = async (props) => {
  return await fetchApi(`${props}`);
};

// this function is used to add contacts
export const addContactsApi = async (contact) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return await fetchApi(`/users/${user.id}/contacts`, {
    method: "POST",
    data: contact,
  });
};

export const getUserApi = () => {
  return fetchApi(`/auth/me`, { method: "GET" });
};

// update the contact fetched by id
export const updateContact = (contact) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return fetchApi(`/users/${user.id}/contacts/${contact.id}`, {
    method: "PUT",
    data: contact,
  });
};

// delete the contact
export const deleteContact = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return fetchApi(`/users/${user.id}/contacts/${id}`, {
    method: "DELETE",
  });
};

export const importCSVFile = (formdata) => {
  return fetchApi("/import/csv", {
    method: "POST",
    data: formdata,
    isMultiPart: true,
  });
};

export const searchApi = (params) => {
  return fetchApi(`/contacts/search/${params}`);
};

export const searchAPI = async (params) => {
  return await fetchApi(`/contacts/search/${params}`);
};

export const exportAPI = (csv) => {
  const csvFile = { inputIds: csv };
  console.log(csvFile);
  return fetchApi("/export/csv", {
    method: "POST",
    data: csvFile,
  });

  // const authToken = localStorage.getItem("authToken") || "";
  // console.log("csvfile");

  // const response = await fetch(`${BASE_URL}/export/csv`, {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //     Authorization: `bearer ${authToken}`,
  //   },
  //   body: csvFile,
  // });
  // const result = await response.blob().then((blob) => {
  //   // const url = new Blob(blob);
  //   console.log("url", blob);
  //   return blob;
  // });

  // if (!response.ok) {
  //   throw { statusText: response.statusText, code: response.status, ...result };
  // }

  // console.log(result);

  // return result;
};
