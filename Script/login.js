document.getElementById("form").addEventListener("submit", login);

async function login() {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  let Obj = {
    email: email,
    password: password,
  };

  await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Obj),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.token) {
        alert("Login Failed, please try again");
      } else {
        let token = {
          token: data.token,
        };
        localStorage.setItem("jwt", JSON.stringify(token));
        alert("Login Successfull");
        window.location.href = "data.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error);
    });
}
