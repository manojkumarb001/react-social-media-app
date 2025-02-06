import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Navbar from "./Navbar";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";

import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";


function App() {



  return (
    <div className="App">

      <DataProvider>
        <Header title="React Social Media Page"/>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/posts'>
            <Route index element={<NewPost/>} />
            <Route path=':id' element={<PostPage/>} />
          </Route>
          <Route path="/edit/:id" element={<EditPost/>}></Route>
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>

        <Footer />

      </DataProvider>















      {/*       <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/header">Header</Link>
          </li>
          <li>
            <Link to="/navbar">NavBar</Link>
          </li>

          <li>
            <Link to="/postpage">Post Page</Link>
          </li>
        </ul>
      </nav>
 */}
      {/*       <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/header" element={<Header />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
        <Route path="/newpost" element={<NewPost />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/missing" element={<Missing />}></Route>
        <Route path="/footer" element={<Footer />}></Route>

        <Route path="/postpage" element={<PostLayout />}>

          <Route index element={<PostPage />}></Route>
          <Route path=":id" element={<Posts />}></Route>
          <Route path="newpost" element={<NewPost />}></Route>
        </Route>

                 <Route path="/postpage" element={ <PostPage />}></Route>
        <Route path="/postpage/:id" element={<Posts /> }></Route>
        <Route path="/postpage/newpost" element={<NewPost /> }></Route>

        <Route path="*" element={<Missing />} />

      </Routes>
 */}

    </div>
  );
}

export default App;
