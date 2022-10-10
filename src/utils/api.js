export const baseurl = "http://localhost:3000/api";

// user
export const signinapi = `${baseurl}/users/signin`;
export const signupapi = `${baseurl}/users/signup`;

// patient
export const patientapi = `${baseurl}/patient?page=1&limit=10`;
export const patientbyidapi =  (id)=>`${baseurl}/patient/${id}`;
export const patientcreateapi = `${baseurl}/patient`;
export const patientupdateapi = (id) => `${baseurl}/patient/${id}`;
export const patientdeleteapi = (id) => `${baseurl}/patient/${id}`;

// file upload
export const fileupload = `${baseurl}/file_upload`;

