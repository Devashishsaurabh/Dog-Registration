document.getElementById("form").addEventListener("submit", register);

async function register() {
  event.preventDefault();

  let name = document.getElementById("name").value.toLowerCase();
  let age = document.getElementById("age").value;
  let gender = document.getElementById("sex").value;
  let place = document.getElementById("place").value;

  let Obj = {
    name: name,
    age: age,
    gender: gender,
    place: place,
  };
  await fetch("https://floating-citadel-05665.herokuapp.com/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Obj),
  })
    .then((response) => response.json())
    .then((res) => {
      alert("successfully registered");
      document.getElementById("name").value = null;
      document.getElementById("age").value = null;
      document.getElementById("sex").value = null;
      document.getElementById("place").value = null;
    })
    .catch((e) => {
      console.log("err", e);
    });
}