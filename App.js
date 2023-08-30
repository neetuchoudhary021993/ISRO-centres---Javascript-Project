
const centerBtn = document.getElementById("center");
const stateBtn = document.getElementById("state");
const cityBtn = document.getElementById("city");
const searchBtn = document.getElementById("search_btn");
const search_input = document.getElementById("search_input");

let selectedBtn = centerBtn;
let centresArr = [];

//use variable to store api_URL

const result_table = document.getElementById("result");

async function fetch_ISRO_data() {
  try {
    const response = await fetch("https://isro.vercel.app/api/centres");

    const result = await response.json();
    centresArr = result.centres;
    console.log("fetching centres:", centresArr);
    // console.log(result)
    render_ISRO_data(centresArr);
    // print(centresArr);
  } catch (error) {
    console.error(error);
  }
}

fetch_ISRO_data(centresArr);

// console.log("centreArr", centresArr);

// function render_ISRO_data(centresArr) {
//   //   console.log(centres)
//   result_table.innerHTML = "";

//   centresArr.map((centre) => {
//     const { name, Place, State } = centre;

//     let table = document.createElement("table");

//     table.className = "card_container";

//     table.innerHTML += `
//       <thead class="table-header">
//         <tr class="table-header-row">
//             <th>CENTER</th>
//             <th>CITY</th>
//             <th>STATE</th>
//         </tr>
//        </thead>
//        <tbody class="table-body">
//         <tr class="table-body-row">
//             <td class="table-body-cell center">${name}</td>
//             <td class="table-body-cell city">${Place}</td>
//             <td class="table-body-cell state">${State}</td>
//         </tr>
//        </tbody>
//        `;
//     result_table.appendChild(table);
//   });
// }

function render_ISRO_data(centresArr) {
    //   console.log(centres)
    result_table.innerHTML = "";

    centresArr.map((centre) => {
        const {name, Place, State} = centre;

        let div = document.createElement("div");

        div.className = "card_container";

        div.innerHTML += `
     <div class="button-container">
          <div>CENTER</div>
          <div>CITY</div>
          <div>STATE</div>
    </div>

    <div class ="key-container">
         <div class="key-data center">${name}</div>
         <div class="key-data city">${Place}</div>
         <div class="key-data state">${State}</div>
    </div> 
   `;
        result_table.appendChild(div);
    });
}

// - **Step-2**: search functionality
//     - 1. when any user type anything in the `input field`
//          after selecting a `category` then the selected
//          centre's card will render which justify that
//          category type and match with the `input`.

//     - 2. Suppose you want to search which centres of ISRO
//          are there in the `state` Rajasthan then you
//          will click the button `state` and type the name
//          Rajasthan then it will show you all the centres
//          in the states of Rajasthan.

//     - 3. Make sure the search field is not case-sensitive.
//          The output for search input `Rajasthan` , `rajasthan`
//          should be same.

let btns = Array.from(document.querySelectorAll("button"));
btns = btns.filter((btn) => btn.id != "search_btn");
// console.log(btns);

// city == Place
// state == State
// centre == name
// let selectedBtn = centerBtn;
// console.log(selectedBtn);

btns.forEach((btn) => {
  btn.addEventListener("click", activeClass);
});

// which btn has invoked this function
function activeClass(e) {
  // e.target.classList.toggle("active");
  console.log(e.target);
  btns.forEach((btn) => {
    console.log(btn);
    // use switch conditiion if cond is city then selectedBtn is city
    if (btn == e.target) {
      e.target.classList.toggle("active");
      if (btn.classList.contains("active")) {
        selectedBtn = btn;
      } else {
        selectedBtn = centerBtn;
        render_ISRO_data(centresArr);
      }
    } else {
      btn.classList.remove("active");
    }
    console.log(btn);
  });
  console.log("selected", selectedBtn);
}

//modifying an array is expensive task

searchBtn.addEventListener("click", (e) => {
  let search = search_input.value.toLowerCase();
  console.log(search);
  console.log(selectedBtn.id);
  // city == Place
  // state == State
  // centre == name
  let key;
  if (selectedBtn.id == "city") {
    key = "Place";
  } else if (selectedBtn.id == "state") {
    key = "State";
  } else {
    key = "name";
  }
  console.log(key);
  let arr = centresArr.filter((center) => center[key].toLowerCase() == search);
  if(arr.length==0) {
    result_table.innerHTML = `
    <p class="result-not-found">result not found!</p>`
  }
  else{
    console.log(arr);
    render_ISRO_data(arr);
  }
  // render_ISRO_data(arr);
});

search_input.addEventListener("keyup", (e) => {
  // console.log("target", e.target.value);
  let search = search_input.value.toLowerCase();
  console.log("search", search);

  let key;
  if (selectedBtn.id == "city") {
    key = "Place";
  } else if (selectedBtn.id == "state") {
    key = "State";
  } else {
    key = "name";
  }

  let arr = centresArr.filter((center) => {
    // return center[key].toLowerCase() == (e.target.value).toLowerCase();
    return center[key].toLowerCase().includes(search);
  });

  if(arr.length == 0) {
    result_table.innerHTML = `
    <p class="result-not-found">result not found!</p>`
  }
  else {
    console.log(arr);
    render_ISRO_data(arr);
  }
  // render_ISRO_data(arr);
});

