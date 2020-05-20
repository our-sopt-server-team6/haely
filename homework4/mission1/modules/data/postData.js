module.exports = 
    (rawPostData) => {
        postData = {
            "postIdx": rawPostData.postIdx,
            "author": rawPostData.author,
            "title": rawPostData.title,
            "content": rawPostData.content,
            "createdAt": rawPostData.createdAt
        }
        return postData
    }