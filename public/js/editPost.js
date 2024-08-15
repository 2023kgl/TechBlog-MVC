// grab id
const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  
  // update post
  const updatePostHandler = async (event) => {
    event.preventDefault()
  
    const title = document.querySelector("#updateTitle").value.trim()
    const content = document.querySelector("#updateContent").value.trim()
  
    if (title && content) {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      })
  
      if (response.ok) {
        document.location.replace("/dashboard")
      } else {
        alert("Failed to update post")
      }
    }
  }

// delete
const deletePostHandler = async (event) => {
    event.preventDefault()
  
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    })
  
    if (response.ok) {
      document.location.replace("/dashboard")
    } else {
      alert("Post not deleted"); 
    }
  }

document.querySelector('.updatePost').addEventListener('submit', updatePostHandler)
document.querySelector('.deletePost').addEventListener('submit', updatePostHandler)