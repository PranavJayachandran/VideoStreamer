const setHttpOnlyCookie = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

const getCookie = (cookieName: string) => {
  const authToken = localStorage.getItem(cookieName);
  if (!authToken) return null;
  return authToken;
};
export { setHttpOnlyCookie, getCookie };
