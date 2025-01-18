let i = 0
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear()
let debugTitle = document.getElementById('title')
let elements = 0
let containernum = 0
let preExistingContainers = localStorage.getItem("containernum")

$('.newgoalbutton').on("click",function(){
    createNewGoal()
})

$('.deletegoalbutton').on("click",function(){
    deleteLastGoal()
})

function createDays() {
    for (let step = 0; step < daysInMonth(year,month); step++) {
        elements++
        $('#graphcontainer'+containernum+'').append(
            '<div class="day" data-daynum="'+step+'"></div>'
        );
    }
}

function shiftDays() {
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    for (let days = 0; days < 6 - firstDay; days++) {
        $('#graphcontainer'+containernum+'').prepend(
            '<div class="dayspacer"></div>'
        );
        elements++
    }
}

function createNewGoal() {
    containernum++
    if (localStorage.getItem('header' + containernum) == null) {
        $('.container').append(`
            <div class="overarchingcontainer" data-containernum="${containernum}">
                <h1 id="header${containernum}">Goal #${containernum}:</h1>
                <hr id="horizline${containernum}">
                <br class="break${containernum}">
                <div class="graphcontainer" id="graphcontainer${containernum}"></div>
                <input type="text" class="titleinput" id="title${containernum}">
                <input type="text" class="amountinput" id="amount${containernum}">
                <br class="break${containernum}">
                <br class="break${containernum}">
            </div>
        `)
    }
    else {
        $('.container').append(`
            <div class="overarchingcontainer" data-containernum="${containernum}">
                <h1 id="header${containernum}">${localStorage.getItem('header' + containernum)}</h1>
                <hr id="horizline${containernum}">
                <br class="break${containernum}">
                <div class="graphcontainer" id="graphcontainer${containernum}"></div>
                <input type="text" class="titleinput" id="title${containernum}">
                <input type="text" class="amountinput" id="amount${containernum}">
                <br class="break${containernum}">
                <br class="break${containernum}">
            </div>
        `)
    }
    debugTitle.textContent = containernum
    createDays()
    shiftDays()
    localStorage.setItem("containernum",containernum)
}

function loadContainerNums() { 
    if (!(Number(preExistingContainers) == 0 && Number(preExistingContainers) == null)) {
        for (let count = 0; count < preExistingContainers; count++) {
            createNewGoal()
        }
    }
}

function deleteLastGoal() { 
    if (!containernum == 0) {
        $('#graphcontainer'+containernum+'').remove();
        $('#title'+containernum+'').remove();
        $('#amount'+containernum+'').remove();
        $('#header'+containernum+'').remove();
        $('#horizline'+containernum+'').remove();
        const breakElements = document.getElementsByClassName('break' + containernum);
        while (breakElements.length > 0) {
            breakElements[0].remove();
        }
        localStorage.removeItem('header' + containernum);
        console.log(localStorage.getItem('header' + containernum))
        containernum--
        debugTitle.textContent = containernum
        localStorage.setItem("containernum",containernum)
    }
}

loadContainerNums()

document.querySelectorAll('.titleinput').forEach(ttinput => {  
    ttinput.addEventListener('input', function() {
        const parentContainerNum = ttinput.parentElement.getAttribute('data-containernum');
        const header = document.getElementById('header' + parentContainerNum);
        if (header) {
            header.textContent = "Goal #" + parentContainerNum + ": " + ttinput.value;
            localStorage.setItem('header' + parentContainerNum, header.textContent)
        } else {
            console.warn(`No header found with ID: header${parentContainerNum}`);
        }
        console.log('Header updated');
    });
});
