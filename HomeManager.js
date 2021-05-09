let calorieLists = sessionStorage.getItem('calorieLists');

if (calorieLists == null) {
    calorieLists = []
}
else {
    calorieLists = JSON.parse(calorieLists);
}

function loadLists() {
    let theButton = document.getElementById('goToSearch');
    var initialOutput = document.createElement('div');
    initialOutput.setAttribute("id", "initialOutput");
    console.log(calorieLists.length);

    if (calorieLists.length > 0) {
        var output = '<ul>';

        var index1;
        var index2;
        for (index1 = 0; index1 < calorieLists.length; ++index1) {
            output+= '<li>'
            for (index2 = 0; index2 < (calorieLists[index1]).length; ++index2) {
                output+= ((calorieLists[index1])[index2])['fields']['item_name'] + ', ';
            }
            output+= '<b>' + findTotalCalories((calorieLists[index1])).toString() + ' total cal' + '</b>' + '&emsp;';
            output+= '<button class="btn btn-lg btn-success" style="height:24px;width:75px;" type="submit" onclick="removeItem(' + index1 + ')">Edit</button>' + '&emsp;';
            output+= '<button class="btn btn-lg btn-success" style="height:24px;width:75px;" type="submit" onclick="removeList(' + index1 + ')">Remove</button>';
            output+= '</li>';
        }
        output+= '</ul>';
        initialOutput.innerHTML = output;
    }
    else {
        initialOutput.innerHTML = '<font size=\"+2\">It\'s your first time! Click the button below to create a new list. <br> <br></font>';
    }
    document.body.insertBefore(initialOutput, theButton);
}

function removeList(i) {
    calorieLists.splice()
}

function updateCalorieLists() {
    
}

function findTotalCalories(x) {
    let totalCalories = 0;

    for (index = 0; index < x.length; ++index) {
        totalCalories += (x[index])['fields']['nf_calories'];
    }
    totalCalories = totalCalories.toFixed(1);
    console.log(totalCalories);
    return totalCalories;
}

document.addEventListener("DOMContentLoaded", loadLists);


function toSearch() {
    window.location.href = './testSite.html';
    console.log('tosearch ran');
}

document.getElementById("goToSearch").addEventListener("click", toSearch);
