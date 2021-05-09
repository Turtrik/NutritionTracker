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
                output+= (calorieLists[index1])[]
            }
        }        
    }
    else {
        initialOutput.innerHTML = '<font size=\"+2\">It\'s your first time! Click the button below to create a new list. <br> <br></font>';
    }
    document.body.insertBefore(initialOutput, theButton);
}

document.addEventListener("DOMContentLoaded", loadLists);


function toSearch() {
    window.location.href = './testSite.html';
    console.log('tosearch ran');
}

document.getElementById("goToSearch").addEventListener("click", toSearch);
