const Post = require('../../models/post')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation:{
        createComment: async (_,{postId,body},context)=>{
            const {username}= checkAuth(context)
            if(body.trim()===' '){
                throw new Error('Comment cannot be empty')
            }
            const post = await Post.findById(postId)
            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()

                })
                await post.save()
                return post
            }
            else throw new Error('Post not found')
        },
        deleteComment: async(_,{postId,commentId},context)=>{
            const {username} = checkAuth(context)
            const post = await Post.findById(postId)
            if(post){
                const commentindex = post.comments.findIndex(c => c.id===commentId)
                if(post.comments[commentindex].username === username){
                post.comments.splice(commentindex,1)
                await post.save()
                return post
                }
                else {
                    throw new Error('Not authorized')
                }
            } 
        },
        likePost: async(_,{postId},context)=>{
            const {username} = checkAuth(context)
            const post = await Post.findById(postId)
            if(post){
            if(post.likes.find((like) => like.username===username)){
                post.likes = post.likes.filter(like => like.username!==username)
            }
            else{
                post.likes.push({
                    username,
                    createdAt: new Date().toISOString(),
                })
            }
                await post.save()
                return post
            }
            else{
                throw new error('Post not found')
            }
        }
    }
}