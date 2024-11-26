import { Navigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";


export default function SinglePostPage() {
    const [post, setPost] = useState()
    const { id } = useParams();
    console.log(id);
    const url = `http://127.0.0.1:3002/posts/${id}`
    console.log(url);


    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data.data)

            })
            .catch(err => {
                console.log(err);

            })
    },
        [])


    return (
        <>
            <h2 className="p-5 bg-grey">Post id : {id}</h2>

            {
                post ? (
                    <>

                        <div className="col main" key={post.id} >

                            <div className="card m-3">
                                <li className='m-2'><h3>{post.title}:</h3></li>
                                <li className='m-2'><img src={`http://127.0.0.1:3002/${post.image}`} height={250} width={250} alt="" /></li>
                                <li className='m-2'>{post.content}</li>
                                <li className='m-2'><span className='tags'>{`${post.tags} ${" "} `}</span> </li>


                            </div>
                        </div>

                    </>





                ) : (

                    <h2 className="text-center bg-grey">🤷‍♂️ We are sorry but we can't find Post with id: {id} 🤷‍♂️</h2 >
                )
            }



        </>

    )
}