let jwt = JSON.parse(localStorage.getItem("jwt"));
if (!jwt) {
  window.location.href = "login.html";
}
let arr = [];
let debounceId;
let searchbyname;
async function fetchData() {
  await fetch(
    `https://floating-citadel-05665.herokuapp.com/dogs`,
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((result) => {
      arr = result;
     data(arr);
    })
    .catch((error) => console.log("error", error));
}
fetchData();

function search() {

  let query = document.getElementById("searchbyname").value.toLowerCase();
  searchbyname=arr.filter(e => {
    if(e.name === query){
       return e
    }else if(e.name !== query){
      
    }
  })
  if(searchbyname){
    data(searchbyname)
  }else{
    data(arr)
  }
 
}

function debounce(search, delay) {
  if (debounceId) {
    clearTimeout(debounceId);
  }
  debounceId = setTimeout(() => {
    search();
  }, delay);
}
document.getElementById("filterByGender").addEventListener("change", FilterbyGender);
function FilterbyGender() {
  let filter=document.getElementById("filterByGender").value
  console.log(filter)
  if(filter=="Male"){
    const male= arr.filter(e => e.gender === 'Male')
    data(male)
  }else if(filter=="Female"){
    const female = arr.filter(e => e.gender === 'Female')
    data(female)
  }else{
    data(arr)
  }
}
var id;
function data(arr) {
  let data = document.getElementById("data");
  data.innerHTML = null;
   arr.map((e) => {
    var div = document.createElement("div");
    div.setAttribute("class", "div");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "div1");
    var img = document.createElement("img");
    img.src = "https://www.freeiconspng.com/thumbs/dog-png/dog-png-30.png";
    img.setAttribute("class", "img");
    var name = document.createElement("p");
    name.innerText = `Name:${e.name}`;
    var gender = document.createElement("p");
    gender.innerText = `Gender: ${e.gender}`;
    var age = document.createElement("p");
    age.innerText = `Age: ${e.age}`;
    var place = document.createElement("p");
    place.innerText = `Place: ${e.place}`;
    var btndiv= document.createElement("div");
    btndiv.setAttribute("class","btndiv")
    var delete1=document.createElement("button");
    delete1.setAttribute("id","delete")
    delete1.addEventListener("click", () => {
      deteteData(e);
    });
    var edit=document.createElement("button");
    edit.setAttribute("id","edit")
    edit.addEventListener("click", () => {
      openModal(e);
      id=e.id;
    });
    btndiv.append(delete1,edit)
    div1.append(img);
    div.append(div1, name, gender, age, place,btndiv);
    data.append(div);
  });
}
function openModal(e) {
  document.getElementById("name").value=e.name;
  document.getElementById("age").value=e.age;
  document.getElementById("gender").value=e.gender;
  document.getElementById("place").value=e.place;
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document.getElementById("submission").addEventListener("click", editmodal);
function editmodal(e){
 let name=document.getElementById("name").value.toLowerCase();
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let place = document.getElementById("place").value;
  let modal = document.getElementById("myModal");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "name": name,
    "age": age,
    "gender": gender,
    "place": place
  });
  
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://floating-citadel-05665.herokuapp.com/dogs/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      alert("Data Update SuccessFull")
      fetchData()
    })
    .catch(error => console.log('error', error));

  modal.style.display = "none";
}
function deteteData(el) {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(
    `https://floating-citadel-05665.herokuapp.com/dogs/${el.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      fetchData();
     
    })
    .catch((error) => console.log("error", error));
}
document
  .getElementById("sortByAge")
  .addEventListener("change", sortByAge);
function sortByAge() {
  let selected = document.getElementById("sortByAge").value;
  if (selected == "lth") {
    arr.sort((a, b) => a.age - b.age);
    data(arr);
  }
  if (selected == "htl") {
    arr.sort((a, b) => b.age - a.age);
    data(arr);
  }
}
