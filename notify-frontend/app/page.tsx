'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Instagram, Code2, Twitter } from 'lucide-react'

const LandingPage = () => {
  return (
    <>
      {/* Hero + Main Content */}
      <div className='flex-1 flex flex-col'> {/* Removed min-h-screen from here */}
        <main className='flex-1 flex items-center justify-center px-6 py-24 relative z-10'>
          <div className='max-w-5xl mx-auto text-center space-y-12'>
            {/* Floating Logo */}
            <div className='flex justify-center mb-10 animate-float'>
              <div className='w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-2xl ring-8 ring-emerald-400/20'>
                <span className='text-6xl font-extrabold text-emerald-950 drop-shadow-lg'>N</span>
              </div>
            </div>

            <h1 className='text-6xl md:text-8xl font-black bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight'>
              Forget Notepad
            </h1>
            
            <h2 className='text-3xl md:text-5xl font-bold text-emerald-100/95 tracking-tight'>
              Your Notes, But Make It Iconic
            </h2>

            <p className='text-lg md:text-xl text-emerald-100/70 max-w-2xl mx-auto leading-relaxed font-medium'>
              Organize your chaos, track your glow-up, and flex those revision stats. Notes that actually slap.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center pt-8'>
              <Button 
                size='lg'
                className='relative text-lg px-10 py-7 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-2xl overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-emerald-500/60'
              >
                <span className='relative z-10'>Start For Free</span>
                <div className='absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out' />
              </Button>
              <Button 
                size='lg'
                variant='outline'
                className='text-lg px-10 py-7 border-2 border-emerald-400/60 text-emerald-100 backdrop-blur-md bg-emerald-900/20 hover:bg-emerald-800/40 hover:border-emerald-300 hover:text-white font-bold transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30'
              >
                Login
              </Button>
            </div>

            {/* Features Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 max-w-5xl mx-auto pb-20'>
              {[
                { icon: '📝', title: 'Easy Organization', desc: 'All your notes in one clean vibe' },
                { icon: '📊', title: 'Track Progress', desc: 'See your revision glow-up in real time' },
                { icon: '🔗', title: 'Resource Links', desc: 'Drop links, videos, anything — it stays' },
              ].map((feature, i) => (
                <div 
                  key={i}
                  className='p-8 rounded-3xl bg-emerald-900/30 border border-emerald-700/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-600/30 transition-all duration-500 ease-out hover:-translate-y-4 group'
                >
                  <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                    {feature.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-emerald-200 mb-3'>{feature.title}</h3>
                  <p className='text-emerald-100/70 font-medium'>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer - outside the flex-1 so it stays at bottom */}
      <footer className='relative border-t border-emerald-800/40 bg-slate-950/60 backdrop-blur-lg z-10'>
        <div className='max-w-7xl mx-auto px-6 py-10'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg'>
                <span className='text-3xl font-black text-emerald-950'>N</span>
              </div>
              <div>
                <h3 className='text-xl font-bold text-emerald-200'>notely</h3>
                <p className='text-sm text-emerald-100/60'>notes that hit different</p>
              </div>
            </div>

            <div className='flex items-center gap-5'>
              {[Linkedin, Github, Code2, Instagram, Twitter].map((Icon, i) => (
                <a 
                  key={i}
                  href='#' 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='w-12 h-12 rounded-full bg-emerald-900/40 hover:bg-emerald-700/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-emerald-500/50'
                >
                  <Icon className='h-6 w-6 text-emerald-300' />
                </a>
              ))}
            </div>
          </div>

          <div className='mt-8 pt-8 border-t border-emerald-800/30 text-center'>
            <p className='text-sm text-emerald-100/50 font-medium'>
              © 2024 notely. Built different.
            </p>
          </div>
        </div>
      </footer>

      {/* Background glows */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none -z-10'>
        <div className='absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default LandingPage