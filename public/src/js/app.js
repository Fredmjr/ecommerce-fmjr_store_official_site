/* Reload page - hshels navbar logo button */
document.querySelector("#fmjrnvbrlgBtn").addEventListener("click", () => {
  window.location.reload();
});

//Reusabled fetch request
const request = async (url, method, body = null, customHeaders = {}) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (err) {
    console.error(`Error with ${method} request:`, err);
  }
};

//get
/* const data = await request("/api/trms", "GET"); */

//post
/* const data = await request("/api/trms", "POST", { name: "New Item" }); */

//patch
/* const data = await request("/api/trms/1", "PATCH", { price: 200 }); */

//delete
/* const data = await request("/api/trms/1", "DELETE"); */
