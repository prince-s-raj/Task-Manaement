
let globalTaskData = [];
taskContents = document.getElementById("taskContentsrow")

const addCard = () =>{
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value
    };
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));
    globalTaskData.push(newTaskDetails);     //update our globalStore
    saveToLocalStorage();
 }

 const generateTaskCard = ({id, url, title, type, description}) =>{
    return (`<div class="col-md-6 col-lg-4 mt-3 " id = ${id} key = ${id}>
    <div class="card">
        <div class="cad-header">
            <div class="card-header d-flex justify-content-end">
                <button type="button" class="btn btn-outline-success" name=${id} onclick="editTaskCard(this)">
                    <i class="fas fa-pencil-alt"></i></button>
                </button>
   
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTaskCard(this)" style="margin-left:5px;">
                 <i class="fa fa-trash"></i>  
                </button>
             </div>
        </div>
        <img class="card-img-top" src=${url} alt="Added images" style="height:300px">
        <div class="card-body">
            <h5 class="card-title fw-bolder text-primary">${title}</h5>
            <p class="card-text">${description}</p>
            <span class="badge bg-primary">${type}</span>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-end">Open task</button>
        </div>
    </div>
    </div>`);
 }

 const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({tasks: globalTaskData}));
}


const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));  //localstorage to get tasky card data
    if(localStorage){
        globalTaskData = localStorageCopy["tasks"];
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

// Delete the Task
const deleteTaskCard = (event) => {

    const targetID = event.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();  
  };



  //edit
  const editTaskCard = (event) =>{
      const targetID = event.getAttribute("name");

      event.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
      event.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
      event.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")

      event.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
      event.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML= "SAVE CHANGES"

  }
  const saveEditTask = (event) => {
      const targetID = event.getAttribute("name");

  }