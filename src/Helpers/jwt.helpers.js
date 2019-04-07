export const getJwt = () => {
  return localStorage.getItem("cool-permit");
};

export const removeJwt = () => {
  return localStorage.removeItem("cool-permit");
};
