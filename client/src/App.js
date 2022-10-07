import "./App.css";
import { FaReact } from "react-icons/fa";
import FileUpload from "./components/FileUpload";
function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <FaReact /> React File Upload
      </h4>
      <FileUpload />
    </div>
  );
}

export default App;
