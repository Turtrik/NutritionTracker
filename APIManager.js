var selected = [];
let responses = [];

var calorieLists = sessionStorage.getItem('calorieLists');
if (calorieLists == null) {
    calorieLists = [];
    sessionStorage.setItem('calorieLists', JSON.stringify(calorieLists));
}
else {
    calorieLists = JSON.parse(calorieLists);
}

function toSearch() {
    window.location.href = './testSite.html';
    console.log('tosearch ran');
}

function foodSearch() {
    let term =$.trim($("#foodSearch").val());
    var temphtml;
    var output = 
        '<div id="searchList" class="modal">' + 
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

function displayList() {
    var index;
    var foodList = document.createElement('div');
    foodList.setAttribute("id", "foodList");
    
    var output = 
        '<ul>';

    for (index = 0; index < selected.length; ++index) {
        output+= 
            '<li>' + (selected[index])['fields']['item_name'] + ', ' 
            + (selected[index])['fields']['nf_calories'] + ' kcal' + '&emsp;'
            + '<button class="btn btn-lg btn-success" style="height:24px;width:75px;" type="submit" onclick="removeItem(' + index + ')">Remove</button>'
            + '</li>';
    }

    var totalCalories = 0;

    for (index = 0; index < selected.length; ++index) {
        totalCalories += (selected[index])['fields']['nf_calories'];
    }

    totalCalories = totalCalories.toFixed(1);
    console.log(totalCalories);
    output += '<li>' + 'Total Calories: ' + totalCalories.toString() + '</li>';
    output += '</ul>';
    foodList.innerHTML = output;
    document.body.appendChild(foodList);
}

function saveList() {
    if (selected.length == 0) {
        return;
    }
    calorieLists.push(responses);
    console.log("LENGTH WOOO ", selected.length);
    selected = [];
    console.log("number of lists: ", calorieLists.length);
    displayList();
    sessionStorage.setItem("calorieLists", JSON.stringify(calorieLists));
    window.location.href = './home.html';
}

document.getElementById("saveList").addEventListener("click", saveList);