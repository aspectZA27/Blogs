document.addEventListener('DOMContentLoaded', () => {
    // Function to load posts from localStorage and display them
    function loadPosts() {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = ''; // Clear existing content

        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            postsContainer.appendChild(postElement);
        });

        // Add event listeners for all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deletePost);
        });
    }

    // Function to save a new post to localStorage
    function savePost(title, content) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Function to delete a post
    function deletePost(event) {
        const postIndex = event.target.getAttribute('data-index');
        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        posts.splice(postIndex, 1); // Remove the selected post
        localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
        loadPosts(); // Reload the posts to reflect the removal
    }

    // Handle form submission for creating new posts
    const postForm = document.getElementById('post-form');
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title && content) {
            savePost(title, content);
            postForm.reset(); // Clear the form fields
            loadPosts(); // Reload posts after adding new one
        }
    });

    // Initial load of posts
    loadPosts();
});
