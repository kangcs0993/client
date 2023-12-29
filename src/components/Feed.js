import {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import PostTemplate from "./posttemplate/PostTemplate";
import {getFeed, deletePost, likePost, unlikePost} from "../service/post";
import Spinner from "./Spinner";
import AuthContext from "./auth/AuthContext";

export default function Feed(){
    const {user} = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [skip, setSkip] = useState(0);
    const limit = 5;

    useEffect(() => {
        fetchData();
    }, [skip]);

    async function fetchData(){
        try{
            setError(null);
            setIsLoaded(false);

            const data = await getFeed(limit, skip);

            const updatedPosts = [...posts, ...data.posts];

            setPosts(updatedPosts);
            setPostCount(data.postCount);
        }catch(error){
            setError(error);
        }finally{
            setIsLoaded(true);
        }
    }

    async function handleLike(id){
        try{
            await likePost(id);

            const updatedPosts = posts.map((post) => {
                if(post.id === id){
                    return {
                        ...post,
                        liked: true,
                        likesCount: post.likesCount + 1
                    }
                }
                return post;
            })

            setPosts(updatedPosts);
        }catch(error){
            alert(error);
        }
    };

    async function handleUnlike(id){
        try{
            await unlikePost(id);

            const updatedPosts = posts.map((post) => {
                if(post.id === id){
                    return {
                        ...post,
                        liked: false,
                        likesCount: post.likesCount - 1
                    }
                }
                return post;
            })

            setPosts(updatedPosts);
        }catch(error){
            alert(error);
        }
    };

    async function handleDelete(id){
        try{
            await deletePost(id);

            const remainingPosts = posts.filter((post) => {
                if(id !== post.id){
                    return post;
                }
            })

            setPosts(remainingPosts);
        }catch(error){
            alert(error);
        }
    };

    const postList = posts.map((post) => {

        console.log("-")
        console.log(posts)
        console.log(post)
        return(
            <PostTemplate key={post.id}
                          id={post.id}
                          username={post.user.username}
                          avatarUrl={post.user.avatarUrl}
                          photoURLs={post.photoURLs}
                          caption={post.caption}
                          liked={post.liked}
                          likesCount={post.likesCount}
                          commentCount={post.commentCount}
                          displayDate={post.displayDate}
                          handleLike={handleLike}
                          handleUnlike={handleUnlike}
                          handleDelete={handleDelete}
                          isMaster={user.username === post.username}
            >
            </PostTemplate>
    )})

    const doesMoreExist = postCount > posts.length;

    const showMoreBtn = (
        <div className="flex justify-center my-2">
            <button className="p-1 text-blue-500 font-semibold"
                    onClick={() => setSkip(skip + limit)}
            >
                see more
            </button>
        </div>
    )

    return(
        <>
            {postList.length > 0 ? (
                <ul>
                    {postList}
                </ul>
            ):(
                <div className="p-8 text-center">
                    <Link className="text-blue-500"
                          to="/explore"
                    >
                        search instagram
                    </Link>
                </div>
            )}

            {doesMoreExist && showMoreBtn}

            {!isLoaded && <Spinner></Spinner>}

            {error && (
                <p className="text-red-500">
                    {error.message}
                </p>
            )}
        </>
    )
}