import PostsCard from "../components/Card/PostsCard.jsx"
import posts from "../data/db.js"


export default function Home() {

    return (
        <>


            <main className="main">
                <h3>Home Page</h3>
                <div className="container">
                    {posts.map((post, index) => <PostsCard key={index} post={post} />)}
                </div>

            </main>


        </>

    )
}