import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componnent/Login/Login";
import Dashboard from "./componnent/Dashboard/Dashboard/Dashboard";
import UserList from "./componnent/Dashboard/UserList/UserList";
import Community from "./componnent/Dashboard/Community/Community";
import Event from "./componnent/Dashboard/Event/Event";
import CommunityList from "./componnent/Dashboard/CommunityList/CommunityList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/userlist" element={<UserList />} />
            <Route path="/dashboard/community" element={<Community />} />
            <Route path="/dashboard/event" element={<Event />} />
            <Route
              path="/dashboard/communitylist"
              element={<CommunityList />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
