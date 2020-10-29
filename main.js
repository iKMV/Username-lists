var firebaseConfig = {
    apiKey: "AIzaSyDTd08h0mEuKqwBFpX134snljHp8WGo5dc",
    authDomain: "list-of-username.firebaseapp.com",
    databaseURL: "https://list-of-username.firebaseio.com",
    projectId: "list-of-username",
    storageBucket: "list-of-username.appspot.com",
    messagingSenderId: "851391151628",
    appId: "1:851391151628:web:98f3c38227f6adfc96f829"
  };

  firebase.initializeApp(firebaseConfig);




var userRef = firebase.database().ref('Username');

var new_html = '';
window.onload = function () {
    initApp();
    displayUserData();
};

function initApp() {
    document.getElementById('add_user').addEventListener('click', addNewUser, false);

}









function addNewUser() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var idnumber = document.getElementById('idnumber').value;
    var server = document.getElementById('server').value;
    var timeStamp = new Date().getTime();
    var userID = 'USER_' + timeStamp;
    userRef.child(userID).set({
        username: username,
        email: email,
        idnumber: idnumber,
        server: server,
        user_id: userID
    });
    $('#username').val('');
    $('#email').val('');
    $('#idnumber').val('');
    $('#server').val('');
}






function displayUserData() {

    userRef.on('child_added', function (userData) {
        console.log(userData.val());

        new_html += '<tr id="'+userData.val().user_id+'">';
        new_html += '<td id="username_'+userData.val().user_id+'">' + userData.val().username + '</td>';
        new_html += '<td id="email_'+userData.val().user_id+'">' + userData.val().email + '</td>';
        new_html += '<td id="idnumber_'+userData.val().user_id+'">' + userData.val().idnumber + '</td>';
        new_html += '<td id="server_'+userData.val().user_id+'">' + userData.val().server + '</td>';
        new_html += '<td><a  class="edit" data-toggle="modal"><i class="material-icons editUser"';
        new_html += 'data-toggle="tooltip" data-user-id="' + userData.val().user_id + '" title="Edit">&#xE254;</i></a>';
        new_html += '<a class="" data-toggle="modal"><i class="material-icons delete"';
        new_html += 'data-toggle="tooltip"  data-user-id="' + userData.val().user_id + '" title="Delete">&#xE872;</i></a>';
        new_html += '</td>';
        new_html += '</tr>';

        $("#user-table").html(new_html);
       
    });

}

$(document).on('click', '.delete', function () {
    var user_id = $(this).attr('data-user-id');
    



    userRef.child(user_id).once('value', function (user) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Delete ' + user.val().username + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<p>Are you sure you want to delete these Records?</p>';
        modal_body += '<p class="text-warning"><small>This action cannot be undone.</small></p>';
        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-user-id="'+user_id+'" class="btn btn-danger deleteUserData" value="Delete">';
        $("#deleteUsernameModal").find('.modal-header').html(modal_header);
        $("#deleteUsernameModal").find('.modal-body').html(modal_body);
        $("#deleteUsernameModal").find('.modal-footer').html(modal_footer);
        $("#deleteUsernameModal").modal();
    })
});

$(document).on('click', '.editUser', function () {
    var user_id = $(this).attr('data-user-id');
    



    userRef.child(user_id).once('value', function (user) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Edit ' + user.val().username + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<div class="form-group">';
        modal_body += '<label>username</label>';
        modal_body += '<input id="edit-username" type="text" value="'+user.val().username+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Email</label>';
        modal_body += '<input type="email" id="edit-email" value="'+user.val().email+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>idnumber</label>';
        modal_body += '<textarea id="edit-idnumber"  class="form-control" required>'+user.val().idnumber+'</textarea>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>server</label>';
        modal_body += '<input id="edit-server" type="text" value="'+user.val().server+'" class="form-control" required>';
        modal_body += '</div>';
        

        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-user-id="'+user_id+'"  class="btn btn-danger updateUserData" value="Save">';
        $("#editUsernameModal").find('.modal-header').html(modal_header);
        $("#editUsernameModal").find('.modal-body').html(modal_body);
        $("#editUsernameModal").find('.modal-footer').html(modal_footer);
        $("#editUsernameModal").modal();
    })
});


$(document).on('click', '.deleteUserData', function () {
    var user_id = $(this).attr('data-user-id');
     
    userRef.child(user_id).remove();
  
    $('#'+user_id).remove();
    
    
});


$(document).on('click', '.updateUserData', function () {
    var user_id = $(this).attr('data-user-id');
     
    var username = document.getElementById('edit-username').value;
    var email = document.getElementById('edit-email').value;
    var idnumber = document.getElementById('edit-idnumber').value;
    var server = document.getElementById('edit-server').value;
    
   
    userRef.child(user_id).update({
        username: username,
        email: email,
        idnumber: idnumber,
        server: server
    });
    
    $('#username_'+user_id).html(username);
    $('#email_'+user_id).html(email);
    $('#idnumber_'+user_id).html(idnumber);
    $('#server_'+user_id).html(server);


    
});



$(document).on('click', '.dltAllData', function () {
    var user_id = $(this).attr('data-user-id');
     
    userRef.remove();
  
    $('#user-table').remove();

    
});

