let input = document.getElementById("inputBox");
let inputViaBtn = document.getElementById("button-addon");
let itemsDiv = document.getElementById("items");

input.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    createData(e.target.value);
    input.value = "";
  }
});

inputViaBtn.addEventListener("click", (e) => {
  createData(input.value);
  input.value = "";
  
});

function render(data) {
  itemsDiv.innerHTML = "";
  data.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item?.data;
    li.setAttribute("id", item?.id);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger";
    deleteButton.addEventListener("click", () => deleteButtonFn(item?.id));

    let updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.className = "btn btn-warning";
    updateButton.addEventListener("click", () => updateButtonFn(item?.id,item?.data));

    let span = document.createElement("span");
    span.className = "groupBtn";

    span.append(deleteButton);
    span.append(updateButton);

    li.append(span);

    itemsDiv.append(li);
  });
}

function deleteButtonFn(id) {
  // arr.splice(data, 1);
  deleteData(id);
}

function updateButtonFn(id,data) {
  let upDatePrompt = prompt("Enter Item : ", data);

  if (upDatePrompt) {
    upDateData(id,upDatePrompt)
  }
}

async function getDatas() {
  const data = await fetch("https://6073db87066e7e0017e786f2.mockapi.io/data");
  const jsonData = await data.json();
  render(jsonData)
}

function createData(data) {
  const newTask = {
    data: data,
  };

  fetch("https://6073db87066e7e0017e786f2.mockapi.io/data", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newTask),
  })
    .then((res) => {
      if (res.ok) {
        getDatas();
        return res.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function upDateData(id,data) {
  const newTask = {
    data: data,
  };

  fetch(`https://6073db87066e7e0017e786f2.mockapi.io/data/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    // Send your data in the request body as JSON
    body: JSON.stringify(newTask),
  })
    .then((res) => {
      if (res.ok) {
        getDatas();
        return res.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteData(id) {

  fetch(`https://6073db87066e7e0017e786f2.mockapi.io/data/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      getDatas();
      console.log('Data deleted')
    })
    .catch((error) => {
      console.log(error);
    });
}


getDatas();

