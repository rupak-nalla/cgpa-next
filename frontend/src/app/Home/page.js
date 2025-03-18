"use client"
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";

export default function Home() {
     const [regulations, setRegulations] = useState([]);
     const [branches, setBranches] = useState([]);
     const [selectedRegulation, setSelectedRegulation] = useState("");
     const [selectedBranch, setSelectedBranch] = useState("");
     const [selectedSemester, setSelectedSemester] = useState("");
     const [maxSemesters, setMaxSemesters] = useState(0);
     const [lenSems, setLenSems] = useState(0);
     const [sub, setSub] = useState(false);
     const [sc, setsc] = useState(false);
     const [Res, setRes] = useState(-1);
     const [inputFields, setInputFields] = useState([]);
     const [subjects, setSubjects] = useState([]);
     const [subjectCredits, setSubjectCredits] = useState({});
     const [subjectGrades, setSubjectGrades] = useState({});
     
     // Function to handle regulation change
     const handleRegulationChange = (e) => {
          const regId = e.target.value;
          setSelectedRegulation(regId);
          
          // Find the selected regulation to get its branches
          const selectedReg = regulations.find(reg => reg._id === regId);
          if (selectedReg && selectedReg.branches) {
               setBranches(selectedReg.branches);
          } else {
               setBranches([]);
          }
          
          // Reset other selections
          setSelectedBranch("");
          setSelectedSemester("");
          setMaxSemesters(0);
          setSub(false);
          setsc(false);
     };
     
     // Function to handle branch change
     const handleBranchChange = (e) => {
          const branchIndex = e.target.value;
          setSelectedBranch(branchIndex);
          
          // Update max number of semesters for the selected branch
          if (selectedRegulation && branchIndex !== "") {
               const selectedReg = regulations.find(reg => reg._id === selectedRegulation);
               if (selectedReg && selectedReg.branches && selectedReg.branches[branchIndex]) {
                    const branch = selectedReg.branches[branchIndex];
                    // Get max semester number from branch data
                    if (branch.semesters && branch.semesters.length > 0) {
                         const maxSem = Math.max(...branch.semesters.map(sem => sem.semester));
                         setMaxSemesters(maxSem);
                    }
               }
          }
     };
     
     // Function to map grade points to values
     const getGradePoint = (grade) => {
          const gradeMap = {
               "O": 10,
               "A+": 9,
               "A": 8,
               "B+": 7,
               "B": 6,
               "C": 5,
               "P": 4,
               "F": 0
          };
          return gradeMap[grade] || parseInt(grade);
     };
     
     function getFields() {
          const calBy = document.getElementById('Calby').value;
          const sem = document.getElementById('YS').value;
          const branchIndex = document.getElementById('Branch').value;
          
          setSelectedSemester(sem);
          
          if (calBy === '1') {
               // Calculation by subjects
               setSub(true);
               setsc(false);
               
               // Find the selected regulation and branch
               const selectedReg = regulations.find(reg => reg._id === selectedRegulation);
               if (selectedReg && selectedReg.branches && selectedReg.branches[branchIndex]) {
                    const branch = selectedReg.branches[branchIndex];
                    
                    // Get all subjects up to and including the selected semester
                    const allSubjects = [];
                    const credits = {};
                    const grades = {};
                    
                    // Convert sem to number for comparison
                    const selectedSemNum = parseInt(sem, 10);
                    
                    // Loop through each semester up to the selected one
                    branch.semesters.forEach(semester => {
                         if (semester.semester <= selectedSemNum) {
                              // Add semester label before each semester's subjects
                              const semesterLabel = {
                                   _id: `semester-${semester.semester}`,
                                   subjectName: `--- Semester ${semester.semester} ---`,
                                   isLabel: true
                              };
                              allSubjects.push(semesterLabel);
                              
                              // Add subjects from this semester
                              semester.subjects.forEach(subject => {
                                   allSubjects.push(subject);
                                   credits[subject._id] = subject.credits;
                                   grades[subject._id] = "";
                              });
                         }
                    });
                    
                    setSubjects(allSubjects);
                    setSubjectCredits(credits);
                    setSubjectGrades(grades);
                    
               } else {
                    setSubjects([]);
                    setSubjectCredits({});
                    setSubjectGrades({});
               }
          } else if (calBy === '2') {
               // Calculation by SGPA
               const numSems = parseInt(sem, 10);
               setLenSems(numSems);
               setSub(false);
               setsc(true);
               
               const newInputFields = Array.from({ length: numSems }, (_, index) => ({
                    id: index,
                    value: '',
               }));
               setInputFields(newInputFields);
          }
     }
     
     const handleGradeChange = (subjectId, value) => {
          setSubjectGrades(prev => ({
               ...prev,
               [subjectId]: value
          }));
     };
     
     const handleInputChange = (index, value) => {
          const newInputFields = [...inputFields];
          newInputFields[index].value = value ? parseFloat(value) : '';
          setInputFields(newInputFields);
     };
     
     function CalByCGPA() {
          let sum = 0;
          let validCount = 0;
          
          for (let i = 0; i < inputFields.length; i++) {
               if (inputFields[i].value) {
                    sum += inputFields[i].value;
                    validCount++;
               }
          }
          
          if (validCount > 0) {
               setRes(sum / validCount);
          } else {
               setRes(0);
          }
     }
     
     function calculateSubjectBasedCGPA() {
          let totalCredits = 0;
          let totalGradePoints = 0;
          
          // Calculate the sum of (grade points × credits) for all subjects
          Object.keys(subjectGrades).forEach(subjectId => {
               const grade = subjectGrades[subjectId];
               if (grade) {
                    const credits = subjectCredits[subjectId];
                    const gradePoint = getGradePoint(grade);
                    
                    totalGradePoints += gradePoint * credits;
                    totalCredits += credits;
               }
          });
          
          // Calculate CGPA
          if (totalCredits > 0) {
               setRes(totalGradePoints / totalCredits);
          } else {
               setRes(0);
          }
     }
     
     useEffect(() => {
          const newInputFields = Array.from({ length: lenSems }, (_, index) => ({
               id: index,
               value: '',
          }));
          setInputFields(newInputFields);
     }, [lenSems]);
     
     useEffect(() => {
          async function fetchReg() {
               try {
                    const token = sessionStorage.getItem('token');
                    const response = await fetch('http://localhost:3001/Regulations', {
                         "method": "GET",
                         "headers": {
                              "Content-Type": "application/json",
                              'Authorization': `Bearer ${token}`
                         }
                    });
                    
                    const data = await response.json();
                    if (Array.isArray(data)) {
                         setRegulations(data);
                         if (data.length > 0) {
                              setSelectedRegulation(data[0]._id);
                              if (data[0].branches && data[0].branches.length > 0) {
                                   setBranches(data[0].branches);
                              }
                         }
                    } else {
                         console.error("Fetched data is not an array:", data);
                    }
               } catch (error) {
                    console.error("Error fetching regulations:", error);
               }
          }
          
          fetchReg();
     }, []);
     
     // Generate semester options based on maxSemesters
     const generateSemesterOptions = () => {
          const options = [];
          options.push(<option key="default" value="">Select Semester</option>);
          
          for (let i = 1; i <= maxSemesters; i++) {
               options.push(<option key={i} value={i.toString()}>{i}</option>);
          }
          
          return options;
     };
     
     return (
          <main>
               <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CGPA Calculator</span>
                         </a>
                         <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                              <span className="sr-only">Open main menu</span>
                              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                              </svg>
                         </button>
                         <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                   <li>
                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><a href="/Login">Login</a></button>
                                   </li>
                              </ul>
                         </div>
                    </div>
               </nav>
               <div id="main" className="min-h-screen min-w-screen bg-slate-800 flex justify-center">
                    <div className="m-4">
                         <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Calculate Your CGPA Below</h1>
                         <form className="max-w-sm mx-auto">
                              {/* select Regulation */}
                              <div className="">
                                   <label htmlFor="Reg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regulation</label>
                                   <select 
                                        id="Reg" 
                                        value={selectedRegulation}
                                        onChange={handleRegulationChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   >
                                        <option value="">Select Regulation</option>
                                        {regulations && regulations.map((reg) => (
                                             <option key={reg._id} value={reg._id}>
                                                  {reg.name}
                                             </option>
                                        ))}
                                   </select>
                              </div>
                              
                              {/* Select Branch */}
                              <div className="">
                                   <label htmlFor="Branch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Branch</label>
                                   <select 
                                        id="Branch" 
                                        value={selectedBranch}
                                        onChange={handleBranchChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   >
                                        <option value="">Select Branch</option>
                                        {branches && branches.map((branch, index) => (
                                             <option key={index} value={index}>
                                                  {branch.branch_name || "Unknown Branch"}
                                             </option>
                                        ))}
                                   </select>
                              </div>
                              
                              {/* Calculate by */}
                              <div className="">
                                   <label htmlFor="Calby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calculate by</label>
                                   <select id="Calby" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Calculate by</option>
                                        <option value="1">using Subjects</option>
                                        <option value="2">using SGPA</option>
                                   </select>
                              </div>
                              
                              {/* select year and sem - now dynamic based on regulation/branch */}
                              <div className="">
                                   <label htmlFor="YS" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Year and Sem</label>
                                   <select id="YS" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {generateSemesterOptions()}
                                   </select>
                              </div>
                              
                              <div className="flex justify-center">
                                   <button 
                                        onClick={(e) => {
                                             e.preventDefault();
                                             getFields();
                                        }} 
                                        type="button" 
                                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                   >
                                        Get fields
                                   </button>
                              </div>
                              
                              {/* Subject based calculation */}
                              {sub && (
                                   <div className="subjects">
                                        {Res >= 0 && (
                                             <div className="mb-4 p-3 bg-blue-900 rounded-lg">
                                                  <h2 className="text-white text-xl font-bold">Your CGPA: {Res.toFixed(2)}</h2>
                                             </div>
                                        )}
                                        
                                        <h3 className="text-center text-white mb-4">Enter Grades for All Subjects</h3>
                                        
                                        {subjects.map((subject) => (
                                             <div key={subject._id || subject.subjectName} className="mb-4">
                                                  {subject.isLabel ? (
                                                       <h4 className="text-white text-lg font-medium mt-4 mb-2 border-b border-gray-600 pb-1">
                                                            {subject.subjectName}
                                                       </h4>
                                                  ) : (
                                                       <>
                                                            <div className="flex justify-between items-center">
                                                                 <label htmlFor={`subject-${subject._id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                      {subject.subjectName} ({subject.credits} credits)
                                                                 </label>
                                                            </div>
                                                            <select 
                                                                 id={`subject-${subject._id}`} 
                                                                 value={subjectGrades[subject._id] || ""}
                                                                 onChange={(e) => handleGradeChange(subject._id, e.target.value)}
                                                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                       </>
                                                  )}
                                             </div>
                                        ))}
                                        
                                        <div className="flex justify-center m-4">
                                             <button 
                                                  type="button"
                                                  onClick={(e) => {
                                                       e.preventDefault();
                                                       calculateSubjectBasedCGPA();
                                                  }}
                                                  className="my-3 inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                                             >
                                                  Calculate CGPA
                                             </button>
                                        </div>
                                   </div>
                              )}
                              
                              {/* SGPA based calculation */}
                              {sc && (
                                   <div className="CGPA">
                                        {Res >= 0 && (
                                             <div className="mb-4 p-3 bg-blue-900 rounded-lg">
                                                  <h2 className="text-white text-xl font-bold">Your CGPA: {Res.toFixed(2)}</h2>
                                             </div>
                                        )}
                                        
                                        <h3 className="text-white text-center mb-4">Enter SGPAs for each semester</h3>
                                        
                                        {inputFields.map((field, index) => (
                                             <div key={index} className="mb-4">
                                                  <label htmlFor={`field-${field.id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester {index + 1}</label>
                                                  <input 
                                                       id={`field-${field.id}`}
                                                       value={field.value} 
                                                       onChange={(e) => handleInputChange(index, e.target.value)}
                                                       step="0.01"
                                                       type="number"
                                                       aria-describedby="helper-text-explanation"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       placeholder="0.00"
                                                       min="0"
                                                       max="10"
                                                       required
                                                  />
                                             </div>
                                        ))}
                                        
                                        <div className="flex justify-center">
                                             <button 
                                                  type="button"
                                                  onClick={(e) => {
                                                       e.preventDefault();
                                                       CalByCGPA();
                                                  }}
                                                  className="my-3 inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                                             >
                                                  Calculate CGPA
                                             </button>
                                        </div>
                                   </div>
                              )}
                         </form>
                    </div>
               </div>
          </main>
     );
}