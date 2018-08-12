var MOCK_POSTS = {
    'idea-posts': [
        {
            "id": "6YGN964",
            "title": "Captain's coming game",
            "author": "My Girl",
            "content": "These are the rules...",
            "created": ""
        },
        {
            "id": "5XBH046",
            "title": "Handball",
            "author": "My Guy",
            "content": "Here are the rules...",
            "created": ""
        },
        {
            "id": "5420543",
            "title": "Triangle meatballs",
            "author": "Andres Fonseca",
            "content": "Follow these steps...",
            "created": ""
        },
        {
            "id": "2529833",
            "title": "Dongle organizer",
            "author": "Julianna Anton",
            "content": "Check it out...",
            "created": ""
        }
    ]
}

function getPosts(callbackFn) {
    setTimeout(function(){callbackFn(MOCK_POSTS)}, 100);
}

function displayPosts(data) {
    for (index in data.idea-posts) {
        $('body').append(
            `<p>${data.idea-posts[index].text}</p>`
        );
    }
}

function getAndDisplayPosts() {
    getPosts(displayPosts);
}

$(function() {
    getAndDisplayPosts();
})