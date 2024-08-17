const id = window.location.toString().split("/").pop()

const deletePostHandler = async (event) => {
    event.preventDefault()
  
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      document.location.replace("/dashboard")

    } else {
      alert("Post not deleted"); 
    }

  }

document.querySelector('.deletePost').addEventListener('click', deletePostHandler)