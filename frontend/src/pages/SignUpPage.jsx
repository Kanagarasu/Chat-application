import React, { useState } from 'react'
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimationContainer from '../components/BorderAnimationContainer';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import {Link} from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  const { signup, isSigningUp } = useAuthStore();

  const handilesubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };


  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900 '>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <BorderAnimationContainer>
          <div className='w-full flex flex-col md:flex-row '>
            {/* form cloumn - left site*/}
            <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 '>
              <div className='w-full max-w-md'>

                {/* Heading text */}
                <div className='text-center mb-8'>
                  <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                  <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                  <p className='text-slate-400'>Sign up for a new account</p>
                </div>


                {/* form */}
                <form onSubmit={handilesubmit} className='space-y-6'>

                  {/* full name */}
                  <div>
                    <label className='auth-input-label'>Full Name</label>
                    <div className='relative'>
                      <UserIcon className='auth-input-icon' />

                      <input type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className='input'
                        placeholder='kanagarasu'
                      />

                    </div>
                  </div>


                  {/* email input */}
                  <div>
                    <label className='auth-input-label'>Emial</label>
                    <div className='relative'>
                      <MailIcon className='auth-input-icon' />

                      <input type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='input'
                        placeholder='kanagarasu445@gmail.com'
                      />

                    </div>
                  </div>

                  {/* password input */}
                  <div>
                    <label className='auth-input-label'>Password</label>
                    <div className='relative'>
                      <LockIcon className='auth-input-icon' />

                      <input type="password"
                        value={formData.password}
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        className='input'
                        placeholder='Enter your password'
                      />

                    </div>
                  </div>

                  {/* submit button */}
                  <button className='auth-btn' type='submit' disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className='w-full h-5 animate-spin text-center'/>
                    ):("create Account")
                    }
                  </button>

                </form>

                <div className='mt-6 text-center'>
                  <Link to="/login" className="auth-link">
                    Already have an account ? Login
                  </Link>
                  
                </div>

              </div>
            </div>

            {/* right site */}
             <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimationContainer>

      </div>
    </div>
  )
}

export default SignUpPage;
