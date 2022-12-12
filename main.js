// function named 'createElemWithText'
// Set a default value for the 1st parameter to "p" by using the "=" sign
function createElemWithText(HTMLElemStrngToCrt = "p", txtContntOfElToCrt = "", classNameifOneNeeded) {
  // Use document.createElement() to create the requested HTML element
  let requestedElementCreated = document.createElement(HTMLElemStrngToCrt);

  // set the textContent of the created element
  requestedElementCreated.textContent = txtContntOfElToCrt;

  // If class name is specified
  if (classNameifOneNeeded) {
    // set the class of created element
    requestedElementCreated.className = classNameifOneNeeded;
  }

  // return the created element
  return requestedElementCreated;
}
function createSelectOptions(users) {
  // Return undefined if no parameter received
  if (!users) return;

  // Create an array to store the option elements
  var options = [];

  // Loop through the users data
  for (var i = 0; i < users.length; i++) {
    // Create an option element for each user with document.createElement()
    var option = document.createElement('option');

    // Assign the user.id to the option.value
    option.value = users[i].id;

    // Assign the user.name to the option.textContent
    option.textContent = users[i].name;

    // Add the option element to the array of options
    options.push(option);
  }

  // Return the array of options
  return options;
}

function toggleCommentSection(postId) {
  // Return undefined if no parameter received
  if (!postId) return;

  // Selects the section element with the data-post-id attribute equal to the postId received as a parameter
  var section = document.querySelector('section[data-post-id="' + postId + '"]');

  // Use code to verify the section exists before attempting to access the classList property
  if (section) {
    // Toggles the class 'hide' on the section element
    section.classList.toggle('hide');
  }

  // Return the section element
  return section;
}



// function called "toggleCommentButton" Q4
// this function gets 1 parameter named "postId"
function toggleCommentButton (postID) {

  // if postID is not received, return
  if (!postID) {
    return;
  }

  // select button having its value of "data-post-id" attribute = value of "postId"
  const btnSelectedEl = document.querySelector(`button[data-post-id = "${postID}"`);

  if (btnSelectedEl != null) {
    // if the textContent of button is 'Show Comments', change it to "Hide Comments", otherwise change to "Show Comments" by making use of ternary operator
    btnSelectedEl.textContent === "Show Comments" ? (btnSelectedEl.textContent = "Hide Comments") : (btnSelectedEl.textContent = "Show Comments");
  }

  // returning the selected button element
  return btnSelectedEl;
};


// check for function
console.log(toggleCommentButton("btnToTest"));

function deleteChildElements(parentElement) {
  // Return undefined if no parentElement is provided
  if (!parentElement) return;

  // Define a child variable as parentElement.lastElementChild
  var child = parentElement.lastElementChild;

  // Use a while loop to iterate over the child elements
  while (child) {
    // Use parentElement.removeChild to remove the child in the loop
    parentElement.removeChild(child);
    // Reassign child to parentElement.lastElementChild in the loop
    child = parentElement.lastElementChild;
  }

  // Return the parentElement
  return parentElement;
}


function addButtonListeners() {
  // Selects all buttons nested inside the main element
  var buttons = document.querySelectorAll('main button');

  // If buttons exist...
  if (buttons.length > 0) {
    // Loop through the NodeList of buttons
    for (var i = 0; i < buttons.length; i++) {
      // Gets the postId from button.dataset.postId
      var postId = buttons[i].dataset.postId;

      // Adds a click event listener to each button (reference addEventListener)
      buttons[i].addEventListener('click', function(event) {
        // Inside the anonymous function: the function toggleComments is called with the event and postId as parameters
        toggleCommentButton(event, postId);
      });
    }
  }

  // Return the button elements which were selected
  return buttons;
}

function removeButtonListeners() {
  // Selects all buttons nested inside the main element
  var buttons = document.querySelectorAll('main button');

  // Loop through the NodeList of buttons
  for (var i = 0; i < buttons.length; i++) {
    // Gets the postId from button.dataset.postId
    var postId = buttons[i].dataset.postId;

    // Removes the click event listener from each button (reference removeEventListener)
    buttons[i].removeEventListener('click', function(event) {
      // Inside the anonymous function: the function toggleComments is called with the event and postId as parameters
      toggleCommentButton(event, postId);
    });
  }

  // Return the button elements which were selected
  return buttons;
}

function createComments(comments) {
  // Return undefined if no comments data is provided
  if (!comments) return;

  // Create a fragment element with document.createDocumentFragment()
  var fragment = document.createDocumentFragment();

  // Loop through the comments
  for (var i = 0; i < comments.length; i++) {
    // Create an article element with document.createElement()
    var article = document.createElement('article');

    // Create an h3 element with createElemWithText('h3', comment.name)
    var h3 = createElemWithText('h3', comments[i].name);

    // Create an paragraph element with createElemWithText('p', comment.body)
    var p1 = createElemWithText('p', comments[i].body);

    // Create an paragraph element with createElemWithText('p', `From: ${comment.email}`)
    var p2 = createElemWithText('p', `From: ${comments[i].email}`);

    // Append the h3 and paragraphs to the article element (see cheatsheet)
    article.appendChild(h3);
    article.appendChild(p1);
    article.appendChild(p2);

    // Append the article element to the fragment
    fragment.appendChild(article);
  }

  // Return the fragment element
  return fragment;
}


