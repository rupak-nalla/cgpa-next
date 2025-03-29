"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router";
import {
  Menu,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  LogOut,
  X,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const slideUpAnimation = `
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}
`

export default function AdminDashboard() {
  const [regulations, setRegulations] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const [recentActivity, setRecentActivity] = useState([])
  const [stats, setStats] = useState({
    totalCalculations: 0,
    totalRegulations: 0,
    totalBranches: 0,
    totalSubjects: 0,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successToast, setSuccessToast] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ visible: false, regulationId: null })
  const [cals,setCals] = useState(0)
  useEffect(() => {
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("token")
        // Fetch regulations
        const regResponse = await fetch("http://localhost:3001/Regulations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const regData = await regResponse.json()
        const calsResponse = await fetch("http://localhost:3001/get-calculations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const calsData = await calsResponse.json()
        setCals(calsData?.cals)
        console.log(calsData?.cals)
        if (Array.isArray(regData)) {
          // Sort regulations by updatedAt in reverse chronological order
          const sortedRegulations = [...regData].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          setRegulations(sortedRegulations)

          // Calculate statistics
          let branchCount = 0
          let subjectCount = 0
          console.log(sortedRegulations)
          sortedRegulations.forEach((regulation) => {
            if (regulation.branches && Array.isArray(regulation.branches)) {
              branchCount += regulation.branches.length

              regulation.branches.forEach((branch) => {
                if (branch.semesters && Array.isArray(branch.semesters)) {
                  branch.semesters.forEach((semester) => {
                    if (semester.subjects && Array.isArray(semester.subjects)) {
                      subjectCount += semester.subjects.length
                    }
                  })
                }
              })
            }
          })

          // Set statistics
          setStats({
            totalCalculations:  calsData.cals, // Example value
            totalRegulations: regData.length,
            totalBranches: branchCount,
            totalSubjects: subjectCount,
          })

          // Generate recent activity based on regulations data
          generateRecentActivity(regData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setErrorMessage("Failed to fetch data. Please try again.")
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => {
        setSuccessToast(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [successToast])

  // Generate recent activity based on regulations data
  const generateRecentActivity = (regData) => {
    if (!Array.isArray(regData) || regData.length === 0) return

    // Sort regulations by updatedAt date (newest first)
    const sortedRegulations = [...regData].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    const activities = []

    // Get the 3 most recent regulations for activity feed
    sortedRegulations.slice(0, 3).forEach((regulation) => {
      const createdDate = new Date(regulation.createdAt)
      const updatedDate = new Date(regulation.updatedAt)

      // Check if regulation was updated after creation
      if (updatedDate.getTime() !== createdDate.getTime()) {
        activities.push({
          type: "updated",
          name: regulation.name,
          timestamp: updatedDate,
          color: "blue",
        })
      } else {
        activities.push({
          type: "created",
          name: regulation.name,
          timestamp: createdDate,
          color: "green",
        })
      }

      // Add branch activity if it has branches
      if (regulation.branches && regulation.branches.length > 0) {
        const branch = regulation.branches[0]
        activities.push({
          type: "branch",
          name: `${branch.branch_name} in ${regulation.name}`,
          timestamp: updatedDate,
          color: "yellow",
        })
      }
    })

    // Sort by date and take only the most recent 3
    const recentActs = activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3)
      .map((activity) => {
        // Calculate relative time
        const relativeTime = getRelativeTimeString(activity.timestamp)

        return {
          ...activity,
          relativeTime,
        }
      })

    setRecentActivity(recentActs)
  }

  // Helper function to get relative time string
  const getRelativeTimeString = (date) => {
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return diffMins <= 1 ? "just now" : `${diffMins} minutes ago`
    } else if (diffHours < 24) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`
    } else {
      return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`
    }
  }

  // Show toast notification

  // Open confirmation modal
  const openConfirmModal = (regId) => {
    setConfirmModal({ visible: true, regulationId: regId })
  }

  // Close confirmation modal
  const closeConfirmModal = () => {
    setConfirmModal({ visible: false, regulationId: null })
  }

  // Delete regulation after confirmation
  async function removeRegulation() {
    const regId = confirmModal.regulationId
    
    if (!regId) return
    closeConfirmModal()
    try {
      const token = sessionStorage.getItem("token")
      const response = await fetch(`http://localhost:3001/regulations`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: regId,
        }),
      })
      const data = await response.json()

      if (Array.isArray(data)) {
        // Sort regulations by updatedAt in reverse chronological order
        const sortedData = [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        setRegulations(sortedData)
        setStats((prev) => ({
          ...prev,
          totalRegulations: data.length,
        }))
        // Update recent activity after deletion
        generateRecentActivity(data)
        // Show success toast
        setSuccessToast(true)
        // router.reload()
      } else {
        // If the response is not an array, still show success toast
        // and update the regulations by filtering out the deleted one
        setRegulations((prev) => {
          const updated = prev.filter((reg) => reg._id !== regId)
          return updated
        })
        setStats((prev) => ({
          ...prev,
          totalRegulations: prev.totalRegulations - 1,
        }))
        setSuccessToast(true)
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting regulation:", error)
      setErrorMessage("Failed to delete regulation. Please try again.")
    }
  }

  // Function to view regulation details
  const viewRegulationDetails = (regulationId) => {
    // Find the regulation
    const regulation = regulations.find((reg) => reg._id === regulationId)
    if (regulation) {
      const branchesCount = regulation.branches?.length || 0
      let semestersCount = 0
      let subjectsCount = 0

      regulation.branches?.forEach((branch) => {
        if (branch.semesters && Array.isArray(branch.semesters)) {
          semestersCount += branch.semesters.length

          branch.semesters.forEach((semester) => {
            if (semester.subjects && Array.isArray(semester.subjects)) {
              subjectsCount += semester.subjects.length
            }
          })
        }
      })

      alert(`
        Regulation: ${regulation.name}
        Description: ${regulation.description || "No description"}
        Branches: ${branchesCount}
        Semesters: ${semestersCount}
        Subjects: ${subjectsCount}
      `)
    }
  }

  // Map activity type to icon and text
  const getActivityDetails = (activity) => {
    switch (activity.type) {
      case "created":
        return {
          color: "bg-green-500",
          text: `New regulation ${activity.name} added`,
        }
      case "updated":
        return {
          color: "bg-blue-500",
          text: `Regulation ${activity.name} updated`,
        }
      case "branch":
        return {
          color: "bg-yellow-500",
          text: `Branch ${activity.name} modified`,
        }
      default:
        return {
          color: "bg-slate-500",
          text: `Activity related to ${activity.name}`,
        }
    }
  }

  return (
    <>
      <style jsx global>
        {slideUpAnimation}
      </style>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Error Message */}
        {errorMessage && (
          <div className="max-w-7xl mx-auto mb-4">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-red-100">{errorMessage}</div>
              <button className="ml-auto text-red-400 hover:text-red-300" onClick={() => setErrorMessage("")}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-4 right-4 z-50 max-w-md bg-green-900/90 border border-green-500 rounded-lg p-4 shadow-lg backdrop-blur-sm animate-slide-up">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              <div className="text-green-100 font-medium">Regulation deleted successfully!</div>
              <button className="ml-4 text-green-400 hover:text-green-300" onClick={() => setSuccessToast(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmModal.visible && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete this regulation? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeConfirmModal}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={removeRegulation}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="bg-white/5 backdrop-blur-lg border-b border-slate-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CGPA Calculator</span>
            </Link>

            <div className="flex items-center md:order-2 space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <span className="hidden md:inline-block text-white">Admin</span>
              </div>

              <div className="text-slate-400">|</div>

              <Link href="/Login" className="flex items-center text-white hover:text-blue-400 transition-colors">
                <LogOut className="w-5 h-5 mr-1" />
                <span className="hidden md:inline-block">Log out</span>
              </Link>
            </div>

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

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="inline-block p-1 px-3 mb-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium">
                Admin Dashboard
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Manage Your <span className="text-blue-500">CGPA Calculator</span> System
              </h1>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-900/30 mr-4">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total calculations</p>
                    <h3 className="text-white text-2xl font-bold">{stats.totalCalculations}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-900/30 mr-4">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Regulations</p>
                    <h3 className="text-white text-2xl font-bold">{stats.totalRegulations}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-900/30 mr-4">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Branches</p>
                    <h3 className="text-white text-2xl font-bold">{stats.totalBranches}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-900/30 mr-4">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Subjects</p>
                    <h3 className="text-white text-2xl font-bold">{stats.totalSubjects}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto space-x-4 mb-6 pb-2 border-b border-slate-700">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === "overview"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("regulations")}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === "regulations"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                Regulations
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
              {activeTab === "overview" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">System Overview</h2>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700 mb-4">
                    <p className="text-slate-300">
                      Welcome to the Admin Dashboard. Here you can manage regulations, branches, and subjects for the
                      CGPA Calculator system.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700">
                      <h3 className="text-lg font-medium text-white mb-3">Recent Activity</h3>
                      <div className="space-y-3">
                        {recentActivity.length === 0 ? (
                          <p className="text-slate-400 text-sm">No recent activity found</p>
                        ) : (
                          recentActivity.map((activity, index) => {
                            const details = getActivityDetails(activity)
                            return (
                              <div key={index} className="flex items-center p-2 border-b border-slate-600">
                                <div className={`w-2 h-2 ${details.color} rounded-full mr-2`}></div>
                                <p className="text-sm text-slate-300">{details.text}</p>
                                <span className="ml-auto text-xs text-slate-400">{activity.relativeTime}</span>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700">
                      <h3 className="text-lg font-medium text-white mb-3">Quick Links</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/AddRegulation"
                          className="flex items-center p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <FileText className="w-5 h-5 text-blue-400 mr-2" />
                          <span className="text-sm text-white">Add Regulation</span>
                        </Link>
                        <button
                          onClick={() => setActiveTab("regulations")}
                          className="flex items-center p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
                          <span className="text-sm text-white">View Regulations</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "regulations" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Regulations</h2>
                    <Link
                      href="/AddRegulation"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                    >
                      Add Regulation
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {regulations.length === 0 && (
                      <div className="p-8 text-center bg-slate-700/30 rounded-lg border border-slate-700">
                        <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-white mb-1">No Regulations Found</h3>
                        <p className="text-slate-400 mb-4">Get started by adding a new regulation</p>
                        <Link
                          href="/AddRegulation"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                        >
                          Add Your First Regulation
                        </Link>
                      </div>
                    )}

                    {regulations.map((regulation) => (
                      <div
                        key={regulation._id}
                        className="bg-slate-700/30 rounded-lg border border-slate-700 overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                          <div className="mb-3 sm:mb-0">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-blue-400 mr-2" />
                              <h3 className="text-lg font-medium text-white">{regulation.name}</h3>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {regulation.branches &&
                                regulation.branches.map((branch, index) => (
                                  <span
                                    key={index}
                                    className="inline-block px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded"
                                  >
                                    {branch.branch_name || "Unknown Branch"}
                                  </span>
                                ))}
                            </div>
                            {regulation.description && (
                              <p className="text-sm text-slate-400 mt-2">{regulation.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewRegulationDetails(regulation._id)}
                              className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium rounded transition-colors"
                            >
                              View
                            </button>
                            <Link
                              href={`/EditRegulation/${regulation._id}`}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => openConfirmModal(regulation._id)}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

