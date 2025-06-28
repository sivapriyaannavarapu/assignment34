

// import { Routes, Route, useLocation } from 'react-router-dom';
// import Header from './components/Header';
// import Login from './components/Login';
// import Sidebar from './components/Sidebar';
// import StudentProfile from './components/StudentSearch';
// import Screen from './components/profilepage';

// function App() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === '/';

//   return (
//     <div className="App">
//       {!isLoginPage && (
//         <>
//           <header className="App-header">
//             <Header />
//           </header>
//           <div className="App-body d-flex gap-3" style={{ width: '100%', height: '92vh' }}>
//             <aside style={{ width: '15%' }}>
//               <Sidebar />
//             </aside>
//             <div style={{ width: '85%' }} className="pe-3">
//               <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/homepage" element={<StudentProfile />} />
//                 <Route path="/student/*" element={<Screen />} />
//               </Routes>
//             </div>
//           </div>
//         </>
//       )}
//       {isLoginPage && (
//         <Routes>
//           <Route path="/" element={<Login />} />
//         </Routes>
//       )}
//     </div>
//   );
// }

// export default App;

import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import StudentProfile from "./components/StudentSearch";
import { StudentProvider } from './components/customHooks/StudentContext';
import ProfilePage from './components/profilepage';
// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default query options (optional)
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1, // Retry failed requests once
    },
  },
});

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    // Wrap the app with QueryClientProvider
    <StudentProvider>
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {!isLoginPage && (
          <>
            <header className="App-header">
              <Header />
            </header>
            <div id="app_body" className="d-flex gap-3" style={{ width: "100%", height: "92vh" }}>
              <aside style={{ width: "15%" }}>
                <Sidebar />
              </aside>
              <div style={{ width: "85%" }}>
                <Routes>
                  <Route path="/homepage" element={<StudentProfile />} />
                  <Route path="/student/*" element={<ProfilePage />} />
                </Routes>
              </div>
            </div>
          </>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </QueryClientProvider>
    </StudentProvider>
  );
}

export default App;