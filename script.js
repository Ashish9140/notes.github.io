Display();

document.getElementById("addNote").addEventListener("click", start);

function start() {
    let addText = document.getElementById("addText");

    let notes = localStorage.getItem("notes");

    let noteObj = [];

    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    if (addText.value != "")
        noteObj.push(addText.value);

    localStorage.setItem("notes", JSON.stringify(noteObj));

    addText.value = "";

    let important = localStorage.getItem("important");

    let colorArr;
    if (important == null) {
        colorArr = [];
    }
    else {
        colorArr = JSON.parse(localStorage.getItem("important"));
    }
    colorArr.push(1);
    localStorage.setItem("important", JSON.stringify(colorArr));

    let noteDate;
    let localDate = localStorage.getItem("localDate");
    if (localDate == null) {
        noteDate = [];
    }
    else {
        noteDate = JSON.parse(localDate);
    }
    let today = new Date();
    let time = today.getTime();
    noteDate.push(time);
    localStorage.setItem("localDate", JSON.stringify(noteDate));

    Display();

}

function Display() {
    let colorArr = JSON.parse(localStorage.getItem("important"));

    let noteObj = JSON.parse(localStorage.getItem("notes"));

    let sel = document.querySelector(".card-notes");

    sel.innerHTML = "";

    let noteDate = JSON.parse(localStorage.getItem("localDate"));
    let today = new Date();
    let time = today.getTime();
    if (noteObj != null) {
        noteObj.forEach(function (element, index) {

            let ago;
            let calculate = (time - noteDate[index]) / 1000;
            if (calculate < 60) {
                calculate = Math.round(calculate);
                ago = `${calculate} seconds ago`;
            }
            else if (calculate < 60 * 60) {
                calculate /= 60;
                calculate = Math.round(calculate);
                ago = `${calculate} minutes ago`;
            }
            else if (calculate < 60 * 60 * 24) {
                calculate /= (60 * 60);
                calculate = Math.round(calculate);
                ago = `${calculate} hours ago`;
            }
            else {
                calculate /= (24 * 60 * 60);
                calculate = Math.round(calculate);
                ago = `${calculate} days ago`;
            }
            let cre = document.createElement("div");
            cre.className = "card";
            cre.innerHTML = `<h1 class="noteNo">${ago}</h1>
                             <p class="para">${element}</p>
                             <div class="twoBtn">
                             <button class="delete" id="${index}" onclick="Delete(this.id)">Delete Note</button>
                             <button class="important" id="Imp${index}" title="Important" onclick="Important(this.id)"></button>
                             </div>`;
            sel.appendChild(cre);
            if (colorArr[index] == 1) {
                sel.children[index].style.backgroundColor = "white";
                let id = "Imp" + index;
                let change = document.getElementById(id);
                change.style.backgroundColor = "#d16f1a";
            }
            else {
                sel.children[index].style.backgroundColor = "rgb(215 202 201)";
                let id = "Imp" + index;
                let change = document.getElementById(id);
                change.style.backgroundColor = "black";
            }
        });
    }
}

function Delete(index) {

    let colorArr = JSON.parse(localStorage.getItem("important"));
    let noteObj = JSON.parse(localStorage.getItem("notes"));
    let noteDate = JSON.parse(localStorage.getItem("localDate"));
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));

    colorArr.splice(index, 1);
    localStorage.setItem("important", JSON.stringify(colorArr));

    noteDate.splice(index, 1);
    localStorage.setItem("localDate", JSON.stringify(noteDate));

    Display();
}

let search = document.getElementById("Searching");
search.addEventListener("input", Searched)

function Searched() {
    let val = search.value;

    let check = document.getElementsByClassName("card");

    Array.from(check).forEach(function (element, index) {

        let p = document.getElementsByTagName("p")[index].innerText;

        let a = p.search(val);
        if (a != (-1)) {
            check[index].style.display = "block";
        }
        else {
            check[index].style.display = "none";
        }
    })
}

function Important(id) {
    let colorArr = JSON.parse(localStorage.getItem("important"));
    if (colorArr[id[3]] == 1) {
        colorArr[id[3]] = 0;
    }
    else {
        colorArr[id[3]] = 1;
    }
    localStorage.setItem("important", JSON.stringify(colorArr));
    Display();
}

// setInterval(Display, 1000);