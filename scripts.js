const inputElement = document.querySelector(".novo-item-input")
const addItenButton = document.querySelector(".novo-item-button")

const itensContent = document.querySelector(".itens-container")

const validateInput = () => inputElement.value.trim().length > 0;

const additem = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const itenscontainer = document.createElement('div');
    itenscontainer.classList.add('itens');

    const itemText = document.createElement('p');
    itemText.innerText = inputElement.value;
    itemText.addEventListener("click", () => riscarClick(itemText));

    const deleteItemButton = document.createElement('i');
    deleteItemButton.classList.add("fa-solid");
    deleteItemButton.classList.add("fa-trash");
    deleteItemButton.addEventListener("click", () =>
    deletarClick(itenscontainer, itemText));


    itenscontainer.appendChild(itemText);
    itenscontainer.appendChild(deleteItemButton);
    itensContent.appendChild(itenscontainer);

    inputElement.value = "";

    updateLocalStorage();

};
  

const additemchange = () => {
    const inputIsValid = validateInput();
  
    if (inputIsValid) {
      return inputElement.classList.remove("error");
    }
  };

  const riscarClick = (itemText) => {
    const items = itensContent.childNodes;
  
    for (const item of items) {
      const currentTaskIsBeingClicked = item.firstChild === itemText;
  
      if (currentTaskIsBeingClicked && "classList" in item.firstChild) {
        item.firstChild.classList.toggle("completed");
      }
    }
  
    updateLocalStorage();
  };
  

  const deletarClick = (itenscontainer, itemText) => {
    const items = itensContent.childNodes;
  
    for (const item of items) {
      const currentTaskIsBeingClicked = item.firstChild === itemText ;
  
      if (currentTaskIsBeingClicked) {
        itenscontainer.remove();
      }
    }
    updateLocalStorage();
  }

  ;
 
  const updateLocalStorage = () => {
    const itens = itensContent.childNodes;

    const localStorageTasks = [...itens].filter((item) => item.firstChild && "classList" in item.firstChild).map((item) => {
        const content = item.firstChild;
        const isCompleted = content.classList.contains("completed");
    
        return {
          description: content.innerText,
          isCompleted,
        };
      });

    localStorage.setItem("items", JSON.stringify(localStorageTasks));
  };

const refreshItemsLocalStorage = () => {
    const ItemsFromLocalStorage = JSON.parse(localStorage.getItem("items"))
    if (!ItemsFromLocalStorage) return;

    for (const item of ItemsFromLocalStorage) {
        const itenscontainer = document.createElement('div');
        itenscontainer.classList.add('itens');

        const itemText = document.createElement('p');
        itemText.innerText = item.description;

        if (item.isCompleted) {
            itemText.classList.add("complete");
        }
        itemText.addEventListener("click", () => riscarClick(itemText));
        const deleteItemButton = document.createElement('i');
        deleteItemButton.classList.add("fa-solid");
        deleteItemButton.classList.add("fa-trash");
        deleteItemButton.addEventListener("click", () =>
        deletarClick(itenscontainer, itemText));
    
    
        itenscontainer.appendChild(itemText);
        itenscontainer.appendChild(deleteItemButton);
        itensContent.appendChild(itenscontainer);
    
        inputElement.value = "";
    }
}
;
refreshItemsLocalStorage()

addItenButton.addEventListener("click", () => additem());
inputElement.addEventListener("change", () => additemchange());