import Login from "./pages/login"
import { Routes, Route } from "react-router-dom";
import Books from "./pages/books";
import Dashboard from "./pages/dasboard";
import Admin from "./pages/admin";
import ReturnBooks from "./pages/returnBooks";
import BorrowingRecords from "./pages/borrow";
import Home from "./pages/home";
function App() {


  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/books/return" element={<ReturnBooks />} />
          <Route path="/books/borrow" element={<BorrowingRecords />} />
        </Routes>
      </main>
    </>
  )
}

export default App