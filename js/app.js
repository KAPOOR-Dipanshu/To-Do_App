const item = document.querySelector("#item")
const toDoBox = document.querySelector("#to-do-box")

item.addEventListener(
    "keyup",
    function(event){
        if(event.key == "Enter"){
            addToDo(this.value)
            this.value = ""
            saveData();
        }
    }
)

const addToDo = (item) => {
    const listItem = document.createElement("li")
    listItem.innerHTML = `
            ${item}
            <i class="fas fa-times"></i>
    `;

    listItem.addEventListener(
        "click",
        function() {
            this.classList.toggle("done");
            saveData();
        }
    )
    listItem.querySelector("i").addEventListener(
        "click",
        function() {
            listItem.remove();
            saveData();
        }
    )
    toDoBox.appendChild(listItem)
}

const toggleSwitch = document.querySelector('#toggle-switch');
    toggleSwitch.addEventListener('change', function() {
      if (this.checked) {
        // Enable light mode
        document.body.classList.add('light-mode');
      }
      else{
        document.body.classList.remove('light-mode');
      }
    });

    function saveData() {
      const toDoItems = Array.from(toDoBox.children).map((listItem) => {
        return {
          text: listItem.textContent,
          isDone: listItem.classList.contains("done")
        };
      });
      localStorage.setItem("data", JSON.stringify(toDoItems));
    }
    
    function showTask() {
      const data = localStorage.getItem("data");
      if (data) {
        const toDoItems = JSON.parse(data);
        toDoItems.forEach((item) => {
          addToDo(item.text);
          const listItem = toDoBox.lastElementChild;
          if (item.isDone) {
            listItem.classList.add("done");
          }
        });
      }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
      showTask();
    });