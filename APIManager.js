let selected = [];
let responses = [];

function foodSearch() {
    let term =$.trim($("#foodSearch").val());
    var temphtml;
    var output = 
        '<div id="modal" class="modal">' + 
        '   <span class="close"&times;</span>';
    responses = [];


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

    console.log(selected);
}
