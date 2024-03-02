const BaseUrl = "http://localhost:800/";
// const BaseUrl ="https://lmsapi.initialinfinity.com/"

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(BaseUrl + "api/Login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invalid Email or Password");
    }

    const data = await response.json();
    console.log(data)
    return data;
    
  } catch (error) {
    throw new Error("An error occurred while trying to log in.");
  }
};