export const saveUser = async (data) => {
  const request = fetch("http://localhost:3000/api/CreateList", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  return await request;
};
