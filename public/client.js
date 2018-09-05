function addEntryRenderHTML(results) {
    console.log(results);
    let htmlString = ``;

    htmlString += `<div class="entries-container row" id="${results._id}">`;
    //edit buttons start
    htmlString += `<div class="entry-div ${results.entryType}">`;
    htmlString += `<div class="edit-entry-buttons">`;
    htmlString += `<ul>`;
    htmlString += `<li><span class="update-select"><a id="edit-this" href="#"><i class="fas fa-pencil-alt"></i></a></span></li>`;
    htmlString += `<li><span class="delete-select"><a id="delete-this" href="#"><i class="fas fa-trash-alt"></i></a></span></li>`;
    htmlString += `</ul>`;
    htmlString += `</div>`;
    //edit buttons finish

    // Title & Author
    htmlString += `<span class="entry-info title">`;
    htmlString += `<p>${results.inputTitle}</p>`;
    htmlString += `<span class="author"> by ${results.inputAuthor}</span>`;
    htmlString += `<input type="hidden" class="inputEntryID"  value="${results._id}">`;
    htmlString += `</span>`;
    
    // Created Date
    htmlString += `<span class="entry-info date">`;
    htmlString += `<p class="info-label">Posted on ${results.createdDate}</p>`;
    htmlString += `</span>`;

    // Content
    htmlString += `<span class="entry-info content">`
    htmlString += `<p>${results.inputContent}</p>`;
    htmlString += `</span>`;
    htmlString += `</div>`;

    // Entry Type
    htmlString += `<span class="entry-info type info-label">Category: ${results.entryType}</span>`; 

    //Edit Entry  Entry form start
    htmlString += `<div class="js-edit-entry" style="display: none;">`;
    htmlString += `<form action="" class="edit-entry-form">`;
    htmlString += `<fieldset>`;
    htmlString += `<label><span>Title: </span><input name="new-title" id="updateInputTitle" type="text" value="${results.inputTitle}"></label>`;
    htmlString += `<label><input type="hidden" class="inputEntryID" value="${results._id}"></label>`;
    htmlString += `<label><span>Content: </span><textarea rows=5 cols="30" id="updateInputContent" class="upload" value="">${results.inputContent}</textarea></label>`;

    htmlString += `<label>`;
    htmlString += `<span>Type: </span>`;

    //dynamically preselect the options based on the previous values
    htmlString += `<select class="updateEntryType">`;
    if (results.entryType == "recipe") {
        htmlString += `<option value="recipe" selected>Recipes</option>`;
        htmlString += `<option value="activities">Activities</option>`;
        htmlString += `<option value="outreach">Outreach</option>`;
        htmlString += `<option value="org/opt">Org and Optimization</option>`
        htmlString += `<option value="decor">Decor</option>`
    } else if (results.entryType == "activities") {
        htmlString += `<option value="recipe" >Recipes</option>`;
        htmlString += `<option value="activities" selected>Activities</option>`;
        htmlString += `<option value="outreach">Outreach</option>`;
        htmlString += `<option value="org/opt">Org and Optimization</option>`
        htmlString += `<option value="decor">Decor</option>`
    } else if (results.entryType == "outreach") {
        htmlString += `<option value="recipe" >Recipes</option>`;
        htmlString += `<option value="activities">Activities</option>`;
        htmlString += `<option value="outreach" selected>Outreach</option>`;
        htmlString += `<option value="org/opt">Org and Optimization</option>`
        htmlString += `<option value="decor">Decor</option>`
    } else if (results.entryType == "org/opt") {
        htmlString += `<option value="recipe" >Recipes</option>`;
        htmlString += `<option value="activities">Activities</option>`;
        htmlString += `<option value="outreach">Outreach</option>`;
        htmlString += `<option value="org/opt" selected>Org and Optimization</option>`
        htmlString += `<option value="decor">Decor</option>`
    } else if (results.entryType == "decor") {
        htmlString += `<option value="recipe" >Recipes</option>`;
        htmlString += `<option value="activities">Activities</option>`;
        htmlString += `<option value="outreach">Outreach</option>`;
        htmlString += `<option value="org/opt">Org and Optimization</option>`
        htmlString += `<option value="decor" selected>Decor</option>`
    }
    htmlString += `</select>`;
    htmlString += `</label>`;
    htmlString += `<button type="submit" name="submit" class="edit-button">Submit</button>`;
    htmlString += `<span class="cancel-button"><a href="#">Cancel</a></span>`;
    htmlString += `</fieldset>`
    htmlString += `</form>`
    htmlString += `</div>`
    //Edit Entry  Entry form finish

    //delete entry form start
    htmlString += `<div class="js-delete-entry" style="display: none;">`;
    htmlString += `<form class="delete-entry-form">`;
    htmlString += `<input type="hidden" class="inputEntryID"  value="${results._id}">`;
    htmlString += `<h4>Are you sure you want to delete this entry?</h4>`;
    htmlString += `<button type="submit" class="delete-button">Delete</button>`;
    htmlString += `<span class="cancel-button"><a href="#">Cancel</a></span>`;
    htmlString += `</form>`;
    htmlString += `</div>`;
    //delete entry form finish


    htmlString += `</div>`;
    //    });
    // console.log(htmlString);
    return htmlString;
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

showLogin();
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
            //if call is successful
            .done(function (result) {
                console.log(result);
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

// Get my posts
$('#go-acct').on('click', function() {
    event.preventDefault();

    let username = $('#loggedInUserName').val();
    // let fullName = $('#loggedinName').val();
    console.log(`going to ${username}'s account`);

    const UserObject = {
        user: username
    };

    $.ajax({
        type: 'GET',
        url: `/get-entry-by-user/${username}`,
        dataType: 'json',
        data: JSON.stringify(UserObject),
        contentType: 'application/json'
    })
        .done(function(result) {
            console.log(result);
            if (result.entriesOutput.length === 0) {
                $('#no-entry').show();
            } else {
                $('#no-entry').hide();
            }

            $('#user-list').html("");
            htmlUserDashboard(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })
})

function htmlUserDashboard(resultsObject) {
    console.log(resultsObject.entriesOutput);
    $.each(resultsObject.entriesOutput, function (key, value) {
        $('#user-list').append(addEntryRenderHTML(value));
    });
}

// Create new post
$('.create-post').find('button').on('click', function() {
    event.preventDefault();
    console.log('creating new post');
    
        //take the input from the user
        const entryType = $(".addEntryType").val();
        const inputTitle = $("#addInputTitle").val();
        const inputContent = $("#addInputContent").val();
        const loggedInName = $("#loggedInName").val();
        const loggedInUserName = $('#loggedInUserName').val();
        var createdDate = new Date();

        let month = createdDate.getMonth() + 1;
        let date = createdDate.getDate();
        let year = createdDate.getFullYear();
        let abbrDate = `${month}/${date}/${year}`
        console.log(abbrDate)

        // console.log(entryType);
        // console.log(inputTitle);
        // console.log(inputContent);
        // console.log(loggedInName);

        //validate the input
        if (entryType == "") {
            alert('Please input entry type');
        } else if (inputTitle == "") {
            alert('Please input title');
        } else if (inputContent == "") {
            alert('Please input content');
        } 
        //if the input is valid
        else {
    
            //create the payload object (what data we send to the api call)
            const entryObject = {
                entryType: entryType,
                inputTitle: inputTitle,
                inputContent: inputContent,
                inputAuthor: loggedInName,
                createdDate: `${abbrDate}`,
                loggedInUserName: loggedInUserName
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
                    $('#no-entry').hide();
                    // $('section').hide();
                    // $('.navbar').show();
                    // $('#user-dashboard').show();
                    // $('#loggedInName').text(result.name);
                    // $('#loggedInUserName').val(result.username);
                    // $('#add-entry-container').hide();
                    //                noEntries();

                    //Add Entry to page
                    showAccount();
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

// Edit my posts    
$('#user-list').on('click', '#edit-this', function() {
    // event.preventDefault();
    console.log('updating');
    // console.log(this);
    $(this).parents('.entry-div').siblings('.js-edit-entry').show();
});

$('#user-list').on('click', '.edit-button', function() {
    event.preventDefault();

    const parentDiv = $(this).closest('.entries-container');
    const entryType = $(this).siblings().find(".updateEntryType").val();
    const inputTitle = $(this).siblings().find("#updateInputTitle").val();
    const inputContent = $(this).siblings().find("#updateInputContent").val();
    const loggedInUserName = $("#loggedInUserName").val();
    const entryId = $(this).siblings().find('.inputEntryID').val();

    //validate the input
    if (entryType == "") {
        alert('Please input entry type');
    } else if (inputTitle == "") {
        alert('Please input Title');
    } else if (inputContent == "") {
        alert('Please input Content');
    }

    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            entryType: entryType,
            inputTitle: inputTitle,
            inputContent: inputContent,
            // loggedInUserName: loggedInUserName,
            entryId: entryId
        };
        console.log(entryObject);

        $.ajax({
            type: 'PUT',
            url: `/update-entry/${entryId}`,
            dataType: 'json',
            data: JSON.stringify(entryObject),
            contentType: 'application/json'
        })
        //if call is successful
        .done(function (result) {
            // populateUserDashboardDate(loggedInUserName);
            $('.js-edit-entry').hide();
            alert('Done!')
            console.log(parentDiv);
            $('html, body').animate({
                scrollTop: parentDiv.offset().top
            }, 1000);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    };

})


// Delete my posts
$('#user-list').on('click', '#delete-this', function() {
    // event.preventDefault();
    console.log('deleting');
    $(this).parents('.entry-div').siblings('.js-delete-entry').show();
});

$('#user-list').on('click', '.delete-button', function() {
    event.preventDefault();
    
    const entryId = $(this).parent().find('.inputEntryID').val();
    const parentDiv = $(this).closest('.entries-container');

    $.ajax({
        type: 'DELETE',
        url: `/entry/${entryId}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        //if call is successful
        .done(function (result) {
            console.log(result);
            // populateUserDashboardDate(loggedInUserName);
            alert("Entry deleted");
            $('.js-delete-entry').hide();
            $(parentDiv).remove();

            $('html, body').animate({
                scrollTop: $('.navbar').offset().top
            }, 1000);

    })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

$('#user-list').on('click', '.cancel-button', function() {
    event.preventDefault();
    
    $('.js-delete-entry').hide();
    $('.js-edit-entry').hide();
    $('html, body').animate({
        scrollTop: $(this).closest('.entries-container').offset().top
    }, 1000);
})

// Query search
$('.search-bar').find('button').on('click', function() {
    event.preventDefault();
    let value = $('.js-query').val();
    // let searchTerms = value.split(" ");
    // console.log(searchTerms);
    
    // const query = {
    //     q: `${searchTerms}`
    // }

    $.ajax({
        type: 'GET',
        url: `/search-entry/${value}`,
        dataType: 'json',
        // data: JSON.stringify(query),
        contentType: 'application/json'
    })
        .done(function(result) {
            console.log(result);
            value = undefined; 
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})


