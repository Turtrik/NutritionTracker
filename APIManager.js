let responses = [];
let editMode = false;

let modalGoals;
let goal;

var calorieLists = sessionStorage.getItem('calorieLists');
if (calorieLists == null) {
    calorieLists = [];
    sessionStorage.setItem('calorieLists', JSON.stringify(calorieLists));
}
else {
    calorieLists = JSON.parse(calorieLists);
}

var selected = sessionStorage.getItem('currentList');
if (selected == null) {
    console.log('null!');
    selected = [];
}
else {
    console.log("not null...");
    selected = JSON.parse(selected);
    console.log(selected);
    sessionStorage.removeItem('currentList');
    displayList();
    editMode = true;
}

function toSearch() {
    window.location.href = './testSite.html';
    console.log('tosearch ran');
}

function foodSearch() {
    let term =$.trim($("#foodSearch").val());
    var temphtml;
    var output = 
        '<div id="searchList">' + 
        '   <span class="close"&times;</span>';
    responses = [];

    if (document.getElementById("foodList")!= null) {
        document.getElementById("foodList").remove();
    }

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + term + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "5e7fa4be77mshf5cf29e213fbd5fp121ee6jsn1bf1a62f3120",
            "x-rapidapi-host": "nutritionix-api.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        $.each(response['hits'], function(i, item) {
            responses.push(item);

            temphtml = 
                '<p>' + item['fields']['item_name'] + '&emsp;' + 
                '<button class="btn btn-lg btn-success" style="height:24px;width:75px;" type="submit" onclick="selectItem(' + i + ')">Select</button>'
                + '</p>';
            output += temphtml;
        });

        output += '</div>';

        $('#searchs').html(output);
    });
}

function selectItem(i) {
    selected.push(responses[i]);

    // Remove search list from display
    if (document.getElementById("searchList")!= null) {
        (document.getElementById("searchList")).remove();
    }

    if (document.getElementById("emptylist")!= null) {
        (document.getElementById("emptylist")).remove();
    }
    
    console.log(selected.length);
    console.log("REMOVED HTML ELEMENT");
    item = selected[selected.length-1];
    console.log(item['fields']);
    displayList();
}

function removeItem(i) {
    let removedItem = selected.splice(i, 1);

    if (document.getElementById("foodList")!= null) {
        (document.getElementById("foodList")).remove();
    }

    if (selected.length > 0) {
        displayList();
    }
    else {
        var temphtml = 
            '<p></p>'
            + '<i>List is empty</i>';
        var emptylist = document.createElement('div');
        emptylist.setAttribute("id", "emptylist");
        emptylist.innerHTML = temphtml;
        document.body.appendChild(emptylist);
    }
}

function findTotalCalories(x) {
    let totalCalories = 0;

    for (index = 0; index < x.length; ++index) {
        totalCalories += (x[index])['fields']['nf_calories'];
    }
    totalCalories = totalCalories.toFixed(1);
    console.log(totalCalories);

    if (goal >= 0) {
        return totalCalories + "/" + goal + " (" + ((totalCalories/Number(goal)) * 100) + "%)";
    } else {return totalCalories;}
    
}

function displayList() {
    var index;
    var foodList = document.createElement('div');
    foodList.setAttribute("id", "foodList");

    if (selected.length > 0) {
        if (document.getElementById("emptylist")!= null) {
            (document.getElementById("emptylist")).remove();
        }
    }
    
    var output = 
        '<ul>';

    for (index = 0; index < selected.length; ++index) {
        output+= 
            '<li>' + (selected[index])['fields']['item_name'] + ', ' 
            + (selected[index])['fields']['nf_calories'] + ' kcal' + '&emsp;'
            + '<button id="noPrint" onclick="removeItem(' + index + ')">Remove</button>'
            + '</li>';
    }

    output += '<li id="calories">' + 'Total Calories: ' + findTotalCalories(selected).toString() + '</li>';
    if (goal >= 0) {
        console.log(goal);
    }
    output += '</ul>' +
                '<button id = "saveList">' +
                    'Save List' +
                '</button>' +
                '<button id = "printList" onclick="window.print();">' +
                    'Print List' +
                '</button>' +
                '<button id = "setGoal" onclick="modalGoals.style.display =\'block\';">' +
                    'Set Goal' +
                '</button>';
    foodList.innerHTML = output;
    document.body.appendChild(foodList);
    modalGoals = document.getElementById("goalsModal");
    document.getElementById("saveList").addEventListener("click", saveList);
}

function setGoal() {
    goal =$.trim($("#goalCalories").val());

    if (Number(goal) < 0 || isNaN(Number(goal))) {
        alert("Invalid Calorie amount");
        return;
    }
    document.getElementById("calories").innerHTML = 'Total Calories: ' + findTotalCalories(selected).toString();

    modalGoals.style.display = 'none';
}
function saveList() {
    if (editMode == true) {
        var index = JSON.parse(sessionStorage.getItem('currentIndex'));
        //sessionStorage.removeItem('currentIndex');
        if (selected.length > 0) {
            calorieLists.splice(index, 1, selected);
        }
        else {
            calorieLists.splice(index, 1);
        }
    }
    else {
        if (selected.length == 0) {
            return;
        }
        calorieLists.push(selected);
        //selected = [];
    }
    sessionStorage.setItem("calorieLists", JSON.stringify(calorieLists));
    window.location.href = './home.html';
}

//document.getElementById("saveList").addEventListener("click", saveList);