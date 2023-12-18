import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createPost} from "../service/post";

export default function PostForm(){
    const [files, setFiles] = useState([]);
    const [caption, setCaption] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        try{
            e.preventDefault();

            const formData = new FormData();

            files.forEach((file) => {
                formData.append("photos", file);
            });

            formData.append("caption", caption);

            await createPost(formData);

            navigate("/");
        }catch(error){
            alert(error);
        }
    };

    const photoPreviewList = files.map((file) => {
        return(
            <li key={file.name}
                className="pt-[100%] relative"
            >
                <img className="absolute inset-0 w-full h-full object-cover"
                     src={URL.createObjectURL(file)}
                     alt={file.name}
                >
                </img>
            </li>
        )
    })

    return(
        <form className="bg-white max-w-xs mt-20 mx-auto rounded-2xl"
              onSubmit={handleSubmit}
        >
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-center">
                    create new post
                </h3>
            </div>

            <div className="p-4">
                <label className="inline-block mb-2 font-semibold text-sm px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
                    <input type="file"
                           className="hidden"
                           onChange={({ target }) => setFiles([...files, ...Array.from(target.files)])}
                           multiple={true}
                           accept="image/png, image/jpg, image/jpeg"
                    ></input>
                    select photos +
                </label>

                {files.length > 0 && (
                    <ul className="grid grid-cols-3 mb-2">
                        {photoPreviewList}
                    </ul>
                )}

                <div className="mb-2">
                    <label htmlFor="caption"
                           className="block font-semibold"
                    >
                        caption
                    </label>

                    <textarea rows="2"
                              id="caption"
                              className="block w-full px-2 py-1 rounded border resize-none"
                              onChange={({target}) => setCaption(target.value)}
                              value={caption}
                    >
                    </textarea>

                    <button type="submit"
                            className="px-4 py-2 text-sm font-semibold bg-blue-500 rounded-lg text-white disaboled:opacity-[0.2]"
                            disabled={files.length < 1}
                    >
                        upload
                    </button>
                </div>
            </div>
        </form>
    )


}