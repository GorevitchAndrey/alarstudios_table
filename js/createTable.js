// window.addEventListener("load", function(event) {
  let table = document.getElementById("table");
  let editingTd = null;
  let regex = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;

  let tableData = [
    {name: "Andrey", phone: "+7(999)-788-99-16", id: 1},
    {name: "Alex", phone: "+7(999)346-20-96", id: 2},
    {name: "Anastasia", phone: "+7(999)-111-21-21", id: 3},
    {name: "Max", phone: "+7(999)-333-22-77", id: 4},
  ];

  // created error block
  let errorBlock = document.createElement('div');
  errorBlock.classList.add("errorBlock");
  errorBlock.textContent = 'Error, name connot be empty and phone type: +7(888)888-88-88';

  // drawing a table from data
  function initialTable(firstRenderingOfTheTable = true) {
    if (firstRenderingOfTheTable) {
      for (let item of tableData) {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let removeButton = document.createElement('button');

        removeButton.addEventListener("click", removeRow);
        removeButton.textContent = "Remove";
        removeButton.id = "deleteBtn";
        cell1.id = "tdName";
        cell2.id = "tdPhone";
        cell3.id = "tdDelete";
  
        cell1.innerHTML = item.name;
        cell2.innerHTML = item.phone;
        cell3.appendChild(removeButton);
  
        table.appendChild(row);
      }
    } else {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let removeButton = document.createElement('button');

      removeButton.addEventListener("click", removeRow);
      removeButton.textContent = "Remove";
      removeButton.id = "deleteBtn";
      cell1.id = "tdName";
      cell2.id = "tdPhone";
      cell3.id = "tdDelete";

      cell1.innerHTML = tableData[tableData.length - 1].name;
      cell2.innerHTML = tableData[tableData.length - 1].phone;
      cell3.appendChild(removeButton);
      table.appendChild(row);
    }
  };
  initialTable();

  // input validation
  function checkEmptyInput(){
    let isEmpty = false;
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let buttonsBlock = document.querySelector(".button-block");

    if (name === ""){
      if (phone) {
        let errorBlock = document.querySelector(".errorBlock");
        errorBlock?.remove()
      };
      buttonsBlock.appendChild(errorBlock);
      isEmpty = true;
    } else if (phone === "" || !regex.test(phone)){
      if (name) {
        let errorBlock = document.querySelector(".errorBlock");
        errorBlock?.remove()
      };
      buttonsBlock.appendChild(errorBlock);
      isEmpty = true;
    } else {
      document.querySelectorAll(".errorBlock").forEach( element => element.remove());
    }
    return isEmpty;
  }

  // adding a cell
  function addRow(){
    if(!checkEmptyInput()){
      let name = document.getElementById("name").value;
      let phone = document.getElementById("phone").value;
      let id = tableData.length + 1;

      tableData.push({ name, phone, id })
      initialTable(false);
      clearRow();
    }
  }

// cell editing
  table.onclick = function(event) {
    let target = event.target.closest('.edit-cancel,.edit-ok,td');

    if (!table.contains(target)) return;
    if (event.target.id == "tdDelete" || event.target.id == "deleteBtn") return;

    if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
    } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editingTd) return; // already being edited
      makeTdEditable(target);
    }
  };

  function makeTdEditable(td) {
    editingTd = {
      elem: td,
      data: td.innerHTML
    };

    td.classList.add('edit-td'); // td is in edit state, CSS will be applied to the replacementInput inside the cell

    let replacementInput = document.createElement('input');
    replacementInput.className = 'edit-area';

    replacementInput.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(replacementInput);
    replacementInput.focus();

    td.insertAdjacentHTML("beforeEnd",
      `<div class="edit-controls">
        <button class="edit-ok">OK</button>
        <button class="edit-cancel">CANCEL</button>
      </div>`
    );
  }

  function finishTdEdit(td, isOk) {
    if (isOk) {
      // validation for editable values
      if (td.id === "tdName" && td.firstChild.value) {
        td.innerHTML = td.firstChild.value;
      } else if (td.id === "tdPhone" && td.firstChild.value && regex.test(td.firstChild.value)) {
        td.innerHTML = td.firstChild.value;
      } else {
        document.querySelector('.edit-area').focus();
        td.appendChild(errorBlock)
        return;
      }
    } else {
      td.innerHTML = editingTd.data;
    }
    td.classList.remove('edit-td');
    editingTd = null;
  }

  // clears input lines
  function clearRow() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
  }

  // deletes a row
  function removeRow(){
    let flag = false;
    for(let i = 1; i < table.rows.length; i++){
      table.rows[i].onclick = function(){
        if (flag) return;
        flag = true;
        table.deleteRow(this.rowIndex);
      }
    };
    clearRow();
  }

  // hang event handlers
  document.getElementById("addBtn").addEventListener("click", addRow);
  document.getElementById("clearBtn").addEventListener("click", clearRow);
  document.querySelectorAll("#deleteBtn").forEach(item => {
    item.addEventListener("click", removeRow);
  })
// });