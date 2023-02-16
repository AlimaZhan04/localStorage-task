let name = document.querySelector(".name");
let email = document.querySelector(".email");
let img = document.querySelector(".imageUrl");
let phone = document.querySelector(".phone");
let button = document.querySelector(".btn");
let ul = document.querySelector(".list");
button.addEventListener("click", () => {
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !img.value.trim() ||
    !phone.value.trim()
  ) {
    alert("fill the planks please!");
    return;
  }

  let obj = {
    name: name.value,
    email: email.value,
    image: img.value,
    number: phone.value,
  };
  setItemToStorage(obj);
});

function setItemToStorage(task) {
  if (!localStorage.getItem("user-data")) {
    localStorage.setItem("user-data", "[]");
  }

  let data = JSON.parse(localStorage.getItem("user-data"));

  data.push(task);

  localStorage.setItem("user-data", JSON.stringify(data));
  createElement();
}

createElement();
function createElement() {
  if (!localStorage.getItem("user-data")) {
    //? если нет, то добавляем по данным ключом пустой массив
    localStorage.setItem("user-data", "[]");
  }
  // ? стягиваем данные из LOcalStorage и преобразовывем в js формат
  let newData = JSON.parse(localStorage.getItem("user-data"));
  ul.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnEdit = document.createElement("button");
    let btnDel = document.createElement("button");
    let card = document.createElement("div");
    card.classList.add("card");
    // console.log(item);
    card.innerHTML = `<li><h3>${item.name}</h3></li><li><p>${item.email}</p><li><p>${item.number}</p></li></li><img style="width: 40%; ;border-radius:25%" src=${item.image} alt="alima">`;
    btnEdit.innerText = "Edit";
    btnDel.innerText = "delate";

    card.append(btnEdit);
    card.append(btnDel);
    ul.append(card);

    btnDel.addEventListener("click", () => {
      delateElement(index);
    });

    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

function delateElement(index) {
  let delate = JSON.parse(localStorage.getItem("user-data"));
  delate.splice(index, 1);
  localStorage.setItem("user-data", JSON.stringify(delate));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");
let inpEdit4 = document.querySelector(".inp-edit4");

let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("user-data"));
  inpEdit.value = data[index].name;
  inpEdit2.value = data[index].email;
  inpEdit3.value = data[index].image;
  inpEdit4.value = data[index].number;

  inpEdit.setAttribute("id", index);
}

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("user-data"));
  let index = inpEdit.id;
  if (
    !inpEdit.value.trim() ||
    !inpEdit2.value.trim() ||
    !inpEdit3.value.trim() ||
    !inpEdit4.value.trim()
  ) {
    alert("заполните поля");
    return;
  }

  let editedTask = {
    name: inpEdit.value,
    email: inpEdit2.value,
    image: inpEdit3.value,
    number: inpEdit4.value,
  };

  data.splice(index, 1, editedTask);

  mainModal.style.display = "none";

  localStorage.setItem("user-data", JSON.stringify(data));

  createElement();
});
