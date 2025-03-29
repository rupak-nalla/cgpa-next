import Link from "next/link"
import { Menu } from "lucide-react"

export default function Home() {
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

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 md:mt-0">
              <li>
                <Link
                  href="/Login"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-76px)]">
          <div className="max-w-3xl text-center">
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium">
              JNTUH Students
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Calculate Your <span className="text-blue-500">CGPA</span> With Precision
            </h1>
            <p className="mb-8 text-lg font-normal text-slate-400 lg:text-xl max-w-2xl mx-auto">
              A professional tool specially designed for JNTUH Students to track and calculate their academic
              performance efficiently.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/Home"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 transition-all duration-300 shadow-lg shadow-blue-900/30"
              >
                Get Started
                <svg
                  className="w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>

              <Link
                href="/Login"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-blue-400 border border-blue-500 rounded-lg hover:bg-blue-900/30 focus:ring-4 focus:ring-blue-800 transition-all duration-300"
              >
                Admin Login
              </Link>
            </div>

            <div className="mt-12 flex justify-center">
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

