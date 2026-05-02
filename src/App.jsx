import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import All_Items from "./components/All_Items/All_Items";
import ItemForm from "./components/ItemForm/ItemForm";

import ProtectedRoute from "./ProtectedRoute";
import { auth } from "./config/firebase";
import { BrowserRouter , Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute children={<Home />} />} />
        <Route path="/all-items" element={<ProtectedRoute children={<All_Items />} />} />
        <Route path="/report-item" element={<ProtectedRoute children={<ItemForm />} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
