// src/app/CreateRegulation/page.js
"use client"
import { useState } from 'react';

export default function CreateRegulation() {
  const [regulationName, setRegulationName] = useState('');
  const [branches, setBranches] = useState([{'branch_name':'CSE','semesters':[{ semester: 1, subjects: [{ subjectName: '', credits: 0 }] }]}]);
     
//   const handleBranchChange = (index,field,value)=>{
//      const updatedBranches =[...branches];
//      updatedBranches[index][field]=value;
//      setBranches(updatedBranches);
//   }
  const handleSemesterChange = (index, field, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index][field] = value;
    setSemesters(updatedSemesters);
  };

  const handleSubjectChange = (semesterIndex, subjectIndex, field, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].subjects[subjectIndex][field] = value;
    setSemesters(updatedSemesters);
  };

  const addBranch =() =>{
     const newBranch={'branch_name':'CSE','semesters':[{ semester: 1, subjects: [{ subjectName: '', credits: 0 }] }]}
     const updatedBranches=[...branches,newBranch];
     setBranches(updatedBranches);
  }
  const addSemester = (index) => {
     console.log(index)
     // branches[index].semesters.push({ semester: branches[index].semesters.length + 1, subjects: [{ subjectName: '', credits: 0 }]})
     const updatedBranches = [...branches];

    // Add a new semester to the selected branch
    updatedBranches[index].semesters.push({
        semester: updatedBranches[index].semesters.length + 1, 
        subjects: [{ subjectName: '', credits: 0 }]
    });

    // Update the state
    setBranches(updatedBranches);
};

  const addSubject = (semesterIndex,branchIndex) => {
     const updatedBranches = [...branches];
     const updatedSemesters = [...updatedBranches[branchIndex].semesters];
     updatedSemesters[semesterIndex].subjects.push({ subjectName: '', credits: 0 });
     updatedBranches[branchIndex].semesters = updatedSemesters;
     setBranches(updatedBranches);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(regulationName,semesters);
    const body={
     "name":regulationName,
     "description":"",
     "semesters":semesters
    }
    const token = sessionStorage.getItem('token');
    console.log(body);
    const res = await fetch('http://localhost:3001/Regulations', {
      "method": 'POST',
      "headers":{
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
     },
      "body": JSON.stringify(body),
    })
    .then(res => res.json())
    .then(data => {
     console.log(data);
    })
  };

  return (
     <main>
          <nav class="bg-white border-gray-200 dark:bg-gray-900">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                         <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                         <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CGPA Calculator</span>
                    </a>
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                         <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                         <span class="sr-only">Open user menu</span>
                         {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"> */}
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-8">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                         </svg>
                         
                         </button>
                         <div className="text-white px-2">|</div>
                         <a className="text-white" href="/Login">Log out</a>
                         <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                         <span class="sr-only">Open main menu</span>
                         <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                         </svg>
                    </button>
                    </div>
                    
                    </div>
               </nav>
          <div className="container mx-auto  min-h-screen min-w-screen bg-slate-800 p-5">
               <h1 className="text-2xl font-bold mb-4 text-white">Create New Regulation</h1>
               <form onSubmit={handleSubmit}>
               <div className="mb-4">
                    <label className="block mb-2  text-white">Regulation Name</label>
                    <input
                    type="text"
                    value={regulationName}
                    onChange={(e) => setRegulationName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    />
               </div>

               
               {
                    
                    branches.map((branch, branchIndex) => (
                         <div key={branchIndex} className='mb-4'>
                              <div>
                                   <label htmlFor={`branch-name-${branchIndex}`} className=' text-white '>Branch Name</label>
                                   <br></br>
                                   <input 
                                   className="p-2 border  border-gray-300 rounded-md mx-2"
                                        type='text' 
                                        id={`branch-name-${branchIndex}`} 
                                        value={branch.branch_name} 
                                        onChange={(e) => handleBranchNameChange(e, branchIndex)} 
                                   />
                              </div>
                              <div className='m-4'>
                                   <h2 className='text-white text-xl'>Semesters</h2>
                                   {
                                        branch.semesters.map((semester,semesterIndex)=>(
                                             <div key={semesterIndex} className="mb-4 m-4">
                                                  <h2 className="mb-2 text-white">Semester {semester.semester}</h2>
                                                  {semester.subjects.map((subject, subjectIndex) => (
                                                       <div key={subjectIndex} className="mb-2 px-3">
                                                            <input
                                                                 type="text"
                                                                 placeholder="Subject Name"
                                                                 value={subject.name}
                                                                 onChange={(e) => handleSubjectChange(semesterIndex, subjectIndex, 'subjectName', e.target.value)}
                                                                 className="p-2 border border-gray-300 rounded-md mr-2"
                                                            />
                                                            <input
                                                                 type="number"
                                                                 placeholder="Credits"
                                                                 value={subject.credits}
                                                                 onChange={(e) => handleSubjectChange(semesterIndex, subjectIndex, 'credits', e.target.value)}
                                                                 className="p-2 border border-gray-300 rounded-md"
                                                            />
                                                       </div>
                                                  ))}
                                                  <button type="button" onClick={() => addSubject(branchIndex,semesterIndex)} className="text-blue-500 px-4">
                                                  Add Subject
                                                  </button>
                                             </div>
                                        ))
                                        
                                   }
                                   <button type="button" onClick={()=>{addSemester(branchIndex)}} className="text-blue-500 mb-4 ">
                                        Add Semester
                                   </button> 
                              </div>
                              <button type="button" onClick={()=>{addBranch()}} className="text-blue-500 mb-4 ">
                                   Add Branch
                              </button>
                         </div>
                     ))

               }
               <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
                    Submit
               </button>
               </form>
          </div>
     </main>
  );
}
