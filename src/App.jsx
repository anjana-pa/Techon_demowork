import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import DepartmentDetails from "./pages/DepartmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/department/:deptId" element={<DepartmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
