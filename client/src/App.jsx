import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogPost from './pages/BlogPost.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPosts from './pages/AdminPosts.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Books from './pages/Books.jsx';
import Links from './pages/Links.jsx';
import AdminLinks from './pages/AdminLinks.jsx';
import Entry from './pages/Entry.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/books" element={<Books />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/links" element={<Links />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/posts" element={<RequireAuth><AdminPosts /></RequireAuth>} />
          <Route path="/admin/links" element={<RequireAuth><AdminLinks /></RequireAuth>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
