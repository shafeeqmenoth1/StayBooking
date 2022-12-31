import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelInputs, roomInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import SingleRoom from "./pages/singleRoom/SingleRoom";
import EditRoom from "./pages/editRoom/EditRoom";
import EditHotel from "./pages/editHotel/EditHotel";
import EditUser from "./pages/editUser/EditUser";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({children})=>{
    const {user} = useContext(AuthContext)

    if(!user) {
      return <Navigate to ="/login"/>
    }
    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
            <Route index element={
            <ProtectedRoute>
            <Home />
            </ProtectedRoute>
            } />
            
            <Route path="users">
              <Route index element={
               <ProtectedRoute>
               <List columns={userColumns} />
               </ProtectedRoute>
              } />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
               <New/>
                  </ProtectedRoute>
                }
              />
                <Route
                path="edit/:userId"
                element={
                  <ProtectedRoute>
               <EditUser/>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={
               <ProtectedRoute>
               <List columns={hotelColumns}/>
                  </ProtectedRoute>
             } />
              <Route path=":hotelId" element={<SingleHotel />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                  <NewHotel/>
                     </ProtectedRoute>
               }
              />
               <Route
                path="edit/:hotelId"
                element={
                  <ProtectedRoute>
                  <EditHotel/>
                     </ProtectedRoute>
               }
              />
            </Route>
            <Route path="rooms">
              <Route index element={
               <ProtectedRoute>
               <List columns={roomColumns} />
                  </ProtectedRoute>
             } />
              <Route path=":roomId" element={<SingleRoom />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                  <NewRoom/>
                     </ProtectedRoute>
               }
              />
                <Route
                path="edit/:roomId"
                element={
                  <ProtectedRoute>
                  <EditRoom/>
                     </ProtectedRoute>
               }
              />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
