import axios from "axios";

const UseAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "https://voyago-server-theta.vercel.app/",
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default UseAxiosSecure;
