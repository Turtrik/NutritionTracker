const url = "https://nutrition-api.esha.com/foods?";

function searchItem() {

    $(function() {
        var params = {
            // Request parameters
            "query": "{string}",
            "start": "0",
            "count": "25",
            "spell": "true",
        };
      
        $.ajax({
            url: "https://nutrition-api.esha.com/foods?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Accept","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","dc8e8289462e42f991b651a6eb973145");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });
}