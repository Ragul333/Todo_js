let input = document.getElementById("inputBox");
let itemsDiv = document.getElementById("items");
let update  = false;
let updateId;
let arr = [];

input.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
        arr.push(e.target.value);
    input.value = "";
    render();
  }
});

function render() {
  itemsDiv.innerHTML = "";
  arr.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerText = item;
    li.setAttribute("id", index);

    
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener("click", () => deleteButtonFn(index));
    
    let updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.className = 'btn btn-warning';
    updateButton.addEventListener("click", () => updateButtonFn(index));
    
    let span = document.createElement('span');
    span.className = 'groupBtn';

    span.append(deleteButton);
    span.append(updateButton);

    li.append(span);

    itemsDiv.append(li);
  });
}

function deleteButtonFn(data) {
  arr.splice(data, 1);
  render();
}

function updateButtonFn(data) {
    let upDatePrompt = prompt('Enter Item : ', arr[data])

    if(upDatePrompt){
        arr[data] = upDatePrompt;
        render()
    }
}
