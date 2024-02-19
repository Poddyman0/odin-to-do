document.addEventListener("DOMContentLoaded", function() {
    
    addToChecklist(projectsArr)
    addToProjectList(projectsArr)
    document.getElementById('new-todo-task-form').addEventListener('submit', function(event) {
        event.preventDefault()
        addAToDoTaskToListAndProject(projectsArr)
        addToProjectList(projectsArr)


    })
    

    




})


function AToDoTask(id, title, description, dueDate, priority, notes, checklist, toDoToProject) {
    this.id = id,
    this.title = title,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority,
    this.notes = notes,
    this.checklist = checklist,
    this.toDoToProject = toDoToProject
}

let AToDoTaskID = 4;
let projectsArr = [
    {projectName: "Make a Front end", toDoLists: [{
        id: 7,
        title: "CSS Styles",
        description: "Use CSS to make a fancy looking website",
        dueDate: "2024-02-18",
        priority: "high",
        notes: "Make a flexbox and grid.",
        checklist: [{id: 1, checkboxIsChecked: true, checkboxText: "make cards"}, {id: 2, checkboxIsChecked: false, checkboxText: "make container"}],
        toDoToProject: "Make a front end"
    }, {
        id: 6,
        title: "HTML layout",
        description: "Use HTML to add content",
        dueDate: "2024-03-19",
        priority: "medium",
        notes: "Make a header and footer.",
        checklist: [{id: 3, checkboxIsChecked: false, checkboxText: "make header text"}, {id: 4, checkboxIsChecked: true, checkboxText: "make footer contact details"}],
        toDoToProject: "Make a front end"
    }
    ]}, 
    {projectName: "Make a back end", toDoLists: [{
        id: 3,
        title: "SQL databse",
        description: "create tables and insert data",
        dueDate: "2024-03-01",
        priority: "low",
        notes: "Select all front tables and send to front end.",
        checklist: [{id: 5, checkboxIsChecked: false, checkboxText: "insert data"}, {id: 6, checkboxIsChecked: true, checkboxText: "make tables"}],
        toDoToProject: "Make a back end"
    }, {
        id: 4,
        title: "Node",
        description: "handle requests for data",
        dueDate: "2024-01-12",
        priority: "low",
        notes: "Make controllers",
        checklist: [{id: 7, checkboxIsChecked: false, checkboxText: "make get requests"}, {id: 8, checkboxIsChecked: false, checkboxText: "make post requests"}],
        toDoToProject: "Make a back end"
    }
    ]},    
];




function addToProjectList(projectsArr) {


    let projectList = document.getElementById('projectList')
    projectList.innerHTML = ''
    projectsArr.forEach((project) => {
        let projectOption = document.createElement('option')
        projectOption.innerHTML = `
        <option value="${project.projectName}">${project.projectName}</option>
    `
    projectList.appendChild(projectOption);
    })
    return projectsArr
}
let checkboxID = 8;
//below adds a checkbox after clicking button
function addToChecklist(projectsArr) {
    let checklistListCheckboxContainer = document.getElementById('checklistCheckboxContainer')
    document.getElementById('addToChecklistBtn').addEventListener('click', function(event) {
        event.preventDefault()
        checkboxID += 1;
        let checklistCheckBox = document.createElement('div')
        checklistCheckBox.id = `checkboxID-${checkboxID}`
        checklistCheckBox.innerHTML = `
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input id="checklistIsChecked-${checkboxID}" type="checkbox" name="checklist"  class="form-control" >
                    </div>
                </div>
                <input id="checklistText-${checkboxID}" type="text" class="form-control" style="height: 53px;">
            </div>
                `
            checklistListCheckboxContainer.appendChild(checklistCheckBox);
        })

    return projectsArr
}



