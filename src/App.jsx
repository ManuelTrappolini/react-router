

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import DefaultLayout from './pages/DefaultLayout'
import Home from './pages/Home'
import PostPage from './pages/Posts'
import About from './pages/AboutUs'





function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/posts' element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App