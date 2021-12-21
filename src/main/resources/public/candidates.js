jQuery
$
$.getJSON('http://localhost:8080/candidates/', function(data) {
    let html = ""
    $.each(data, function( index, candidate) {
        html+=`<tr id="${candidate["id"]}">`
        html+=`<td>${candidate["id"]}</td>`
        html+=`<td>${candidate["firstname"]}</td>`
        html+=`<td>${candidate["lastname"]}</td>`
        html+=`<td>${candidate["commune"]}</td>`
        html+=`<td>${candidate["party"]["id"]}</td>`
        html+=`<td>${candidate["party"]["partyName"]}</td>`
        html+=`<td><button class="delete-candidate-button" data-id="${candidate["id"]}">Delete</button></td>`
        html+=`<td><button class="edit-candidate-button" data-id="${candidate["id"]}" data-firstname="${candidate["firstname"]}" data-lastname="${candidate["lastname"]}" data-commune="${candidate["commune"]}">Edit Candidate</button></td>`
        html+="</tr>"
        console.log(candidate)
    });
    $("#candidates-table").html(html)
});

$(document).on('click', '.delete-candidate-button', function(e){
    let id=$(this).data("id")
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/candidates/${id}`,
        success: function() {
            $(`#${id}`).remove()
        }
    })
});

$(document).on('click', '.edit-candidate-button', function(e){
   $('#edit-firstname').val($(this).data("firstname"))
    $('#edit-lastname').val($(this).data("lastname"))
    $('#edit-commune').val($(this).data("commune"))
    $('#edit-candidateId').val($(this).data("id"))
});

$(document).on('submit', '#edit-candidate-form', function(e) {
    e.preventDefault()
    let firstname = $(this).find('#edit-firstname').val()
    let lastname = $(this).find('#edit-lastname').val()
    let commune = $(this).find('#edit-commune').val()
    let candidateId = $(this).find('#edit-candidateId').val()
    $.ajax({

        type: "PUT",
        url: `http://localhost:8080/candidates/${candidateId}`,
        data: JSON.stringify({firstname: firstname, lastname: lastname, commune: commune}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            location.reload()
        }
    })
});

$(document).on('submit', '#create-candidate-form', function(e) {
    e.preventDefault()
    let firstname = $(this).find('#firstname').val()
    let lastname = $(this).find('#lastname').val()
    let commune = $(this).find('#commune').val()
    let partyid = $(this).find('#partyid').val()
    $.ajax({

        type: "POST",
        url: `http://localhost:8080/candidates/${partyid}`,
        data: JSON.stringify({firstname: firstname, lastname: lastname, commune: commune}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
           location.reload()
        }
    })
});
$(document).on('submit', '#search-party-form', function(e) {
    e.preventDefault()
    let input = $(this).find("#search-party-input").val()
    $.getJSON(`http://localhost:8080/candidates/${input}`, function(data) {
        let html = ""
        $.each(data, function( index, candidate) {

            html+=`<tr id="${candidate["id"]}">`
            html+=`<td>${candidate["id"]}</td>`
            html+=`<td>${candidate["firstname"]}</td>`
            html+=`<td>${candidate["lastname"]}</td>`
            html+=`<td>${candidate["commune"]}</td>`
            html+=`<td>${candidate["party"]["id"]}</td>`
            html+=`<td>${candidate["party"]["partyName"]}</td>`
            html+=`<td><button class="delete-candidate-button" data-id="${candidate["id"]}">Delete</button></td>`
            html+=`<td><button class="edit-candidate-button" data-id="${candidate["id"]}" data-firstname="${candidate["firstname"]}" data-lastname="${candidate["lastname"]}" data-commune="${candidate["commune"]}">Edit Candidate</button></td>`
            html+="</tr>"
        });

        $("#candidates-table").html(html)

    })
});
