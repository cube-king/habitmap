let i = 0
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear()
let day = date.getDate() 

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
            '<div class="dayredborder day'+containernum.toString()+'" data-daynum="'+step+'"></div>'
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
                <div class="statcontainer" id="statcontainer${containernum}"></div>
                <input type="text" class="titleinput" placeholder="Change Title" id="title${containernum}">
                <input type="number" class="amountinput" placeholder="Amount Done Today" id="amount${containernum}">
                <input type="number" class="amountgoalinput" placeholder="Set/Change Goal" id="amountgoal${containernum}">
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
                <div class="statcontainer" id="statcontainer${containernum}"></div>
                <input type="text" class="titleinput" placeholder="Change Title" id="title${containernum}">
                <input type="number" class="amountinput" placeholder="Amount Done Today" id="amount${containernum}">
                <input type="number" class="amountgoalinput" placeholder="Set/Change Goal" id="amountgoal${containernum}">
                <br class="break${containernum}">
                <br class="break${containernum}">
            </div>
        `)
    }
    createDays()
    shiftDays()
    addHeaderUpdates()
    addAmountUpdates()
    addAmountGoalUpdates()
    updateCompletedDays(containernum)
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
    if (containernum === 0) return;
    document.querySelectorAll('.day' + containernum).forEach(dayitem => {
        localStorage.removeItem(month + '/' + dayitem.dataset.daynum + ':amount' + containernum);
        const daycompletedamount = 0;
        dayitem.style.backgroundColor = "rgba(" + 14 * daycompletedamount + ", " + 253 * daycompletedamount + ", " + 114 * daycompletedamount + ", " + 0 + ")";
    });
    $('#graphcontainer' + containernum).remove();
    $('#title' + containernum).remove();
    $('#amount' + containernum).remove();
    $('#header' + containernum).remove();
    $('#horizline' + containernum).remove();
    $('#amountgoal' + containernum).remove();
    const breakElements = document.getElementsByClassName('break' + containernum);
    while (breakElements.length > 0) {
        breakElements[0].remove();
    }
    localStorage.removeItem('header' + containernum);
    console.log('Deleted container:', containernum);
    containernum--;
    localStorage.setItem("containernum", containernum);
}


function addHeaderUpdates() {
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
}

function addAmountUpdates() {
    document.querySelectorAll('.amountinput').forEach(aminput => {  
        aminput.addEventListener('input', function() {
            const parentContainerNum = aminput.parentElement.getAttribute('data-containernum');
            localStorage.setItem(month+'/'+day+':amount' + parentContainerNum, aminput.value)
            console.log('Amount updated ', localStorage.getItem(month+'/'+day+':+amount' + parentContainerNum))
            updateCompletedDays(parentContainerNum)
        });
    });
} 

function addAmountGoalUpdates() {
    document.querySelectorAll('.amountgoalinput').forEach(aginput => {   
        const parentContainerNum = aginput.parentElement.getAttribute('data-containernum')
        aginput.value = localStorage.getItem('amountgoal' + parentContainerNum)
        aginput.addEventListener('input', function() {
            localStorage.setItem('amountgoal' + parentContainerNum, aginput.value)
            console.log('Amount Goal updated ', localStorage.getItem('amountgoal' + parentContainerNum))
            updateCompletedDays(parentContainerNum)
        });
    });
}

function updateCompletedDays(pcn) {
    document.querySelectorAll('.day'+pcn).forEach(dayitem => {
        console.log("day is "+ dayitem.dataset.daynum + ", value is " + localStorage.getItem(month+'/'+dayitem.dataset.daynum+':amount' + pcn))
        var daycompletedamount = localStorage.getItem(month+'/'+dayitem.dataset.daynum+':amount' + pcn) / localStorage.getItem('amountgoal' + pcn)
        dayitem.style.backgroundColor = "rgba("+14*daycompletedamount+", "+253*daycompletedamount+", "+114*daycompletedamount+","+0+daycompletedamount+")"; 
    })
}

loadContainerNums()
addHeaderUpdates()
addAmountUpdates()
addAmountGoalUpdates()
