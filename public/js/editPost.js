// TODO NOT WORKING !!!!!!!!
// grab id form url
const post_id = window.location.toString().split("/").pop()
  
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



document.querySelector('.updatePost').addEventListener('submit', updatePostHandler)
