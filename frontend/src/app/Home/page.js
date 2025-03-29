"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown, Calculator, BookOpen, GraduationCap } from "lucide-react"

export default function Home() {
  const [regulations, setRegulations] = useState([])
  const [branches, setBranches] = useState([])
  const [selectedRegulation, setSelectedRegulation] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [maxSemesters, setMaxSemesters] = useState(0)
  const [lenSems, setLenSems] = useState(0)
  const [sub, setSub] = useState(false)
  const [sc, setsc] = useState(false)
  const [Res, setRes] = useState(-1)
  const [inputFields, setInputFields] = useState([])
  const [subjects, setSubjects] = useState([])
  const [subjectCredits, setSubjectCredits] = useState({})
  const [subjectGrades, setSubjectGrades] = useState({})

  // Function to handle regulation change
  const handleRegulationChange = (e) => {
    const regId = e.target.value
    setSelectedRegulation(regId)

    // Find the selected regulation to get its branches
    const selectedReg = regulations.find((reg) => reg._id === regId)
    if (selectedReg && selectedReg.branches) {
      setBranches(selectedReg.branches)
    } else {
      setBranches([])
    }

    // Reset other selections
    setSelectedBranch("")
    setSelectedSemester("")
    setMaxSemesters(0)
    setSub(false)
    setsc(false)
  }

  // Function to handle branch change
  const handleBranchChange = (e) => {
    const branchIndex = e.target.value
    setSelectedBranch(branchIndex)

    // Update max number of semesters for the selected branch
    if (selectedRegulation && branchIndex !== "") {
      const selectedReg = regulations.find((reg) => reg._id === selectedRegulation)
      if (selectedReg && selectedReg.branches && selectedReg.branches[branchIndex]) {
        const branch = selectedReg.branches[branchIndex]
        // Get max semester number from branch data
        if (branch.semesters && branch.semesters.length > 0) {
          const maxSem = Math.max(...branch.semesters.map((sem) => sem.semester))
          setMaxSemesters(maxSem)
        }
      }
    }
  }

  // Function to map grade points to values
  const getGradePoint = (grade) => {
    const gradeMap = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      C: 5,
      P: 4,
      F: 0,
    }
    return gradeMap[grade] || Number.parseInt(grade)
  }

  function getFields() {
    const calBy = document.getElementById("Calby").value
    const sem = document.getElementById("YS").value
    const branchIndex = document.getElementById("Branch").value

    setSelectedSemester(sem)

    if (calBy === "1") {
      // Calculation by subjects
      setSub(true)
      setsc(false)

      // Find the selected regulation and branch
      const selectedReg = regulations.find((reg) => reg._id === selectedRegulation)
      if (selectedReg && selectedReg.branches && selectedReg.branches[branchIndex]) {
        const branch = selectedReg.branches[branchIndex]

        // Get all subjects up to and including the selected semester
        const allSubjects = []
        const credits = {}
        const grades = {}

        // Convert sem to number for comparison
        const selectedSemNum = Number.parseInt(sem, 10)

        // Loop through each semester up to the selected one
        branch.semesters.forEach((semester) => {
          if (semester.semester <= selectedSemNum) {
            // Add semester label before each semester's subjects
            const semesterLabel = {
              _id: `semester-${semester.semester}`,
              subjectName: `--- Semester ${semester.semester} ---`,
              isLabel: true,
            }
            allSubjects.push(semesterLabel)

            // Add subjects from this semester
            semester.subjects.forEach((subject) => {
              allSubjects.push(subject)
              credits[subject._id] = subject.credits
              grades[subject._id] = ""
            })
          }
        })

        setSubjects(allSubjects)
        setSubjectCredits(credits)
        setSubjectGrades(grades)
      } else {
        setSubjects([])
        setSubjectCredits({})
        setSubjectGrades({})
      }
    } else if (calBy === "2") {
      // Calculation by SGPA
      const numSems = Number.parseInt(sem, 10)
      setLenSems(numSems)
      setSub(false)
      setsc(true)

      const newInputFields = Array.from({ length: numSems }, (_, index) => ({
        id: index,
        value: "",
      }))
      setInputFields(newInputFields)
    }
  }

  const handleGradeChange = (subjectId, value) => {
    setSubjectGrades((prev) => ({
      ...prev,
      [subjectId]: value,
    }))
  }

  const handleInputChange = (index, value) => {
    const newInputFields = [...inputFields]
    newInputFields[index].value = value ? Number.parseFloat(value) : ""
    setInputFields(newInputFields)
  }

  function CalByCGPA() {
    let sum = 0
    let validCount = 0

    for (let i = 0; i < inputFields.length; i++) {
      if (inputFields[i].value) {
        sum += inputFields[i].value
        validCount++
      }
    }

    if (validCount > 0) {
      setRes(sum / validCount)
    } else {
      setRes(0)
    }
  }

  function calculateSubjectBasedCGPA() {
    let totalCredits = 0
    let totalGradePoints = 0

    // Calculate the sum of (grade points × credits) for all subjects
    Object.keys(subjectGrades).forEach((subjectId) => {
      const grade = subjectGrades[subjectId]
      if (grade) {
        const credits = subjectCredits[subjectId]
        const gradePoint = getGradePoint(grade)

        totalGradePoints += gradePoint * credits
        totalCredits += credits
      }
    })

    // Calculate CGPA
    if (totalCredits > 0) {
      setRes(totalGradePoints / totalCredits)
      increment_cals()
    } else {
      setRes(0)
    }
  }
  async function increment_cals() {
    const response = await fetch("http://localhost:3001/increment-calculations", {
      method: "POST",
    })
    const data = await response.json()
    console.log(data)
    if (data.msg=="success") {
      console.log("Incremented successfully")
    }
    else{
      console.log("Increment failed")
    }
  }
  useEffect(() => {
    const newInputFields = Array.from({ length: lenSems }, (_, index) => ({
      id: index,
      value: "",
    }))
    setInputFields(newInputFields)
  }, [lenSems])

  useEffect(() => {
    async function fetchReg() {
      try {
        const token = sessionStorage.getItem("token")
        const response = await fetch("http://localhost:3001/Regulations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        if (Array.isArray(data)) {
          setRegulations(data)
          if (data.length > 0) {
            setSelectedRegulation(data[0]._id)
            if (data[0].branches && data[0].branches.length > 0) {
              setBranches(data[0].branches)
            }
          }
        } else {
          console.error("Fetched data is not an array:", data)
        }
      } catch (error) {
        console.error("Error fetching regulations:", error)
      }
    }

    fetchReg()
  }, [])

  // Generate semester options based on maxSemesters
  const generateSemesterOptions = () => {
    const options = []
    options.push(
      <option key="default" value="">
        Select Semester
      </option>,
    )

    for (let i = 1; i <= maxSemesters; i++) {
      options.push(
        <option key={i} value={i.toString()}>
          {i}
        </option>,
      )
    }

    return options
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-block p-1 px-3 mb-2 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium">
              JNTUH Students
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Calculate Your <span className="text-blue-500">CGPA</span> With Precision
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Enter your academic details below to calculate your Cumulative Grade Point Average
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
            {Res >= 0 && (
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-center shadow-lg animate-fade-in">
                <h2 className="text-white text-2xl font-bold">Your CGPA: {Res.toFixed(2)}</h2>
                <p className="text-blue-100 mt-2">Based on your submitted information</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Select Regulation */}
              <div>
                <label htmlFor="Reg" className="block mb-2 text-sm font-medium text-white">
                  Regulation
                </label>
                <div className="relative">
                  <select
                    id="Reg"
                    value={selectedRegulation}
                    onChange={handleRegulationChange}
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 appearance-none"
                  >
                    <option value="">Select Regulation</option>
                    {regulations &&
                      regulations.map((reg) => (
                        <option key={reg._id} value={reg._id}>
                          {reg.name}
                        </option>
                      ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* Select Branch */}
              <div>
                <label htmlFor="Branch" className="block mb-2 text-sm font-medium text-white">
                  Branch
                </label>
                <div className="relative">
                  <select
                    id="Branch"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 appearance-none"
                  >
                    <option value="">Select Branch</option>
                    {branches &&
                      branches.map((branch, index) => (
                        <option key={index} value={index}>
                          {branch.branch_name || "Unknown Branch"}
                        </option>
                      ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* Calculate by */}
              <div>
                <label htmlFor="Calby" className="block mb-2 text-sm font-medium text-white">
                  Calculation Method
                </label>
                <div className="relative">
                  <select
                    id="Calby"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 appearance-none"
                  >
                    <option value="">Select Method</option>
                    <option value="1">Using Subjects</option>
                    <option value="2">Using SGPA</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* Select year and sem */}
              <div>
                <label htmlFor="YS" className="block mb-2 text-sm font-medium text-white">
                  Semester
                </label>
                <div className="relative">
                  <select
                    id="YS"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 appearance-none"
                  >
                    {generateSemesterOptions()}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  getFields()
                }}
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30"
              >
                <Calculator size={18} />
                Get Fields
              </button>
            </div>

            {/* Subject based calculation */}
            {sub && (
              <div className="subjects bg-slate-700/30 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-600">
                  <BookOpen className="text-blue-400" />
                  <h3 className="text-white text-lg font-medium">Subject-Based Calculation</h3>
                </div>

                {subjects.map((subject) => (
                  <div key={subject._id || subject.subjectName} className="mb-4">
                    {subject.isLabel ? (
                      <h4 className="text-blue-400 text-md font-medium mt-6 mb-3 border-b border-slate-600 pb-2">
                        {subject.subjectName}
                      </h4>
                    ) : (
                      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor={`subject-${subject._id}`} className="block text-sm font-medium text-white">
                            {subject.subjectName}
                          </label>
                          <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                            {subject.credits} credits
                          </span>
                        </div>
                        <div className="relative">
                          <select
                            id={`subject-${subject._id}`}
                            value={subjectGrades[subject._id] || ""}
                            onChange={(e) => handleGradeChange(subject._id, e.target.value)}
                            className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
                          >
                            <option value="">Select Grade</option>
                            <option value="O">O (10 points)</option>
                            <option value="A+">A+ (9 points)</option>
                            <option value="A">A (8 points)</option>
                            <option value="B+">B+ (7 points)</option>
                            <option value="B">B (6 points)</option>
                            <option value="C">C (5 points)</option>
                            <option value="P">P (4 points)</option>
                            <option value="F">F (0 points)</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
                            size={16}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      calculateSubjectBasedCGPA()
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30"
                  >
                    <Calculator size={18} />
                    Calculate CGPA
                  </button>
                </div>
              </div>
            )}

            {/* SGPA based calculation */}
            {sc && (
              <div className="CGPA bg-slate-700/30 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-600">
                  <GraduationCap className="text-blue-400" />
                  <h3 className="text-white text-lg font-medium">SGPA-Based Calculation</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {inputFields.map((field, index) => (
                    <div key={index} className="mb-4">
                      <label htmlFor={`field-${field.id}`} className="block mb-2 text-sm font-medium text-white">
                        Semester {index + 1}
                      </label>
                      <input
                        id={`field-${field.id}`}
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        step="0.01"
                        type="number"
                        aria-describedby="helper-text-explanation"
                        className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder="0.00"
                        min="0"
                        max="10"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      CalByCGPA()
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30"
                  >
                    <Calculator size={18} />
                    Calculate CGPA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

