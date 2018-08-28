var MOCK_POSTS = {
    'idea-posts': [
        {
            "id": "6YGN964",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        },
        {
            "id": "6YGN964",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        },
        {
            "id": "6YGN964",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        },
        {
            "id": "6YGN964",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        },
        {
            "id": "6YGN964",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        },
        {
            "id": "6YGN964",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        },
    ]
}

// Shows one section only
function showSignUp() {
    $('#login-page').hide();
    $('.landing-page').hide();
    $('.my-account').hide();
    $('.new-post').hide();
    $('.view-one').hide();
    $('.search-bar').hide();
    $('.menu-items').hide();
    $('#signup-page').show();
}

function showLogin() {
    $('#signup-page').hide();
    $('.landing-page').hide();
    $('.my-account').hide();
    $('.new-post').hide();
    $('.view-one').hide();
    $('.search-bar').hide();
    $('.menu-items').hide();
    $('#login-page').show();
}

function showLanding() {
    $('#login-page').hide();
    $('#signup-page').hide();
    $('.my-account').hide();
    $('.new-post').hide();
    $('.view-one').hide();
    $('.landing-page').show();
    $('.search-bar').show();
    $('.menu-items').show();
}

function showAccount() {
    $('#login-page').hide();
    $('#signup-page').hide();
    $('.landing-page').hide();
    $('.new-post').hide();
    $('.view-one').hide();
    $('.my-account').show();
    $('.search-bar').show();
    $('.menu-items').show();
}

function showOnePost() {
    $('#login-page').hide();
    $('#signup-page').hide();
    $('.my-account').hide();
    $('.new-post').hide();
    $('.landing-page').hide();
    $('.view-one').show();
    $('.search-bar').show();
    $('.menu-items').show();
}

function showNewPost() {
    $('#login-page').hide();
    $('#signup-page').hide();
    $('.my-account').hide();
    $('.landing-page').hide();
    $('.view-one').hide();
    $('.new-post').show();
    $('.search-bar').show();
    $('.menu-items').show();
}

function handleClicks() {
    $('.go-login').click(function() {
        showLogin();
    });
    $('#go-signup').click(function() {
        showSignUp();
    });
    $('#go-home').click(function() {
        showLanding();
    });
    $('#go-acct').click(function() {
        showAccount();
    });
    $('#go-new').click(function() {
        showNewPost();
    });
}

showSignUp();
$(handleClicks());


$('.login').find('button').on('click', function() {
    event.preventDefault();

    //take the input from the user
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        //console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                // $('section').hide();
                // $('.navbar').show();
                // $('#user-dashboard').show();
                // $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                $('#loggedInName').val(`${result.firstName} ${result.lastName}`);
                //            htmlUserDashboard();
                showLanding();
                //AJAX call in here??
                //                noEntries();

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    // At landing page, should make AJAX call for most recent posts
    };
});

$('.signup').find('button').on('click', function() {
    event.preventDefault();
    console.log('sign me up');
    
    //take the input from the user
    const firstName = $(".signUpFN").val();
    const lastName = $(".signUpLN").val();
    const email = $(".signUpEmail").val();
    const username = $(".signUpUsername").val();
    const password = $(".signUpPw").val();

    //validate the input
    if (firstName == "") {
        alert('Please add a first name');
    } else if (lastName == "") {
        alert('Please add a last name');
    } else if (email == "") {
        alert('Please add an email address');
    } else if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        };
        console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                // $('#loggedInName').text(result.name);
                // $('#loggedInUserName').val(result.username);
                // $('section').hide();
                // $('.navbar').show();
                // $('#user-dashboard').show();
                // populateUserDashboardDate(result.username);
                showLogin();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
})

$('.go-logout').on('click', function() {
    location.reload();
})

$('.create-post').find('button').on('click', function() {
    event.preventDefault();
    console.log('creating new post');
    
        //take the input from the user
        const entryType = $(".addEntryType").val();
        const inputTitle = $(".addInputTitle").val();
        const inputContent = $(".addInputContent").val();
        const loggedInName = $("#loggedInName").val();
    
        //validate the input
        if (entryType == "") {
            alert('Please input entry type');
        } else if (inputTitle == "") {
            alert('Please input addInputDate');
        } else if (inputContent == "") {
            alert('Please input addInputPlay');
        } 
        //if the input is valid
        else {
    
            //create the payload object (what data we send to the api call)
            const entryObject = {
                entryType: entryType,
                inputTitle: inputTitle,
                inputContent: inputContent,
                inputAuthor: loggedInName,
            };
            console.log(entryObject);
    
            //make the api call using the payload above
            $.ajax({
                    type: 'POST',
                    url: '/entry/create',
                    dataType: 'json',
                    data: JSON.stringify(entryObject),
                    contentType: 'application/json'
                })
                //if call is succefull
                .done(function (result) {
                    console.log(result);
                    // $('section').hide();
                    // $('.navbar').show();
                    // $('#user-dashboard').show();
                    // $('#loggedInName').text(result.name);
                    // $('#loggedInUserName').val(result.username);
                    // $('#add-entry-container').hide();
                    //                noEntries();
                    
                    //Add Entry to page
                    $('#user-list').prepend(addEntryRenderHTML(result));
                    $('html, body').animate({
                        scrollTop: $(`#${result._id}`).offset().top
                    }, 1000);
    
                    //                $().scrollTop();
    
                    //                updateEditFormValues(result);
                })
                //if the call is failing
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        };
    });