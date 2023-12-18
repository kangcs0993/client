import {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import PostTemplate from "./posttemplate/PostTemplate";
import {getPost, deletePost, likePost, unlikePost} from "../service/post";
import Spinner from "./Spinner";
import AuthContext from "./auth/AuthContext";

export default function PostView(){
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    console.log(post);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(){
        try{
            const data = await getPost(id);

            setPost(data.post);
        }catch(error){
            navigate("/notfound", {replace: true});
        }
    }

    async function handleLike(id){
        try{
            await likePost(id);

            const updatedPost = {
                ...post,
                liked: true,
                likesCount: post.likesCount + 1
            }

            setPost(updatedPost);
        }catch(error){
            alert(error);
        }
    };

    async function handleUnlike(id){
        try{
            await unlikePost(id);

            const updatedPost = {
                ...post,
                liked: false,
                likesCount: post.likesCount - 1
            }

            setPost(updatedPost);
        }catch(error){
            alert(error);
        }
    };

    async function handleDelete(id){
        try{
            await deletePost(id);

            navigate("/", {replace: true});
        }catch(error){
            alert(error);
        }
    };

    if(!post){
        return <Spinner></Spinner>
    }

    return(
        <PostTemplate id={post.id}
                      username={post.user.username}
                      avatarUrl={post.user.avatarUrl}
                      photoURLs={post.photoURLs}
                      caption={post.caption}
                      likesCount={post.likesCount}
                      commentCount={post.commentCount}
                      displayDate={post.displayDate}
                      liked={post.liked}
                      handleLike={handleLike}
                      handleUnlike={handleUnlike}
                      handleDelete={handleDelete}
                      isMaster={user.username === post.user.username}
        >
        </PostTemplate>
    )
}