function addAToDoTaskToListAndProject(projectsArr) {


        AToDoTaskID += 1;
        let id = AToDoTaskID;
        let title = document.querySelector('#title').value;
        let description = document.querySelector('#description').value;
        let dueDate = document.querySelector('#dueDate').value
        let priority = document.querySelector('#priority').value;
        let notes = document.querySelector('#notes').value;
        let checklist = []
        //renders existing DB checkboxes and new checkboxes just submitted
        for (let i = 9; i <= checkboxID; i++) {
            let isCheckedElement = document.getElementById(`checklistIsChecked-${i}`);
            let isCheckedBool = isCheckedElement ? isCheckedElement.checked : false;
            let checkboxTextElement = document.getElementById(`checklistText-${i}`);
            let checkboxTextInsert = checkboxTextElement ? checkboxTextElement.value : '';
            checklist.push({
                id: i,
                checkboxIsChecked: isCheckedBool,
                checkboxText: checkboxTextInsert
            });
        }

        let projectList = document.querySelector('#projectList').value
        let toDoToProject;
        if (document.querySelector('#toDoToProject').value !== "") {
            toDoToProject = document.querySelector('#toDoToProject').value;
        } else if (document.querySelector('#toDoToProject').value === "") {
            toDoToProject = projectList;
        }
        let ANewToDoTask = new AToDoTask(id, title, description, dueDate, priority, notes, checklist, toDoToProject)
        let projectCount = 0;
        projectsArr.forEach((project) => {
            projectCount += 1;
            if (project.projectName === toDoToProject) {
                project.toDoLists.push(ANewToDoTask)
            } else if (project.projectName !== toDoToProject) {
                if (projectCount === projectsArr.length) {
                    projectsArr.push({projectName: toDoToProject, toDoLists: [ANewToDoTask]})
                }
            }
        })
        const projectContainer = document.getElementById('projectContainer')

        projectContainer.innerHTML = ''
        projectsArr.forEach((project) => {
            const projectToDisplay = document.createElement('div')
            projectToDisplay.className = "project-card";
            projectToDisplay.id = `project-id-${project.projectName}`
            projectToDisplay.innerHTML = `
                <h3 id="project-id-${project.projectName}-title" class="projectTitleDisplay"><strong>Project: </strong>${project.projectName}</h3>
                <div><strong>${project.projectName} lists: </strong></div>
                <br>
                
                <div id="project-id-${project.projectName}-to-do-lists" ></div>
                </div>
            `
            projectContainer.appendChild(projectToDisplay);
        })

        projectsArr.forEach((project) => {
            let projectListsDisplay = document.getElementById(`project-id-${project.projectName}-to-do-lists`)
            projectListsDisplay.innerHTML = ''   
                project.toDoLists.forEach((toDoList) => {
                    let projectlistToDisplay = document.createElement('div');
                    if (toDoList.priority === "low") {
                        projectlistToDisplay.className = "low-priority"
                    } else if (toDoList.priority === "medium") {
                        projectlistToDisplay.className = "medium-priority"
                    } else if (toDoList.priority === "high") {
                        projectlistToDisplay.className = "high-priority"
                    }
                    projectlistToDisplay.id = `project-id-${project.projectName}-to-do-list-id-${toDoList.id}`
                    projectlistToDisplay.innerHTML = 
                            `<button id="toggleButton-${toDoList.id}" class="btn btn-info"><strong>View List: </strong>${toDoList.title}</button>
                            <br>
                            <div id="toggleDiv-${toDoList.id}">
                                <div><strong>Title: </strong>${toDoList.title}</div>
                                <div><strong>Description: </strong>${toDoList.description}</div>
                                <div><strong>Due Date: </strong>${toDoList.dueDate}</div>
                                <div><strong>Priority: </strong>${toDoList.priority}</div>
                                <div><strong>Notes: </strong>${toDoList.notes}</div>
                                <div><strong>Checklist: </strong>
                                    <br>
                                    <div id="checklist-${toDoList.id}"></div>
                                </div>
                                <button id="delete-to-do-${projectlistToDisplay.id}" class="btn btn-danger">Delete List</button>
                                <button id="edit-to-do-${projectlistToDisplay.id}" class="btn btn-warning">Edit List</button>
                                <br>
                                <div id="project-id-${project.projectName}-to-do-list-id-${toDoList.id}-eddit"></div>
                                <br>
                            </div>
                            `



                    
                    projectListsDisplay.appendChild(projectlistToDisplay);
                    document.getElementById(`delete-to-do-${projectlistToDisplay.id}`).addEventListener('click', function() {
                        let toDoListIDDelete = toDoList.id;
                        deleteToDoList(toDoListIDDelete)
                    })
                    // checks if eddit button is clicked
                    document.getElementById(`edit-to-do-${projectlistToDisplay.id}`).addEventListener('click', function() {
                        let toDoListIDEdit = toDoList.id;
                        editToDoList(toDoListIDEdit)
                    })
                    let toggleDiv = document.getElementById(`toggleDiv-${toDoList.id}`);
                    toggleDiv.style.display = "none"
                    document.getElementById(`toggleButton-${toDoList.id}`).addEventListener('click', function() {
                        let toDoListIDToggle = toDoList.id;
                        toggleDivDisplay(toDoListIDToggle, toggleDiv)
                    })
                })
                project.toDoLists.forEach((toDoList) => {
                    let checkListDisplay = document.getElementById(`checklist-${toDoList.id}`)
                    checkListDisplay.innerHTML = ''
                        toDoList.checklist.forEach((checkbox) => {
                            let aCheckbox = document.createElement('div');
                            aCheckbox.id = `to-do-list-id-${toDoList.id}-a-checkbox-id-${checkbox.id}`
                            aCheckbox.innerHTML = `
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input  type="checkbox" id="checklistBoolDisplayBool-${checkbox.id}" name="checklist" class="form-control">
                                    </div>
                                </div>
                                <input id="checklistBoolDisplayText-${checkbox.id}" type="text" style="height: 53px;" class="form-control" value="${checkbox.checkboxText}">
                            </div>
                            `
                            checkListDisplay.appendChild(aCheckbox)
                            let checkboxElement = document.getElementById(`checklistBoolDisplayBool-${checkbox.id}`) 
                            checkboxElement.checked = checkbox.checkboxIsChecked;
                        })
                    })   
                    
            })
            
            
        let addProjectform = document.getElementById('new-todo-task-form')
        addProjectform.reset()

        return projectsArr;
}
let isDivVisible = false;
function toggleDivDisplay(toDoListIDToggle, toggleDiv) {
    projectsArr.forEach((project) => {         
        project.toDoLists.forEach((toDoList) => {
            if (toDoList.id === toDoListIDToggle) {
                    if (isDivVisible) {
                        toggleDiv.style.display = 'none';
                        isDivVisible = false;
                    } else {
                        toggleDiv.style.display = 'block';
                        isDivVisible = true;
                    }
            }
            
        })
    })

    return projectsArr;

}



