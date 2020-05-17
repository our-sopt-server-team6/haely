let postData = [
    {
        idx: 0,
        author: 'gngsn',
        title: '안녕하세요 ~',
        content: '안녕하세요 ~ 테스트임다',
        created_at: '2020-05-10'
    },
    {
        idx: 1,
        title: '안녕하세요11 ~',
        author: 'gyeong',
        content: '안녕하세요 11~ 테스트임다',
        created_at: '2020-05-10'
    },
    {
        idx: 2,
        "title": "postman",
        "author": "gyeongseon",
        "content": "postman test~",
        created_at: '2020-05-10'
    },
];

const post = {
    readAll : async() => {
        return postData;
    },

    read : async(idx) => {
        const thatPost = postData.filter(post => post.idx == idx);
        return thatPost;
    },

    create : async(author, title, content, created_at) => {
        const idx = postData[postData.length -1].idx + 1;
        const createPost = {
            idx,
            author,
            title,
            title,
            content,
            created_at
        }
        postData.push(createPost);
        return idx;
    },

    update : async(idx, updatePost) => {
        for(i in updatePost){
            if(updatePost[i] !== undefined){
                postData[idx][`${i}`] = updatePost[i];
            }
        }
        return postData[idx];
    },

    delete : async(idx) => {
        postData.splice(idx);
        return true;
    }

}

module.exports = post;