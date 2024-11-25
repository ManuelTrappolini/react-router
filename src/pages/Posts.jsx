
import { useState, useEffect } from 'react'

const emptyPost = {
    title: "",
    image: "",
    content: "",
    tags: '',
    published: false,
}


export default function PostPage() {
    const [formData, setFormData] = useState(emptyPost)
    const [posts, setPosts] = useState('')
    const [postsData, setPostsData] = useState({})

    function handleClick(e) {
        fetchData()
    }

    function fetchData(url = 'http://127.0.0.1:3002') {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setPostsData(data)

            })
    }

    useEffect(fetchData, [])



    function handleFormSubmit(e) {

        e.preventDefault()
        console.log('Form sent', formData);

        const newItem = {
            id: Date.now(),
            ...formData
        }


        setPosts([
            ...posts,
            newItem
        ])

        setFormData(emptyPost)


        const url = `http://127.0.0.1:3002/posts/`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: formData.title,
                content: formData.content,
                tags: formData.tags,
                image: formData.image
            })
        })
            .then((res) => res.json())
            .then(data => {
                setPostsData(data)

            })
    }

    function handleFormField(e) {
        //console.log(e.target);

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData({
            ...formData,
            [e.target.name]: value

        })

    }

    function handleDeleteClick(id) {
        console.log('clicked', postsData);

        const postIndexToTrash = Number(id.target.getAttribute('data-index'))
        console.log(postIndexToTrash);
        console.log('form data:', postsData.data);



        fetch(`http://127.0.0.1:3002/posts/${postIndexToTrash}`, {

            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

            })
    }


    return (
        <div className="containter pt-5">

            <form onSubmit={handleFormSubmit}>

                <div className="input-group mb-3">

                    <label htmlFor="post" className='farm-label m-3'></label>
                    <div className="input-group mb-3">
                        <input type="text"
                            className="form-control"
                            placeholder="Recipient's title"
                            aria-label="Recipient's title"
                            aria-describedby="titlehelper"
                            value={formData.title}
                            name='title'
                            id='title'
                            onChange={handleFormField}
                        />
                        <input type="text"
                            className="form-control"
                            placeholder="Recipient's tags"
                            aria-label="Recipient's tags"
                            aria-describedby="tagshelper"
                            value={formData.tags}
                            name='tags'
                            id='tags'
                            onChange={handleFormField}
                        />
                        <input type="text"
                            className="form-control"
                            placeholder="Recipient's image"
                            aria-label="Recipient's image"
                            aria-describedby="imagehelper"
                            value={formData.image}
                            name='image'
                            id='image'
                            onChange={handleFormField}
                        />


                        <textarea type="text" className="form-control"
                            placeholder="Recipient's content"
                            aria-label="Recipient's content"
                            aria-describedby="contenthelper"
                            value={formData.content}
                            name='content'
                            id='content'
                            onChange={handleFormField}
                        />


                        <button className='btn btn-outline-secondary' type='submit' onClick={handleFormSubmit}> Click ME</button>
                    </div>
                    <div className="form-check m-3">
                        <input
                            id="published"
                            name='published'
                            type="checkbox"
                            className="form-check-input"
                            value={formData.published}
                            onChange={handleFormField}

                        />
                        <label className="form-check-label" htmlFor=""> Published </label>
                    </div>
                </div>


            </form>

            <ul>
                {postsData.data ? postsData.data.map((post, index) => (
                    <div className="col" key={post.id} >
                        <div className="card m-3">
                            <li className='m-2'><h3>{post.title}:</h3></li>
                            <li className='m-2'><img src={`http://127.0.0.1:3002/${post.image}`} height={250} width={250} alt="" /></li>
                            <li className='m-2'>{post.content}</li>
                            <li className='m-2'><span className='tags'>{`${post.tags} ${" "} `}</span> </li>
                            <button onClick={handleDeleteClick} data-index={index} className='btn btn-danger mb-3 mt-3'>Delete Post</button>

                        </div>
                    </div>
                ))
                    : <p>no result yet</p>
                }
            </ul >
        </div >

    )
}

