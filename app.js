$(document).ready(function () {
    let darkTheme = localStorage.getItem('dark-theme') ? localStorage.getItem('dark-theme') : false;
    let circle = $('#circle');
    let themeBtn = $('#themeBtn');
    let fa = $('.fa');
    let listOfTasks = $('.listOfTasks');

    if (darkTheme === 'true') {
        $(circle).animate({
            right: '43px'
        }, 400)
        $(themeBtn).css("background-color", "lightgrey");
        $('body, .tasks, .headerElement, .addTask, .saveTask, .addedTask, .listOfTasks, .icons').addClass('dark');

        if($(circle).find($(fa)).hasClass('fa-moon')) {

            $(circle).find($(fa))
                .removeClass('fa-moon')
                .addClass('fa-sun')
        }
    } else {
        $(circle).animate({
            right: '100px'
        }, 400)
        $(themeBtn).css("background-color", "black");
        $('body, .tasks, .headerElement, .addTask, .saveTask, .addedTask, .listOfTasks, .icons').removeClass('dark');
        if($(circle).find($(fa)).hasClass('fa-sun')) {
            $(circle).find($(fa))
                .removeClass('fa-sun')
                .addClass('fa-moon')
        }
    }
    JSON.parse(localStorage.getItem('dark-theme'));
    let tasksList = JSON.parse(localStorage.getItem('tasks'));

    if(tasksList == null || tasksList.length === 0) {
        let newTask = `<div class="taskField"><i class="fa fa-pencil" id="edit"></i><input type="text" class="addedTask" id="task">
            <i class="fa-solid fa-check icons" id="done"></i><i class="fa-solid fa-trash-can icons" id="delete"></i></div>`
        $(listOfTasks).append(newTask)
    }
    else {
        for (let i = 0; i < tasksList.length; i++) {
            let task = tasksList[i];
            let newTask = `<div class="taskField"><i class="fa fa-pencil" id="edit"></i><input type="text" class="addedTask" id="task" value="${task}" style="border-left-color: ${getRandomColor()}">
            <i class="fa-solid fa-check icons" id="done"></i><i class="fa-solid fa-trash-can icons" id="delete"></i></div>`
            $(listOfTasks).append(newTask)
        }
    }
})

$(document).on('click', '#saveTaskBtn', function () {
    let addedTask = $('.addedTask');
    let value = $(addedTask).last().val().trim();
    let getTasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksList = getTasks !== null ? getTasks : [];

    tasksList.push(value)
    localStorage.setItem('tasks', JSON.stringify(tasksList))
})

$(document).on('click', '#addTaskBtn', function () {
    let newTask = '<div class="taskField"><i class="fa fa-pencil" id="edit"></i><input type="text" class="addedTask" id="task">' +
        '<i class="fa-solid fa-check icons" id="done"></i><i class="fa-solid fa-trash-can icons" id="delete"></i></div>'
    let addedTask = $('.addedTask');
    let listOfTasks = $('.listOfTasks');
    let isEmpty = false;

    $(addedTask).each(function () {
        if($(this).val().trim() === '') {
            alert("You must write something!");
            isEmpty = true;
        }
    })
    if(!isEmpty) {
        $(listOfTasks).append(newTask);
    }

    $(addedTask).last().css('border-left-color', getRandomColor());
})

$(document).on('click', '#edit', function () {
    let addedTask = $('.addedTask');
    let taskField = $('.taskField');
    let editedTask = $(this).closest(taskField).find(addedTask).focus().val().trim();
    let getTasks = JSON.parse(localStorage.getItem('tasks'));
    let taskIsEdited = getTasks.filter(c => c !== editedTask);
    localStorage.setItem('tasks', JSON.stringify(taskIsEdited));
})

$(document).on('click', '#done', function () {
    let isEmpty = false;
    let addedTask = $('.addedTask');
    let taskField = $('.taskField');
    let value = $(addedTask).last().val().trim();
    let getTasks = JSON.parse(localStorage.getItem('tasks'));
    let done = $(this).closest(taskField).find(addedTask).val();
    let taskIsDone = getTasks.filter(c => c !== done);

    if(value === '') {
        alert("You must write something!");
        isEmpty = true;
    }

    if(!isEmpty) {
        $(this).closest(taskField).animate({
            height: 'toggle'}, 700, 'linear')
        $(this).closest(taskField).find(addedTask).css("background-color", "lightgreen");

        localStorage.setItem('tasks', JSON.stringify(taskIsDone));
    }
})

$(document).on('click', '#delete', function () {
    let taskField = $('.taskField');
    let addedTask = $('.addedTask');
    $(this).closest(taskField).animate({
        width: 'toggle'}, 700, 'linear')
    $(this).closest(taskField).find(addedTask).css("background-color", "#F5F5DC");
    let getTasks = JSON.parse(localStorage.getItem('tasks'));
    let removedTask = $(this).closest(taskField).find(addedTask).val();
    let taskIsRemoved = getTasks.filter(c => c !== removedTask);
    localStorage.setItem('tasks', JSON.stringify(taskIsRemoved));
})

$(document).on('click', '#circle', function () {
    let darkTheme;
    let themeBtn = $('#themeBtn');
    let fa = $('.fa');

    if($(this).find(fa).hasClass('fa-moon')) {
        $(this).animate({
            right: '43px'
        }, 400)
        $(themeBtn).css("background-color", "lightgrey");
        $('body, .tasks, .headerElement, .addTask, .saveTask, .addedTask, .listOfTasks, .icons').addClass('dark');

        darkTheme = 'true';
        localStorage.setItem('dark-theme', darkTheme);
        $(this).find($(fa)).removeClass('fa-moon').addClass('fa-sun');
        return false;
    }
    if($(this).find(fa).hasClass('fa-sun')) {
        $(this).animate({
            right: '100px'
        }, 400)
        $(themeBtn).css("background-color", "black");
        $('body, .tasks, .headerElement, .addTask, .saveTask, .addedTask, .listOfTasks, .icons').removeClass('dark');
        darkTheme = 'false';
        localStorage.setItem('dark-theme', darkTheme);
        $(this).find($(fa)).removeClass('fa-sun').addClass('fa-moon');
        return false;
    }
})

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}