function populateSelectMenu(users) {
  // Return undefined if no users data is provided
  if (!users) return;

  // Selects the #selectMenu element by id
  var selectMenu = document.querySelector('#selectMenu');

  // Passes the users JSON data to createSelectOptions()
  var options = createSelectOptions(users);

  // Loop through the options elements and appends each option element to the select menu
  for (var i = 0; i < options.length; i++) {
    selectMenu.appendChild(options[i]);
  }

  // Return the selectMenu element
  return selectMenu;
}

async function getUsers() {
  try {
    // Uses the fetch API to request all users
    var response = await fetch('https://jsonplaceholder.typicode.com/users');

    // Await the users data response
    var data = await response.json();

    // Return the JSON data
    return data;
  } catch (err) {
    // Handle any errors that occur during the request
    console.error(err);
  }
}

async function getUserPosts(userId) {
  // Return undefined if no user ID parameter is provided
  if (!userId) return;

  try {
    // Uses the fetch API to request all posts for a specific user id
    var response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    // Await the users data response
    var data = await response.json();

    // Return the JSON data
    return data;
  } catch (err) {
    // Handle any errors that occur during the request
    console.error(err);
  }
}

async function getUser(userId) {
  // Return undefined if no user ID parameter is provided
  if (!userId) return;
  
  try {
    // Uses the fetch API to request a specific user id
    var response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // Await the user data response
    var data = await response.json();

    // Return the JSON data
    return data;
  } catch (err) {
    // Handle any errors that occur during the request
    console.error(err);
  }
}

async function getPostComments(postId) {
   if (!postId) return;
  try {
    // Uses the fetch API to request all comments for a specific post id
    var response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

    // Await the users data response
    var data = await response.json();

    // Return the JSON data
    return data;
  } catch (err) {
    // Handle any errors that occur during the request
    console.error(err);
  }
}

async function displayComments(postId) {
 
  if (!postId) return;
  // create a new section element
  const section = document.createElement("section");
  
  // set the postId as an attribute on the section element
  section.dataset.postId = postId;
  
  // add the classes 'comments' and 'hide' to the section element
  section.classList.add("comments", "hide");
  
  // get the post comments using the provided postId
  const comments = await getPostComments(postId);
  
  // create a document fragment using the comments
  const fragment = createComments(comments);
  
  // append the fragment to the section element
  section.appendChild(fragment);
  
  // return the section element
  return section;
}

async function createPosts(posts) {
 
  if (!posts) return;
  // create a new fragment element
  const fragment = document.createDocumentFragment();
  
  // loop through the posts data
  for (const post of posts) {
    // create a new article element
    const article = document.createElement("article");
    
    // create an h2 element with the post title
    const title = createElemWithText("h2", post.title);
    
    // create a p element with the post body
    const body = createElemWithText("p", post.body);
    
    // create another p element with the post id
    const postId = createElemWithText("p", `Post ID: ${post.id}`);
    
    // get the author using the provided user id
    const author = await getUser(post.userId);
    
    // create another p element with the author's name and company name
    const authorName = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
    
    // create another p element with the author's company catch phrase
    const catchPhrase = createElemWithText("p", author.company.catchPhrase);
    
    // create a button with the text 'Show Comments'
    const btn = document.createElement("button");
    btn.textContent = "Show Comments";
    
    // set the post id as an attribute on the button
    btn.dataset.postId = post.id;
    
    // append the h2, paragraphs, and button to the article element
    article.append(title, body, postId, authorName, catchPhrase, btn);
    
    // create a section element with the post comments
    const section = await displayComments(post.id);
    
    // append the section element to the article element
    article.appendChild(section);
    
    // append the article element to the fragment
    fragment.appendChild(article);
  }
  
  // return the fragment element
  return fragment;
}

async function displayPosts(posts) {

  // Select the main element
  const mainElem = document.querySelector('main');

  // Define the element variable
  let element = posts ? await createPosts(posts) : createElemWithText('p', 'No posts to display.');

  // Append the element to the main element
  mainElem.appendChild(element);

  // Return the element variable
  return element;
}

function toggleComments(event, postId) {
  if (!postId) return;
  // Set event.target.listener = true for testing
  event.target.listener = true;

  // Toggle the comment section for the post
  const section = toggleCommentSection(postId);

  // Toggle the comment button for the post
  const button = toggleCommentButton(postId);

  // Return the section and button elements
  return [section, button];
}

async function refreshPosts(posts) {

  if (!posts) return;
  // Remove button listeners
  const removeButtons = removeButtonListeners();

  // Delete the child elements of the main element
  const main = deleteChildElements(document.querySelector('main'));

  // Display the posts
  const fragment = await displayPosts(posts);

  // Add button listeners
  const addButtons = addButtonListeners();

  // Return the results of the functions called
  return [removeButtons, main, fragment, addButtons];
}

async function selectMenuChangeEventHandler(event) {
  if (!event) return;
  // Disable the select menu
  event.target.disabled = true;

  // Get the user ID from the event
  const userId = event.target.value || 1;

  // Get the user's posts
  const posts = await getUserPosts(userId);

  // Refresh the posts on the page
  const refreshPostsArray = await refreshPosts(posts);

  // Enable the select menu
  event.target.disabled = false;

  // Return the results
  return [userId, posts, refreshPostsArray];
}

async function initPage() {

  // Get the users
  const users = await getUsers();

  // Populate the select menu
  const select = populateSelectMenu(users);

  // Return the results
  return [users, select];
}

function initApp() {

  // Initialize the page
  initPage();

  // Select the select menu
  const selectMenu = document.querySelector('#selectMenu');

  // Add a change event listener to the select menu
  selectMenu.addEventListener('change', selectMenuChangeEventHandler);
}


// Add an event listener to the document
document.addEventListener('DOMContentLoaded', initApp);
