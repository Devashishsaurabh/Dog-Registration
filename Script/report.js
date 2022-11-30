let jwt = JSON.parse(localStorage.getItem("jwt"));
if (!jwt) {
  window.location.href = "login.html";
}
let arr = [];
fetchData();
async function fetchData() {
    await fetch(
      `https://floating-citadel-05665.herokuapp.com/dogs`,
      { method: "GET" }
    ).then((response) => response.json())
      .then((result) => {
        arr=result;
        datamap(arr)
      })
      .catch((error) => console.log("error", error));
  }

function datamap(arr){
    let length=arr.length;
    let female=arr.filter((e)=>{
        return e.gender=='Female';
    })
    let male=arr.filter((e)=>{
        return e.gender=='Male';
    })
    let averageAge = arr.reduce((sum, Age) => sum +(+Age.age), 0) 
    averageAge=Math.floor(averageAge/length)
    document.getElementById("nd").innerHTML=length
    document.getElementById("fd").innerHTML=female.length
    document.getElementById("md").innerHTML=male.length
    document.getElementById("av").innerHTML=averageAge
}