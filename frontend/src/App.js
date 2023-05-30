import "./App.css";
import Chats from "../src/pages/ChatsPage";
import Home from "./pages/Home";
import { Route,  } from "react-router-dom";

function App() {
  return (
    <div className="App" >
      <Route path="/" component={Home} exact/>
      <Route path="/chats" component={Chats}  />
    </div>
  );
}

export default App;
