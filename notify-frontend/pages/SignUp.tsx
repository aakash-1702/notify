'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    
    // Add your sign-up logic here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4 pt-24 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950'>
      <Card className='w-full max-w-md relative overflow-hidden border-2 border-emerald-200/50 dark:border-emerald-800/50 shadow-2xl'>
        {/* Gradient overlay effect */}
        <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'></div>
        
        <CardHeader className='space-y-1 pt-8'>
          <div className='flex justify-center mb-4'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg'>
              <span className='text-4xl font-bold text-emerald-950'>N</span>
            </div>
          </div>
          <CardTitle className='text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'>
            Join notely
          </CardTitle>
          <CardDescription className='text-center text-base'>
            Create your account and start taking notes
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4 pb-8'>
          <div className='space-y-4'>
            {/* Username Field */}
            <div className='space-y-2'>
              <Label htmlFor='username' className='text-sm font-medium'>
                Username
              </Label>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='johndoe'
                value={formData.username}
                onChange={handleChange}
                className='h-11 border-2 focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors'
              />
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium'>
                Email
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='john@example.com'
                value={formData.email}
                onChange={handleChange}
                className='h-11 border-2 focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors'
              />
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium'>
                Password
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='••••••••'
                value={formData.password}
                onChange={handleChange}
                className='h-11 border-2 focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors'
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className='w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 mt-6'
            >
              Create Account
            </Button>
          </div>

          {/* Sign In Link */}
          <div className='text-center text-sm text-muted-foreground pt-4'>
            Already have an account?{' '}
            <a href='#' className='text-emerald-600 dark:text-emerald-400 font-semibold hover:underline'>
              Sign in
            </a>
          </div>
        </CardContent>

        {/* Bottom accent */}
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent'></div>
      </Card>
    </div>
  )
}

export default SignUp