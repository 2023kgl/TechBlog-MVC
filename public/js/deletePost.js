// TODO NOT DELETING !!!!!
// delete
const deletePostHandler = async (event) => {
    event.preventDefault()
  
    const response = await fetch(`/api/posts`, {
      method: "DELETE",
    })
console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard")
    } else {
      alert("Post not deleted"); 
    }
  }

document.querySelector('.deletePost').addEventListener('click', deletePostHandler)