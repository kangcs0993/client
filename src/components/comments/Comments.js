import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {getComments, createComment, deleteComment} from "../../service/comment";
import Form from "./Form";
import Comment from "./Comment";
import Spinner from "../Spinner";

export default function Comments(){
    const {id} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);

    console.log(comments);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(){
        try{
            const data = await getComments(id);

            setComments([...comments, ...data.comments]);
        }catch(error){
            setError(error);
        }finally{
            setIsLoaded(true);
        }
    }

    async function handleAddComment(content){
        try{
            const data = await createComment(id, content);

            const updatedComments = [data.comment, ...comments];

            setComments(updatedComments);
        }catch(error){
            alert(error);
        }
    };

    async function handleDelete(id){
        try{
            await deleteComment(id);

            const remainingComments = comments.filter((comment) => {
                return comment.id !== id;
            })

            setComments(remainingComments);
        }catch(error){
            alert(error);
        }
    };

    const commentList = comments.map((comment) => {
        return(
            <Comment key={comment.id}
                     id={comment.id}
                     username={comment.user.username}
                     avatarUrl={comment.user.avatarUrl}
                     content={comment.content}
                     displayDate={comment.displayDate}
                     handleDelete={handleDelete}
            >
            </Comment>
        )
    })

    return(
        <div className="px-4">
            <h3 className="text-lg font-semibold my-4">
                comments
            </h3>

            <Form handleAddComment={handleAddComment}>
            </Form>

            {commentList.length > 0 ? (
                <ul>
                    {commentList}
                </ul>
            ):(
                <p className="text-center">
                    no comments
                </p>
            )}

            {!isLoaded && <Spinner></Spinner>}

            {error && (
                <p className="text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )

}