import {useState} from "react";

export default function Form({handleAddComment}){
    const [content, setContent] = useState("");

    async function handleSubmit(e){
        try{
            e.preventDefault();

            await handleAddComment(content);
            
            setContent("");
        }catch(error){
            alert(error);
        }
    }

    return(
        <form className="mb-4"
              onSubmit={handleSubmit}
        >
            <textarea className="border w-full px-2 py-1 rounded resize-none"
                      rows="2"
                      value={content}
                      onChange={({target}) => setContent(target.value)}
            >
            </textarea>

            <button className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-[0.2]"
                    type="submit"
                    disabled={!content.trim()}
            >
                reply
            </button>
        </form>
    )
}