import { Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStrore.js'

function App() {
  // zustand is the package used for solvong props trilling problem
  // it is the centrelized store used to store the value and used by any component

  const {authUser,login,isLoggedIn}=useAuthStore();
  console.log("authuser:",authUser);
  console.log("isLoggedIn:",isLoggedIn);

  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
      {/* decorators - grid bg & glow shapes */}
      
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px), linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"/>
      {/* PINK GLOW */}
      <div className="absolute top-0 -left-32 w-[500px] h-[500px] bg-pink-500 opacity-20 blur-[150px]" />
      {/* CYAN GLOW */}
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[150px]" />


      <button onClick={login} className='z-10'>Login</button>

      <Routes>
        <Route path='/' element={<ChatPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
      </Routes>
    </div>
    
  )
}

export default App;