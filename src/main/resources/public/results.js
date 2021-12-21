jQuery
$
$.getJSON('http://localhost:8080/parties/', function(data) {
    let html = ""
    let voteTotal = 0
    $.each(data, function( index, party) {
        voteTotal+=parseInt(party["votes"])
    });

    $.each(data, function( index, party) {
        const percentages = parseInt(party["votes"])/voteTotal*100
        html+=`<tr id="${party["id"]}">`
        html+=`<td>${party["id"]}</td>`
        html+=`<td>${party["partyName"]}</td>`
        html+=`<td>${party["votes"]}</td>`
        html+=`<td>${percentages.toFixed(4)}%</td>`
        html+="</tr>"
    });
    $("#party-table").html(html)
});