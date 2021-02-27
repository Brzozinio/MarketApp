import jwt_decode from "jwt-decode";

export const getUserToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return false;
};

export const isUserAdmin = (token) => {
  let user = {};
  try {
    user = jwt_decode(token);
  } catch (error) {}
  return user.isAdmin;
};
// eslint-disable-next-line
export default {
  getUserToken,
  isUserAdmin,
};
