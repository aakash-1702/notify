"use client"

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from "next-themes"

const ModeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-2 border-emerald-400/50 bg-emerald-900/30 backdrop-blur-md hover:scale-110 hover:border-emerald-300 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-emerald-200" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-emerald-200" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl border-emerald-700/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer text-emerald-200 hover:bg-emerald-800/50 focus:bg-emerald-800/50">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer text-emerald-200 hover:bg-emerald-800/50 focus:bg-emerald-800/50">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer text-emerald-200 hover:bg-emerald-800/50 focus:bg-emerald-800/50">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/80 via-teal-800/70 to-cyan-900/80 shadow-2xl backdrop-blur-xl border border-emerald-600/40 pointer-events-auto">
        {/* Inner glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
        
        {/* Main content */}
        <div className="relative flex items-center justify-between px-8 py-5">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-xl ring-4 ring-emerald-400/30">
              <span className="text-3xl font-black text-emerald-950">N</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-200 bg-clip-text text-transparent tracking-tighter">
              notely
            </h1>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>

        {/* Bottom glow line - more vibrant */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"></div>
      </div>
    </nav>
  )
}

export default Navbar