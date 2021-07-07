//------------------Setting API to handle Search Function----------------------------------------

const baseURL =
  "http://api.weatherstack.com/current?access_key=e4290216241b86108ea6f402b1840ef5&query=Indiana";

//-----------------Function to reset the DOM elements and get New location----------------------

const search = document.querySelector(".submit");
let searchURL = function () {
  let newURL = document.querySelector(".input").value;
  document.querySelector(".location").innerHTML = "";
  document.querySelector(".information").innerHTML = "";
  document.querySelector(".icon").innerHTML = "";
  fetch(
    `http://api.weatherstack.com/current?access_key=e4290216241b86108ea6f402b1840ef5&query=${newURL}`
  )
    .then((Response) => {
      return Response.json();
    })
    .then((json) => {
      return description(json);
    });
};
search.addEventListener("click", searchURL);

//-------------------Add Button to reset the DOM---------------------
const button = document.getElementById("btn");
const clear = function () {
  location.reload();
};
button.addEventListener("click", clear);

//-----------Timer for refresh. Only one GET per 30 secs-------------
window.onload = function () {
  var sec = 30;
  setInterval(function () {
    if (sec >= 0) {
      document.getElementById("timer").innerText = "refresh in " + sec;
      sec--;
    } else {
      document.getElementById("timer").innerText = "refresh now";
    }
  }, 1000);
};
//-----------------The API call-------------------------------
function fetchLocation() {
  fetch(baseURL)
    .then((Response) => {
      return Response.json();
    })
    .then((json) => {
      console.log(json);
      // return showMap(json);
      return description(json); //json.location.localtime , region
    });
}
fetchLocation();


//---------Create the get data from API--------------------------
let weather = document.querySelector(".weather");
const description = function (x) {
  let information = document.querySelector(".information");
  let iconDiv = document.createElement("img"); //
  let infoDiv = document.createElement("h3");
  let infoDiv2 = document.createElement("h3");
  let infoDiv3 = document.createElement("h3");
  let app = document.querySelector(".location");
  let title = document.createElement("h1");
  let photo = x.current.weather_icons[0];
  iconDiv.src = photo;
  infoDiv2.innerHTML = x.current.weather_descriptions[0];
  let daytime = x.current.is_day;
  if (daytime == "no") {
    infoDiv3.innerHTML = "Nighttime";
    document.body.style.backgroundImage = "url('Night.jpg')";
  } else {
    infoDiv3.innerHTML = "Daytime";
    document.body.style.backgroundImage = "url('sky.jpg')";
  }
  let celcius = (x.current.temperature * 9) / 5 + 32;

  infoDiv.innerHTML = celcius + "°F";
  infoDiv.style.fontSize = "38px";
  title = x.location.region;
  app.append(title);
  information.append(infoDiv);
  information.append(iconDiv);
  information.append(infoDiv2);
  information.append(infoDiv3);
  weather.append(information);
};

//--------Print all data to the screen in a table-----------------
// let newTable = document.getElementById("table");

// const showPairs = function (pairs) {
//   let parentList = document.getElementById("table");
//   Object.entries(pairs).forEach((entry) => {
//     let createRow = document.createElement("tr");
//     let createList = document.createElement("td");
//     let createNode = document.createElement("td");
//     const [key, value] = entry;
//     console.log(entry);
//     // console.log(`Hello ${key} : ${value}`);
//     createList.innerText = `${key}:`;
//     createNode.innerText = `${value}`;
//     createRow.appendChild(createList);
//     createRow.appendChild(createNode);
//     parentList.appendChild(createRow);
//   });
// };
