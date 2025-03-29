"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, FileText, Users, BookOpen, LogOut, PlusCircle, Trash2, X, AlertCircle, CheckCircle } from "lucide-react"

export default function AddRegulation() {
  const [regulationName, setRegulationName] = useState('')
  const [regulationDescription, setRegulationDescription] = useState('')
  const [branches, setBranches] = useState([
    {
      'branch_name': 'CSE',
      'semesters': [
        { semester: 1, subjects: [{ subjectName: '', credits: 0 }] }
      ]
    }
  ])
  const [errorMessage, setErrorMessage] = useState('')
  const [successToast, setSuccessToast] = useState(false)
     
  const handleBranchChange = (index, field, value) => {
    const updatedBranches = [...branches]
    updatedBranches[index]["branch_name"] = value
    setBranches(updatedBranches)
  }

  const handleSubjectChange = (semesterIndex, subjectIndex, branchIndex, field, value) => {
    const updatedBranches = [...branches]
    const updatedSemesters = [...updatedBranches[branchIndex].semesters]
    updatedSemesters[semesterIndex].subjects[subjectIndex][field] = value
    updatedBranches[branchIndex].semesters = updatedSemesters
    setBranches(updatedBranches)
  }

  const addBranch = () => {
    const newBranch = {
      'branch_name': '',
      'semesters': [
        { semester: 1, subjects: [{ subjectName: '', credits: 0 }] }
      ]
    }
    const updatedBranches = [...branches, newBranch]
    setBranches(updatedBranches)
  }

  const removeBranch = (branchIndex) => {
    // Don't allow removing the last branch
    if (branches.length <= 1) {
      setErrorMessage("Cannot remove the last branch")
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    
    const updatedBranches = branches.filter((_, index) => index !== branchIndex)
    setBranches(updatedBranches)
  }

  const addSemester = (branchIndex) => {
    const updatedBranches = [...branches]
    updatedBranches[branchIndex].semesters.push({
      semester: updatedBranches[branchIndex].semesters.length + 1, 
      subjects: [{ subjectName: '', credits: 0 }]
    })
    setBranches(updatedBranches)
  }

  const removeSemester = (branchIndex, semesterIndex) => {
    // Don't allow removing the last semester
    if (branches[branchIndex].semesters.length <= 1) {
      setErrorMessage("Cannot remove the last semester")
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    
    const updatedBranches = [...branches]
    updatedBranches[branchIndex].semesters = updatedBranches[branchIndex].semesters.filter((_, index) => 
      index !== semesterIndex
    )
    
    // Renumber the remaining semesters
    updatedBranches[branchIndex].semesters = updatedBranches[branchIndex].semesters.map((sem, idx) => ({
      ...sem,
      semester: idx + 1
    }))
    
    setBranches(updatedBranches)
  }

  const addSubject = (semesterIndex, branchIndex) => {
    const updatedBranches = [...branches]
    const updatedSemesters = [...updatedBranches[branchIndex].semesters]
    updatedSemesters[semesterIndex].subjects.push({ subjectName: '', credits: 0 })
    updatedBranches[branchIndex].semesters = updatedSemesters
    setBranches(updatedBranches)
  }

  const removeSubject = (branchIndex, semesterIndex, subjectIndex) => {
    // Don't allow removing the last subject
    if (branches[branchIndex].semesters[semesterIndex].subjects.length <= 1) {
      setErrorMessage("Cannot remove the last subject")
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    
    const updatedBranches = [...branches]
    updatedBranches[branchIndex].semesters[semesterIndex].subjects = 
      updatedBranches[branchIndex].semesters[semesterIndex].subjects.filter((_, index) => 
        index !== subjectIndex
      )
    setBranches(updatedBranches)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      "name": regulationName,
      "description": regulationDescription,
      "branches": branches
    }
    const token = sessionStorage.getItem('token')
    
    try {
      const res = await fetch('http://localhost:3001/Regulations', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (res.ok) {
        // Show success toast instead of alert
        setSuccessToast(true)
        // Redirect after a short delay to allow toast to be seen
        setTimeout(() => {
          window.location.href = "/AdminDashboard"
        }, 2000)
      } else {
        setErrorMessage("Error creating regulation: " + (data.message || "Unknown error"))
        setTimeout(() => setErrorMessage(''), 5000)
      }
    } catch (error) {
      console.error("Error submitting regulation:", error)
      setErrorMessage("Failed to create regulation. Please try again.")
      setTimeout(() => setErrorMessage(''), 5000)
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
        {/* Error Message */}
        {errorMessage && (
          <div className="max-w-7xl mx-auto mb-4">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-red-100">{errorMessage}</div>
              <button 
                className="ml-auto text-red-400 hover:text-red-300" 
                onClick={() => setErrorMessage('')}
              >
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
              <div className="text-green-100 font-medium">Regulation created successfully!</div>
              <button 
                className="ml-4 text-green-400 hover:text-green-300" 
                onClick={() => setSuccessToast(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/AdminDashboard" className="text-blue-400 hover:text-blue-300">
                Dashboard
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-slate-300">Add Regulation</span>
            </div>
            <div className="inline-block p-1 px-3 mt-4 mb-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium">
              New Regulation
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Create New <span className="text-blue-500">Regulation</span>
            </h1>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Regulation Name
                  </label>
                  <input
                    type="text"
                    value={regulationName}
                    onChange={(e) => setRegulationName(e.target.value)}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter regulation name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Regulation Description
                  </label>
                  <input
                    type="text"
                    value={regulationDescription}
                    onChange={(e) => setRegulationDescription(e.target.value)}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter regulation description"
                  />
                </div>
              </div>

              {branches.map((branch, branchIndex) => (
                <div key={branchIndex} className="mb-8 border border-slate-700 rounded-lg p-4 bg-slate-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Branch {branchIndex + 1}</h3>
                    <button 
                      type="button" 
                      onClick={() => removeBranch(branchIndex)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
                      title="Remove Branch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor={`branch-name-${branchIndex}`} className="block text-sm font-medium text-slate-300 mb-2">
                      Branch Name
                    </label>
                    <input 
                      className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      type="text" 
                      id={`branch-name-${branchIndex}`} 
                      value={branch.branch_name} 
                      onChange={(e) => handleBranchChange(branchIndex, 'branch_name', e.target.value)} 
                      placeholder="Enter branch name"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-blue-400 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Semesters
                    </h3>
                    
                    {branch.semesters.map((semester, semesterIndex) => (
                      <div key={semesterIndex} className="mb-6 border border-slate-700 rounded-lg p-4 bg-slate-700/20">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-md font-medium text-white">
                            Semester {semester.semester}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <button 
                              type="button" 
                              onClick={() => addSubject(semesterIndex, branchIndex)}
                              className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                              title="Add Subject"
                            >
                              <PlusCircle className="w-4 h-4 mr-1" />
                              Add Subject
                            </button>
                            <button 
                              type="button" 
                              onClick={() => removeSemester(branchIndex, semesterIndex)}
                              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
                              title="Remove Semester"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {semester.subjects.map((subject, subjectIndex) => (
                          <div key={subjectIndex} className="mb-3 flex flex-col sm:flex-row items-center gap-3">
                            <div className="flex-grow w-full">
                              <input
                                type="text"
                                placeholder="Subject Name"
                                value={subject.subjectName}
                                onChange={(e) => handleSubjectChange(semesterIndex, subjectIndex, branchIndex, 'subjectName', e.target.value)}
                                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required
                              />
                            </div>
                            <div className="w-full sm:w-1/4">
                              <input
                                type="number"
                                placeholder="Credits"
                                value={subject.credits}
                                onChange={(e) => handleSubjectChange(semesterIndex, subjectIndex, branchIndex, 'credits', parseInt(e.target.value) || 0)}
                                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required
                                min="0"
                              />
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeSubject(branchIndex, semesterIndex, subjectIndex)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors flex-shrink-0"
                              title="Remove Subject"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      onClick={() => addSemester(branchIndex)}
                      className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all text-sm font-medium flex items-center"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Semester
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between mt-6">
                <button 
                  type="button" 
                  onClick={addBranch}
                  className="px-5 py-2.5 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all text-sm font-medium flex items-center"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Branch
                </button>
                
                <div className="flex space-x-4">
                  <Link 
                    href="/AdminDashboard" 
                    className="px-5 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-all text-sm font-medium"
                  >
                    Cancel
                  </Link>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium"
                  >
                    Create Regulation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}