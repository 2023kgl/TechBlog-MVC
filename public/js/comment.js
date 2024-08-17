const commentHandler = async (event) => {
    event.preventDefault()
  
    const postId = window.location.toString().split("/").pop()
  
    const comment = document.querySelector('#comment').value.trim()
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text: comment, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload()

      } else {
        alert('Failed to create a comment.')
      }
    }
  }
  
document.querySelector('#addCommentForm').addEventListener('submit', commentHandler)