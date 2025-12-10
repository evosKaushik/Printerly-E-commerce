import BaseAPI from "./Base.api";

const logout = async () => {
  const { data } = await BaseAPI.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return data;
};

export { logout };
