"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Lock, Mail, Loader2, LogIn, AlertCircle } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })

    // Clear error when user types
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      })
    }
  }

  async function handleLogin(e) {
    e.preventDefault()

    // Validate form
    let hasErrors = false
    const newErrors = { username: "", password: "", general: "" }

    if (!formData.username) {
      newErrors.username = "Username is required"
      hasErrors = true
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      hasErrors = true
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // Proceed with login
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3001/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      sessionStorage.setItem("token", data.token)
      router.push("/AdminDashboard")
    } catch (error) {
      console.error("Error:", error)
      setErrors({
        ...errors,
        general: error.message || "Login failed. Please check your credentials.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <nav className="bg-white/5 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CGPA Calculator</span>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-76px)] px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl">
            {/* Card Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-600/20 mb-4">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-slate-400 mt-2">Access the administrator dashboard</p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-center gap-2 text-red-300">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{errors.general}</p>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`bg-slate-700 border ${errors.username ? "border-red-500" : "border-slate-600"} text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3`}
                    placeholder="admin@example.com"
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`bg-slate-700 border ${errors.password ? "border-red-500" : "border-slate-600"} text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 bg-slate-700 border-slate-600 rounded focus:ring-blue-600 focus:ring-2"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-slate-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 text-white font-medium rounded-lg text-sm px-5 py-3 transition-all duration-200 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Sign in</span>
                  </>
                )}
              </button>

              <div className="text-center mt-4">
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Return to home page
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} CGPA Calculator for JNTUH Students</p>
          </div>
        </div>
      </div>
    </main>
  )
}

