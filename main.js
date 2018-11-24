document.addEventListener('DOMContentLoaded', init);

var nameMonth = ['Студзень','Люты','Сакавiк','Красавiк','Травень','Чэрвень','Лiпень','Жнiвень','Верасень','Кастрычнiк','Лiстапад','Снежань'];
var nameDay = ['Нядзеля','Панядзелак','Аўторак','Серада','Чацвер','Пятнiца','Субота'];
let today = new Date(); 


function init() {
    var currentDate = new Date();
    setInterval(setCurrentTime, 1000);
    setCurrentDate(currentDate);
    setCurrentMonth(currentDate);
    setSelectedDay('Сёння');
    drowMonth(currentDate);
    
    let  monthBody = document.getElementById('days-area');
    monthBody.addEventListener('click', changeSelectedDay);

    let prevBtn = document.getElementById('button-prev');
    prevBtn.addEventListener('click', () => arrowClickHandler(currentDate, '-'));

    let nextBtn = document.getElementById('button-next');
    nextBtn.addEventListener('click',() => arrowClickHandler(currentDate, '+'));        
}

function drowMonth(selectDate){
    let  monthBody = document.getElementById('days-area');
    monthBody.innerHTML = '';

    let tempDate = new Date(selectDate.getFullYear(), selectDate.getMonth(),selectDate.getDate());
    const firstDayInTheMonth = 1;
    tempDate.setDate(firstDayInTheMonth);

    let tempDay = tempDate.getDay();
    const noMonday = tempDay !== 1; 

    if (noMonday) {
        const isSunday = tempDay === 0;
        const dateToSet = isSunday ? firstDayInTheMonth - 6 : firstDayInTheMonth - tempDay + 1;
        tempDate.setDate(dateToSet);
    }
    

    for (let i = 0; i < 6; i++) {
        let weekItem = document.createElement('div');
        weekItem.classList.add('week-row');

            nameDay.forEach(() => {

                let dayItem = document.createElement('div');
                let date = tempDate.getDate();
                dayItem.classList.add("month-date");   
                dayItem.innerText = date;
                let ifPrevDate = tempDate.getMonth() !== selectDate.getMonth();
                let isToday = tempDate.toDateString() === today.toDateString();

                    if (ifPrevDate){
                        dayItem.classList.add('prev-date');
                    };
                    if (isToday) {
                        dayItem.classList.add('today');
                    }

                tempDate.setDate(date + 1);
                weekItem.appendChild(dayItem);                          
            });

        monthBody.appendChild(weekItem);
    }
}

function changeSelectedDay(e) {    
        if (e.target.classList.contains('month-date')) {
            let listWords = [...document.getElementsByClassName('month-date')];    
        let  i = listWords.indexOf(e.target);
        i +=1;
        setSelectedDay(`${nameDay[i%7]} ${e.target.textContent}`);    
        }
      
}

function arrowClickHandler(currentDate, operator) {
    switch(operator) {
        case '+':
            currentDate.setMonth( currentDate.getMonth() + 1);
            break;
        case '-':
            currentDate.setMonth( currentDate.getMonth() - 1);
            break;
        default:
            throw new Error('Operator not found');
            break;
    }
    setCurrentMonth(currentDate);  
    drowMonth(currentDate);
}

function setSelectedDay(day) {
    const selectedDay = document.getElementById('selected-date');
    selectedDay.innerText = day;
}

function setCurrentDate(currentDate) {
    const date = document.getElementById('date');
    date.innerText = `${nameDay[currentDate.getDay()]} ${nameMonth[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}
function setCurrentMonth(currentDate) {
    const checkedMonth = document.getElementById('checked-month');
    checkedMonth.innerText = `${nameMonth[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function setCurrentTime() {
    const currentDate = new Date(); 
    let time = document.getElementById('time'); 
    time.innerText = currentDate.toLocaleTimeString();
}