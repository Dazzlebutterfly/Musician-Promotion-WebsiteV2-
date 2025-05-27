const commentList = [
  { name: "Miles", message: "Cool project. Keep it up!", date: "2025-05-27" },
  { name: "Aria", message: "Thanks for the recommendations!", date: "2025-05-26" },
  { name: "Odetari4Everr", message: "OmG another Odetari fan!!", date: "2025-05-25" },
  { name: "TheSHAMELESSAnon", message: "Why is The Neighbourhood not on the listtt??", date: "2025-05-24" },
]; //Sample data

// Sort comments in desc order
const sortedComments = [...commentList].sort((a, b) => new Date(b.date) - new Date(a.date));

// Compile Handlebars templates once
const commentsSource = document.getElementById("comments-template").innerHTML;
const commentFormSource = document.getElementById("comment-form-template").innerHTML;
const commentsTemplate = Handlebars.compile(commentsSource);
const commentFormTemplate = Handlebars.compile(commentFormSource);

function renderCommentsAndForm() {
  // Render comments and form HTML
  const commentsHTML = commentsTemplate({ comments: sortedComments });
  const formHTML = commentFormTemplate();

  const container = document.getElementById("comments-container");
  container.innerHTML = commentsHTML + formHTML;

  const form = document.getElementById("comment-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name-input");
    const messageInput = document.getElementById("message-input");

    if (!nameInput.value.trim() || !messageInput.value.trim()) {
      alert("Please fill in both name and comment.");
      return;
    }

    // Add new comment to the start of the list
    sortedComments.unshift({
      name: nameInput.value.trim(),
      message: messageInput.value.trim(),
      date: new Date().toISOString().split("T")[0], //Proper format
    });

    nameInput.value = "";
    messageInput.value = "";

    // Re-render comments and form
    renderCommentsAndForm();
  });
}

// Wait for DOM ready before rendering
document.addEventListener("DOMContentLoaded", renderCommentsAndForm);
