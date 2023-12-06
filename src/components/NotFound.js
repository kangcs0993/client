import {useEffect} from "react";
import {Link} from "react-router-dom";

export default function NotFound(){
    useEffect(() => {
        document.title = "cannot find - instagram";
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold my-4 text-center">
                cannot use page
            </h1>
            <p className="my-4 text-center">
                link is incorrect or the page is deleted
            </p>

            <Link to="/" className="block text-center text-blue-500 font-semibold">
                back
            </Link>
        </div>
    )
}