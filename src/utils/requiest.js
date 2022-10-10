import axios from "axios";
let user = JSON.parse(localStorage.getItem("user"));
console.log(user)

export const normalPost = (data, api) => {
  return axios.post(api, data);
};
export const normalGet = (api) => {
  return axios.get(api);
};
export const filePost = (api, file) => {
  const formData = new FormData();
    formData.append('file',file)
  return axios.post(api, formData, {
    headers: {
     'content-type': 'multipart/form-data',
    },
  });
};
export const authGet = (api) => {
  return axios.get(api, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

export const authPost = (api, data) => {
  return axios.post(api, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

export const authPut = (api, data) => {
  return axios.put(api, data, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

export const authDelete = (api) => {
  return axios.delete(api, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};