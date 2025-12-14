// import { Route, Routes ,Navigate} from 'react-router'
// import ChatPage from './pages/ChatPage'
// import LoginPage from './pages/LoginPage'
// import SignUpPage from './pages/SignUpPage'
// import { useAuthStore } from './store/useAuthStrore.js'
// import { useEffect } from 'react'
// import PageLoader from './components/PageLoader.jsx'

// import {Toaster} from "react-hot-toast";

// function App() {
//   // zustand is the package used for solvong props trilling problem
//   // it is the centrelized store used to store the value and used by any component

//   const {checkAuth,isCheckingAuth,authUser}=useAuthStore();

//   useEffect(()=>{
//     checkAuth()
//   },[checkAuth]);

//   console.log({authUser});

//   if(isCheckingAuth) return <PageLoader />;


//   return (
//     <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
//       {/* decorators - grid bg & glow shapes */}

//       <div
//         className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px), linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"/>
//       {/* PINK GLOW */}
//       <div className="absolute top-0 -left-32 w-[500px] h-[500px] bg-pink-500 opacity-20 blur-[150px]" />
//       {/* CYAN GLOW */}
//       <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[150px]" />


//       <Routes>
//         <Route path='/' element={authUser ? <ChatPage /> : <Navigate to={"/login"} /> } />
//         <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} /> }/>
//         <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} /> }/>
//       </Routes>

//       <Toaster/>

//     </div>

//   )
// }

// export default App;




import { Route, Routes ,Navigate} from 'react-router';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStrore.js';
import { useEffect } from 'react';
import PageLoader from './components/PageLoader.jsx';
import {Toaster} from "react-hot-toast";

function App() {
  // zustand is the package used for solvong props trilling problem
  // it is the centrelized store used to store the value and used by any component


  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth) return <PageLoader />;

  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
      {/* decorators - grid bg & glow shapes */}

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px), linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
      {/* PINK GLOW */}
      <div className="absolute top-0 -left-32 w-[500px] h-[500px] bg-pink-500 opacity-20 blur-[150px]" />
      {/* CYAN GLOW */}
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[150px]" />


      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>


      <Toaster/>
      
    </div>
  )
}

export default App