function deleteToDoList(toDoListIDDelete) {
    projectsArr.forEach((project) => {   
      
            project.toDoLists.forEach((toDoList) => {
                if (toDoList.id === toDoListIDDelete) {
                    toDoListDeleteDisplay = document.getElementById(`project-id-${project.projectName}-to-do-list-id-${toDoList.id}`)
                    toDoListDeleteDisplay.innerHTML = ''
                    toDoListDeleteDisplay.style.display = "none"
                    if (project.toDoLists.length === 1) {
                        document.getElementById(`project-id-${project.projectName}`).style.display = "none"
                    }

                }


            })

            for (let i = 0; i < project.toDoLists.length; i++) {
                if (project.toDoLists[i].id === toDoListIDDelete) {
                    project.toDoLists.splice(i, 1)
                }

            }

    })

    return projectsArr;
 
}

// edit detail. project id already known and specific edits
function editToDoList(toDoListIDEdit) {
    let checklistEdit = []
    projectsArr.forEach((project) => {         
        project.toDoLists.forEach((toDoList) => {

            if (toDoList.id === toDoListIDEdit) {

                let edditForm = document.getElementById(`project-id-${project.projectName}-to-do-list-id-${toDoList.id}-eddit`)
                edditForm.style.display = "block"
                edditForm.className = "edditFormLook"
                edditForm.innerHTML = `
                <form id="edit-todo-form-${toDoList.id}">
                    <label for="title-edit">Title: </label>
                    <input id="title-edit" name="title" type="text" class="form-control" value="${toDoList.title}" required>
        
                    <label for="description-edit">Description: </label>
                    <input id="description-edit" name="description" class="form-control" type="text" value="${toDoList.description}" required>
        
                    <label for="dueDate-edit">Due Date: </label>
                    <input id="dueDate-edit" name="dueDate" type="date" class="form-control" value="${toDoList.dueDate}" required>
        
                    <label for="priority-edit">Priority: </label>
                        <select id="priority-edit" name="priority" class="form-control" value="${toDoList.priority}" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
        
                    <label for="notes-edit">Notes: </label>
                    <input id="notes-edit" name="notes" type="text" class="form-control" value="${toDoList.notes}" required>
        
                    <label for="checklistCheckboxContainer-edit">Checklist: </label>
                    <br>
                    <button id="addToChecklistBtn-edit" name="addToChecklistBtn-edit" class="btn btn-primary">Add Checkbox</button>
                    <br>
                    <br>
                    <div id="checklistCheckboxContainer-edit">
                    </div>

                    <label for="projectList-edit">Add To Existing Project:</label>
                    <select id="projectList-edit" name="priority" class="form-control" required>
                    </select>
                    <br>
                    <div><strong>OR</strong></div>
                    <br>
                    <label for="toDoToProject-edit">Create New Project: </label>
                    <input id="toDoToProject-edit" name="toDoToProject" class="form-control" type="taxt" value="${toDoList.toDoToProject}" >
                    <br>
                    <button id="submit" name="submit" type="submit" class="btn btn-primary">Submit</button> 
                </form>
                `
                console.log("when entered in form", toDoList.title)

                // new level
                //adds projects to project list
                let projectListEdit = document.getElementById('projectList-edit')
                projectListEdit.innerHTML = ''

                projectsArr.forEach((project) => {
                    let projectOption = document.createElement('option')
                    projectOption.innerHTML = `
                    <option value="${project.projectName}">${project.projectName}</option>
                `
                projectListEdit.appendChild(projectOption);
                })
                //add a new chceckbox with empty box and empty text. Do not insert in checkbox list yet.

                let newCheckboxIDCheckAndTexts = []
                let currentCheckboxID = 0;
                let checkListDisplayEdit = document.getElementById(`checklistCheckboxContainer-edit`)
                document.getElementById('addToChecklistBtn-edit').addEventListener('click', function(event) {
                    event.preventDefault()
                    checkboxID += 1
                    currentCheckboxID = checkboxID;
                    let checklistCheckBoxEdit = document.createElement('div')
                    checklistCheckBoxEdit.id = `checkboxID-${checkboxID}-edit`
                    checklistCheckBoxEdit.innerHTML = `
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input id="checklistIsChecked-${checkboxID}-edit" type="checkbox" name="checklist"  class="form-control" >
                                </div>
                            </div>
                            <input id="checklistText-${checkboxID}-edit" type="text" class="form-control" style="height: 53px;">
                        </div>
                            `
                            newCheckboxIDCheckAndTexts.push({idedit: `${currentCheckboxID}`, checkboxCheckEdit: `checklistIsChecked-${checkboxID}-edit`, checkboxTextEdit: `checklistText-${checkboxID}-edit`})
                            checkListDisplayEdit.appendChild(checklistCheckBoxEdit);
                            return newCheckboxIDCheckAndTexts

                    })


                    let oldEdditedCheckboxIDCheckAndTexts = []

                //add existing checkboxes.

                        toDoList.checklist.forEach((checkbox) => {
                            let aCheckboxEdit = document.createElement('div');
                            aCheckboxEdit.id = `to-do-list-id-${toDoList.id}-a-checkbox-id-${checkbox.id}-edit`
                            aCheckboxEdit.innerHTML = `
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input  type="checkbox" id="checklistBoolDisplayBool-${checkbox.id}-edit" name="checklist" class="form-control">
                                    </div>
                                </div>
                                <input id="checklistBoolDisplayText-${checkbox.id}-edit" type="text" style="height: 53px;" class="form-control" value="${checkbox.checkboxText}">
                            </div>
                            `
                            
                            oldEdditedCheckboxIDCheckAndTexts.push({idedit: checkbox.id, checkboxCheckEdit: `checklistBoolDisplayBool-${checkbox.id}-edit`, checkboxTextEdit: `checklistBoolDisplayText-${checkbox.id}-edit`})
                            checkListDisplayEdit.appendChild(aCheckboxEdit)
                            return oldEdditedCheckboxIDCheckAndTexts;
                        })

                                            
                document.getElementById(`edit-todo-form-${toDoList.id}`).addEventListener('submit', function(event) {
                        event.preventDefault()

                        oldEdditedCheckboxIDCheckAndTexts.forEach((editedcheckbox) => {
                            let editedCheckboxID = editedcheckbox.idedit
                            let editedCheckboxValue = document.getElementById(editedcheckbox.checkboxCheckEdit)
                            let isCheckedBoolEdited = editedCheckboxValue ? editedCheckboxValue.checked : false;
                            let editedCheckboxTextValue = document.getElementById(editedcheckbox.checkboxTextEdit)
                            let checkboxTextEdited = editedCheckboxTextValue ? editedCheckboxTextValue.value : '';
                            checklistEdit.push({
                                id: editedCheckboxID,
                                checkboxIsChecked: isCheckedBoolEdited,
                                checkboxText: checkboxTextEdited
                            });  

                        })
                        function extractAndConvertNumbers(str) {
                            const regex = /\d+/g;
                            const numbers = str.match(regex);
                            const numbersAsNumbers = numbers.map(num => parseInt(num));
                            return numbersAsNumbers[0];
                        }
                        newCheckboxIDCheckAndTexts.forEach((newcheckbox) => {
                            let newCheckboxID = extractAndConvertNumbers(newcheckbox.checkboxCheckEdit)
                            let newCheckboxValue = document.getElementById(newcheckbox.checkboxCheckEdit)
                            let isCheckedBoolNew = newCheckboxValue ? newCheckboxValue.checked : false;
                            let newCheckboxTextValue = document.getElementById(newcheckbox.checkboxTextEdit)
                            let checkboxTextNew = newCheckboxTextValue ? newCheckboxTextValue.value : '';
                            checklistEdit.push({
                                id: newCheckboxID,
                                checkboxIsChecked: isCheckedBoolNew,
                                checkboxText: checkboxTextNew
                            });                        

                        })

                        //mpty checklistEdit = []

                        let titleEdit = document.querySelector('#title-edit').value;
                        let descriptionEdit = document.querySelector('#description-edit').value;
                        let dueDateEdit = document.querySelector('#dueDate-edit').value
                        let priorityEdit = document.querySelector('#priority-edit').value;
                        let notesEdit = document.querySelector('#notes-edit').value;
                        let projectListEdit = document.querySelector('#projectList-edit').value
                        let toDoToProjectedit;
                        console.log("value after click", titleEdit)
                        if (document.querySelector('#toDoToProject-edit').value !== "") {
                            toDoToProjectedit = document.querySelector('#toDoToProject-edit').value;
                        } else if (document.querySelector('#toDoToProject-edit').value === "") {
                            toDoToProjectedit = projectListEdit;
                        }
                        toDoList.title = titleEdit
                        toDoList.description = descriptionEdit
                        toDoList.dueDate = dueDateEdit
                        toDoList.priority = priorityEdit
                        toDoList.notes = notesEdit
                        toDoList.checklist = checklistEdit
                        toDoList.toDoToProject = toDoToProjectedit
                        console.log("db updated? click", toDoList.title)

                        let projectlistToDisplay = document.getElementById(`project-id-${project.projectName}-to-do-list-id-${toDoList.id}`)
                        if (toDoList.priority === "low") {
                            projectlistToDisplay.className = "low-priority"
                        } else if (toDoList.priority === "medium") {
                            projectlistToDisplay.className = "medium-priority"
                        } else if (toDoList.priority === "high") {
                            projectlistToDisplay.className = "high-priority"
                        }
                        projectlistToDisplay = ''
                        projectlistToDisplay.innerHTML = `
                            <div><strong>List: </strong></div>
                            <div><strong>Title: </strong>${toDoList.title}</div>
                            <div><strong>Description: </strong>${toDoList.description}</div>
                            <div><strong>Due Date: </strong>${toDoList.dueDate}</div>
                            <div><strong>Priority: </strong>${toDoList.priority}</div>
                            <div><strong>Notes: </strong>${toDoList.notes}</div>
                            <div><strong>Checklist: </strong><div id="checklist-${toDoList.id}"></div></div>
                            <button id="delete-to-do-${projectlistToDisplay.id}" class="btn btn-danger">Delete To Do</button>
                            <button id="edit-to-do-${projectlistToDisplay.id}" class="btn btn-warning">Edit To Do</button>
                            <br>
                            <div id="project-id-${project.projectName}-to-do-list-id-${toDoList.id}-eddit"></div>
                            <br>
                            `
                            

                            let checkListDisplay = document.getElementById(`checklist-${toDoList.id}`)
                            checkListDisplay.innerHTML = ''
                            

    
                            toDoList.checklist.forEach((checkbox) => {
                                console.log(checkbox)
                                let aCheckbox = document.createElement('div');
                                    aCheckbox.id = `to-do-list-id-${toDoList.id}-a-checkbox-id-${checkbox.id}`
                                    aCheckbox.innerHTML = `
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <input  type="checkbox" id="checklistBoolDisplayBool-${checkbox.id}" name="checklist" class="form-control">
                                            </div>
                                        </div>
                                        <input id="checklistBoolDisplayText-${checkbox.id}" type="text" style="height: 53px;" class="form-control" value="${checkbox.checkboxText}">
                                    </div>
                                    `
                                    checkListDisplay.appendChild(aCheckbox)
                                    if (checkbox.checkboxIsChecked === true) {
                                        let checkboxElement = document.getElementById(`checklistBoolDisplayBool-${checkbox.id}`) 
                                        checkboxElement.checked = true;


                                    } else if ((checkbox.checkboxIsChecked === false)) {
                                        let checkboxElement = document.getElementById(`checklistBoolDisplayBool-${checkbox.id}`) 

                                        checkboxElement.checked = false;


                                    }

                            })

                            checklistEdit = []
                            edditForm.innerHTML = ''
                            edditForm.style.display = "none"
                            addAToDoTaskToListAndProject(projectsArr)


                })
            }
        })

        return projectsArr

    })
}
