const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim()
    const content = document.querySelector('#postContent').value.trim()

console.log(title,content)

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        })
console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard')
          } else {
            alert('Failed to create a new post.')
          }
    }
}

document.querySelector('.newpost-form').addEventListener('submit', newPost)