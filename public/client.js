function addEntryRenderHTML(results) {
    console.log(results);
    let htmlString = ``;
    // let displayDate = results.inputDate.substring(0, 10);
    // let formattedDisplayDate = displayDate.split("-");
    // let formattedDisplayDateOutput = formattedDisplayDate[1] + "/" + formattedDisplayDate[2] + "/" + formattedDisplayDate[0];

    //loop throu all the results
    //    $.each(resultsObject, function (key, results) {

    htmlString += `<div class="entries-container" id="${results._id}">`;
    //edit buttons start
    htmlString += `<div class="entry-div ${results.entryType}">`;
    htmlString += `<div class="edit-entry-buttons">`;
    htmlString += `<span class="update-select">Edit</span>`;
    htmlString += `<p>&nbsp|&nbsp</p>`;
    htmlString += `<span class="delete-select">Delete</span>`;
    htmlString += `</div>`;
    //edit buttons finish

    htmlString += `<span class="entry-info type info-label">${results.entryType}</span>`; //Value of Entry Type
    htmlString += `<span class="entry-info date">`;
    htmlString += `<p class="info-label">Date</p>`;
    htmlString += `<p>${results.createdDate}</p>`;
    htmlString += `</span>`;
    // if (results.inputRole) {
    //     htmlString += `<span class="entry-info role">`;
    //     htmlString += `<p class="info-label">Role</p>`;
    //     htmlString += `<p>${results.inputRole}</p>`;
    //     htmlString += `</span>`;
    // }
    htmlString += `<span class="entry-info title">`;
    // htmlString += `<p class="info-label">Title</p>`;
    htmlString += `<p>${results.inputTitle}</p>`;
    htmlString += `<span class="author"> by ${results.inputAuthor}</span>`;
    htmlString += `</span>`;
    // if (results.inputCo) {
    //     htmlString += `<span class="entry-info theater-co">`;
    //     htmlString += `<p class="info-label">Company</p>`;
    //     htmlString += `<p>${results.inputCo}</p>`;
    //     htmlString += `</span>`;
    // }
    // if (results.inputLocation) {
    //     htmlString += `<span class="entry-info location">`;
    //     htmlString += `<p class="info-label">Location</p>`;
    //     htmlString += `<p>${results.inputLocation}</p>`;
    //     htmlString += `</span>`;
    // }
    htmlString += `<span class="entry-info content">`
    // htmlString += `<p class="info-label"></p>`
    htmlString += `<p>${results.inputContent}</p>`;
    htmlString += `</span>`;
    htmlString += `</div>`;


    //Edit Entry  Entry form start
    htmlString += `<div class="js-edit-entry" style="display: none;">`;
    htmlString += `<form action="" class="edit-entry-form">`;
    htmlString += `<fieldset>`;
    htmlString += `<label><span>Title: </span><input name="new-title" id="addInputTitle" type="text" value="${results.inputTitle}"></label>`;
    htmlString += `<label><span>Content: </span><textarea rows=5 cols="30" id="addInputContent" class="upload" value="${results.inputContent}"></textarea></label>`;

    htmlString += `<label>`;
    htmlString += `<span>Type: </span>`;

    //dynamically preselect the options based on the previous values
    htmlString += `<select class="addEntryType">`;
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
    htmlString += `<button type="submit" name="submit" >Submit</button>`;
    htmlString += `</fieldset>`
    htmlString += `</form>`
    htmlString += `</div>`

    // htmlString += `<br>`;
    // htmlString += `<label for="inputDate">Date</label>`;
    // htmlString += `<input type="date" class="inputDate" value="${displayDate}">`;
    // //    htmlString += `<button type="button" class="date-text">Need Date Range?</button>`;
    // htmlString += `<div class="play-info">`;
    // htmlString += `<label for="inputPlay">Play</label>`;
    // htmlString += `<input type="text" class="inputPlay" placeholder="Play" value="${results.inputPlay}">`;
    // htmlString += `<input type="hidden" class="inputEntryID"  value="${results._id}">`;
    // htmlString += `<label for="inputAuthor">Author</label>`;
    // htmlString += `<input type="text" class="inputAuthor" placeholder="Author" value="${results.inputAuthor}">`;
    // htmlString += `<label for="inputRole">Role</label>`;
    // htmlString += `<input type="text" class="inputRole" placeholder="Role" value="${results.inputRole}">`;
    // htmlString += `</div>`;
    // htmlString += `<div class="place-info">`;
    // htmlString += `<label for="inputCo">Company</label>`;
    // htmlString += `<input type="text" class="inputCo" placeholder="Company" value="${results.inputCo}">`;
    // htmlString += `<label for="inputLocation">Location</label>`;
    // htmlString += `<input type="text" class="inputLocation" placeholder="Location" value="${results.inputLocation}">`;
    // htmlString += `</div>`;
    // htmlString += `<br>`;
    // htmlString += `<label for="inputNotes">Notes</label>`;
    // htmlString += `<textarea name="Text1" class="inputNotes" cols="40" rows="5">${results.inputNotes}</textarea>`;
    // htmlString += `</fieldset>`;
    // htmlString += `<button type="submit" class="submit-button">Update Entry</button>`;
    // htmlString += `<span class="cancel-button">Cancel</span>`;
    // htmlString += `</form>`;
    // htmlString += `</div>`;
    //Edit Entry  Entry form finish

    //delete entry form start
    htmlString += `<div class="js-delete-entry" style="display: none;">`;
    htmlString += `<form class="delete-entry-form">`;
    htmlString += `<input type="hidden" class="inputEntryID"  value="${results._id}">`;
    htmlString += `<h4>Are you sure you want to delete this entry?</h4>`;
    htmlString += `<button type="submit" class="delete-button">Delete</button>`;
    htmlString += `<span class="cancel-button">Cancel</span>`;
    htmlString += `</form>`;
    htmlString += `</div>`;
    //delete entry form finish


    htmlString += `</div>`;
    //    });
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
        const inputTitle = $("#addInputTitle").val();
        const inputContent = $("#addInputContent").val();
        const loggedInName = $("#loggedInName").val();
        var createdDate = new Date();

        console.log(createdDate);
        // console.log(entryType);
        // console.log(inputTitle);
        // console.log(inputContent);
        // console.log(loggedInName);

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
                createdDate: createdDate,
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