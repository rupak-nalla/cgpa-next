// src/app/EditRegulation/[id].js
"use client"
import { useEffect, useState } from 'react';

export default function EditRegulation({ params }) {
//   const [regulationName, setRegulationName] = useState('');
// //   const [branches, setBranches] = useState([{'branch_name':'CSE','semesters':[{ semester: 1, subjects: [{ subjectName: '', credits: 0 }] }]}]); 
//   const { id } = params
//   const [branches, setBranches] = useState([{'branch_name':'CSE','semesters':[{ semester: 1, subjects: [{ subjectName: '', credits: 0 }] }]}]);
//      const [detailsChanged,setDetailsChanged]=useState({
//           "RegName":"",
//           "AddBranches":[],
//           "RemoveBranches":[],
//           "Addsemesters":[],
//           "RemoveSemester":[],
//           "AddSub":[],
//           "RemoveSub":[]
//      })

// //   const handleBranchChange = (index,branchName,value)=>{
// //      const updatedBranches =[...branches];
// //      updatedBranches[index]["branch_name"]=value;
// //      setBranches(updatedBranches);
// //   }
// //      const handleSemesterChange = (index, field, value) => {
// //           const updatedSemesters = [...branches.semesters];
// //           updatedSemesters[index][field] = value;
// // //     setSemesters(updatedSemesters);
     
// //      };

// //   const handleSubjectChange = (semesterIndex, subjectIndex,branchIndex, field, value) => {
// // //     const updatedSemesters = [...branches[branchIndex].semesters];
// // //     updatedSemesters[semesterIndex].subjects[subjectIndex][field] = value;
// // //     setSemesters(updatedSemesters);
// //      const updatedBranches = [...branches];
// //      const updatedSemesters = [...updatedBranches[branchIndex].semesters];
// //      updatedSemesters[semesterIndex].subjects[subjectIndex][field] = value;
// //      updatedBranches[branchIndex].semesters = updatedSemesters;
// //      setBranches(updatedBranches);
// //   };

// //   const addBranch =() =>{
// //      const newBranch={'branch_name':'CSE','semesters':[{ semester: 1, subjects: [{ subjectName: '', credits: 0 }] }]}
// //      const updatedBranches=[...branches,newBranch];
// //      setBranches(updatedBranches);
// //   }
// //   const addSemester = (index) => {
// //      console.log(index)
// //      // branches[index].semesters.push({ semester: branches[index].semesters.length + 1, subjects: [{ subjectName: '', credits: 0 }]})
// //      const updatedBranches = [...branches];

// //     // Add a new semester to the selected branch
// //     updatedBranches[index].semesters.push({
// //         semester: updatedBranches[index].semesters.length + 1, 
// //         subjects: [{ subjectName: '', credits: 0 }]
// //     });

// //     // Update the state
// //     setBranches(updatedBranches);
// // };
// // Update branch name and track changes
// const handleBranchChange = (index,branchName,value) => {
//      const updatedBranches = [...branches];
//      updatedBranches[index].branch_name = value;
//      setBranches(updatedBranches);
 
//      setDetailsChanged((prev) => ({
//        ...prev,
//        AddBranches: [...prev.AddBranches, value], // Track new branch names
//      }));
//    };
 
//    // Update semester field inside a branch and track changes
//    const handleSemesterChange = (branchIndex, semesterIndex, field, value) => {
//      const updatedBranches = [...branches];
//      updatedBranches[branchIndex].semesters[semesterIndex][field] = value;
//      setBranches(updatedBranches);
 
//      setDetailsChanged((prev) => ({
//        ...prev,
//        Addsemesters: [...prev.Addsemesters, { branchIndex, semesterIndex, field, value }],
//      }));
//    };
 
//    // Update subject details inside a semester and track changes
//    const handleSubjectChange = (branchIndex, semesterIndex, subjectIndex, field, value) => {
//      const updatedBranches = [...branches];
//      updatedBranches[branchIndex].semesters[semesterIndex].subjects[subjectIndex][field] = value;
//      setBranches(updatedBranches);
 
//      setDetailsChanged((prev) => ({
//        ...prev,
//        AddSub: [
//          ...prev.AddSub,
//          { branchIndex, semesterIndex, subjectIndex, field, value },
//        ],
//      }));
//    };
 
//    // Add a new branch and track changes
//    const addBranch = () => {
//      const newBranch = {
//        branch_name: "CSE",
//        semesters: [{ semester: 1, subjects: [{ subjectName: "", credits: 0 }] }],
//      };
//      setBranches([...branches, newBranch]);
 
//      setDetailsChanged((prev) => ({
//        ...prev,
//        AddBranches: [...prev.AddBranches, newBranch.branch_name],
//      }));
//    };
 
//    // Add a new semester to a branch and track changes
//    const addSemester = (branchIndex) => {
//      const updatedBranches = [...branches];
//      const newSemester = {
//        semester: updatedBranches[branchIndex].semesters.length + 1,
//        subjects: [{ subjectName: "", credits: 0 }],
//      };
//      updatedBranches[branchIndex].semesters.push(newSemester);
//      setBranches(updatedBranches);
 
//      setDetailsChanged((prev) => ({
//        ...prev,
//        Addsemesters: [...prev.Addsemesters, { branchIndex, semester: newSemester.semester }],
//      }));
//    };
 

// //   const addSubject = (semesterIndex,branchIndex) => {
// //      console.log(semesterIndex,branchIndex)
// //      console.log(branches)
// //      // branches[branchIndex].semesters[semesterIndex].subjects.push({ subjectName: '', credits: 0 });
// //      const updatedBranches = [...branches];
// //      const updatedSemesters = [...updatedBranches[branchIndex].semesters];
// //      updatedSemesters[semesterIndex].subjects.push({ subjectName: '', credits: 0 });
// //      updatedBranches[branchIndex].semesters = updatedSemesters;
// //      setBranches(updatedBranches);
// //   };
//      const addSubject = (semesterIndex, branchIndex) => {
//           const updatedBranches = [...branches];
          
//           // Add a new subject
//           const newSubject = { subjectName: "", credits: 0 };
//           updatedBranches[branchIndex].semesters[semesterIndex].subjects.push(newSubject);
          
//           setBranches(updatedBranches);
     
//           // Update detailsChanged to track added subjects
//           setDetailsChanged((prev) => ({
//           ...prev,
//           AddSub: [
//                ...prev.AddSub,
//                { branchIndex, semesterIndex, subject: newSubject }
//           ],
//           }));
//      };

//   const handleSubmit = async (e) => {
//      e.preventDefault();
//      console.log(detailsChanged)
//      // console.log(regulationName, branches);
//      // const body={
//      //      "_id":id,
//      //      "name":regulationName,
//      //      "description":"RegulationDescription",
//      //      "branches":branches
//      // }
//      // const token = sessionStorage.getItem('token');
//      // console.log(body);
//      // const res = await fetch('http://localhost:3001/Regulations', {
//      //   "method": 'PUT',
//      //   "headers":{
//      //       "Content-Type": "application/json",
//      //       'Authorization': `Bearer ${token}`
//      //  },
//      //   "body": JSON.stringify(body),
//      // })
//      // .then(res => {
//      //      if (res.ok){
//      //           alert("successfully edited")
//      //      }
//      // })
//      // .then(data => {
//      //  console.log(data);
//      // })
//    };

//     useEffect(()=>{
//           async function fetchReg() {
//                const data = await fetch(`http://localhost:3001/regulations/${id}`,{
//                     "method":"GET",
//                     "headers":{
//                     "Content-Type": "application/json",
//                     "Authorization":`Bearer ${sessionStorage.getItem('token')}`
//                     }
//                })
//                .then(response => response.json())
//                .then(data => {
//                     console.log(data)
//                     setRegulationName(data.name);
//                     setBranches(data.branches);
//                })
//           }
//           fetchReg();
//      },[])

const { id } = params;
  const [regulationName, setRegulationName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [branches, setBranches] = useState([]);
  const [originalBranches, setOriginalBranches] = useState([]);
  const [detailsChanged, setDetailsChanged] = useState({
    "RegName": "",
    "AddBranches": [],
    "RemoveBranches": [],
    "AddSemesters": [],
    "RemoveSemesters": [],
    "AddSubjects": [],
    "RemoveSubjects": [],
    "ModifySubjects": []
  });

  // Handle regulation name change
  const handleRegNameChange = (value) => {
    setRegulationName(value);
    if (value !== originalName) {
      setDetailsChanged(prev => ({
        ...prev,
        RegName: value
      }));
    } else {
      setDetailsChanged(prev => ({
        ...prev,
        RegName: ""
      }));
    }
  };

  // Handle branch name change
  const handleBranchChange = (index, field, value) => {
    const updatedBranches = [...branches];
    updatedBranches[index].branch_name = value;
    setBranches(updatedBranches);

    // Check if this is modifying an original branch
    if (index < originalBranches.length) {
      const originalBranchName = originalBranches[index].branch_name;
      if (originalBranchName !== value) {
        setDetailsChanged(prev => ({
          ...prev,
          ModifiedBranches: [...(prev.ModifiedBranches || []), {
            index,
            oldName: originalBranchName,
            newName: value
          }]
        }));
      }
    }
  };

  // Handle semester change (if needed)
  const handleSemesterChange = (branchIndex, semesterIndex, field, value) => {
    const updatedBranches = [...branches];
    updatedBranches[branchIndex].semesters[semesterIndex][field] = value;
    setBranches(updatedBranches);
    
    // Track changes if this is modifying an original semester
    if (branchIndex < originalBranches.length && 
        semesterIndex < originalBranches[branchIndex].semesters.length) {
      setDetailsChanged(prev => ({
        ...prev,
        ModifiedSemesters: [...(prev.ModifiedSemesters || []), {
          branchIndex,
          semesterIndex,
          field,
          value
        }]
      }));
    }
  };

  // Handle subject change
  const handleSubjectChange = (branchIndex, semesterIndex, subjectIndex, field, value) => {
    const updatedBranches = [...branches];
    console.log(branches,subjectIndex,semesterIndex,branchIndex)
    updatedBranches[branchIndex].semesters[semesterIndex].subjects[subjectIndex][field] = value;
    setBranches(updatedBranches);

    // Check if this is modifying an original subject
    const isOriginalSubject = 
      branchIndex < originalBranches.length && 
      semesterIndex < originalBranches[branchIndex].semesters.length &&
      subjectIndex < originalBranches[branchIndex].semesters[semesterIndex].subjects.length;

    if (isOriginalSubject) {
      const originalValue = originalBranches[branchIndex].semesters[semesterIndex].subjects[subjectIndex][field];
      if (originalValue !== value) {
        setDetailsChanged(prev => {
          // Find if we already have a modification record for this subject
          const existingModIndex = (prev.ModifySubjects || []).findIndex(
            item => item.branchIndex === branchIndex && 
                  item.semesterIndex === semesterIndex && 
                  item.subjectIndex === subjectIndex
          );
          
          let newModifySubjects = [...(prev.ModifySubjects || [])];
          
          if (existingModIndex >= 0) {
            // Update existing modification
            newModifySubjects[existingModIndex] = {
              ...newModifySubjects[existingModIndex],
              [field]: value
            };
          } else {
            // Add new modification
            newModifySubjects.push({
              branchIndex,
              semesterIndex,
              subjectIndex,
              [field]: value
            });
          }
          
          return {
            ...prev,
            ModifySubjects: newModifySubjects
          };
        });
      }
    }
  };

  // Add a new branch
  const addBranch = () => {
    const newBranch = {
      branch_name: "New Branch",
      semesters: [{ semester: 1, subjects: [{ subjectName: '', credits: 0 }] }]
    };
    setBranches([...branches, newBranch]);

    setDetailsChanged(prev => ({
      ...prev,
      AddBranches: [...prev.AddBranches, newBranch]
    }));
  };

  // Add a new semester to a branch
  const addSemester = (branchIndex) => {
    const updatedBranches = [...branches];
    const newSemester = {
      semester: updatedBranches[branchIndex].semesters.length + 1,
      subjects: [{ subjectName: '', credits: 0 }]
    };
    updatedBranches[branchIndex].semesters.push(newSemester);
    setBranches(updatedBranches);

    setDetailsChanged(prev => ({
      ...prev,
      AddSemesters: [...prev.AddSemesters, { 
        branchIndex, 
        semesterIndex: updatedBranches[branchIndex].semesters.length - 1,
        semester: newSemester 
      }]
    }));
  };

  // Add a new subject to a semester
  const addSubject = (semesterIndex, branchIndex) => {
    const updatedBranches = [...branches];
    const newSubject = { subjectName: '', credits: 0 };
    updatedBranches[branchIndex].semesters[semesterIndex].subjects.push(newSubject);
    setBranches(updatedBranches);
     console.log(branches[branchIndex].semesters[semesterIndex].subjects)
    setDetailsChanged(prev => ({
      ...prev,
      AddSubjects: [...prev.AddSubjects, {
        branchIndex,
        semesterIndex,
        subjectIndex: updatedBranches[branchIndex].semesters[semesterIndex].subjects.length - 1,
        subject: newSubject
      }]
    }));
  };
  
  // Remove a branch (would need a UI button for this)
  const removeBranch = (branchIndex) => {
    // If it's an original branch, track it for removal
    if (branchIndex < originalBranches.length) {
      setDetailsChanged(prev => ({
        ...prev,
        RemoveBranches: [...prev.RemoveBranches, originalBranches[branchIndex]]
      }));
    }
    
    const updatedBranches = branches.filter((_, idx) => idx !== branchIndex);
    setBranches(updatedBranches);
  };
  
  // Remove a semester (would need a UI button for this)
  const removeSemester = (branchIndex, semesterIndex) => {
    // If it's an original semester, track it for removal
    if (branchIndex < originalBranches.length && 
        semesterIndex < originalBranches[branchIndex].semesters.length) {
      setDetailsChanged(prev => ({
        ...prev,
        RemoveSemesters: [...prev.RemoveSemesters, {
          branchIndex,
          semesterIndex,
          semester: originalBranches[branchIndex].semesters[semesterIndex]
        }]
      }));
    }
    
    const updatedBranches = [...branches];
    updatedBranches[branchIndex].semesters.splice(semesterIndex, 1);
    setBranches(updatedBranches);
  };
  
  // Remove a subject (would need a UI button for this)
  const removeSubject = (branchIndex, semesterIndex, subjectIndex) => {
    // If it's an original subject, track it for removal
    if (branchIndex < originalBranches.length && 
        semesterIndex < originalBranches[branchIndex].semesters.length &&
        subjectIndex < originalBranches[branchIndex].semesters[semesterIndex].subjects.length) {
      setDetailsChanged(prev => ({
        ...prev,
        RemoveSubjects: [...prev.RemoveSubjects, {
          branchIndex,
          semesterIndex,
          subjectIndex,
          subject: originalBranches[branchIndex].semesters[semesterIndex].subjects[subjectIndex]
        }]
      }));
    }
    
    const updatedBranches = [...branches];
    updatedBranches[branchIndex].semesters[semesterIndex].subjects.splice(subjectIndex, 1);
    setBranches(updatedBranches);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a payload with only the changed data
    const payload = {
      _id: id,
    };
    
    // Add regulation name if changed
    if (detailsChanged.RegName !== "") {
      payload.name = detailsChanged.RegName;
    }
    
    // Add any changes tracked in detailsChanged
    const hasChanges = Object.keys(detailsChanged).some(key => {
      const value = detailsChanged[key];
      return Array.isArray(value) ? value.length > 0 : value !== "";
    });
    
    if (hasChanges) {
      payload.changes = detailsChanged;
    }
    else{
          alert("No changes made");
          return;
    }
    
    console.log("Submitting only changed data:", payload);
    
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch('http://localhost:3001/regulations', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        alert("Successfully edited regulation");
        // Reset tracking state and refresh data
        fetchReg();
        setDetailsChanged({
          "RegName": "",
          "AddBranches": [],
          "RemoveBranches": [],
          "AddSemesters": [],
          "RemoveSemesters": [],
          "AddSubjects": [],
          "RemoveSubjects": [],
          "ModifySubjects": []
        });
      } else {
        alert("Failed to update regulation");
      }
    } catch (error) {
      console.error("Error updating regulation:", error);
      alert("Error updating regulation");
    }
  };

  // Fetch regulation data
  const fetchReg = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/regulations/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch regulation");
      }
      
      const data = await response.json();
      console.log("Fetched regulation data:", data);
      
      setRegulationName(data.name);
      setOriginalName(data.name);
      
      // Create deep copies to avoid reference issues
      setBranches(JSON.parse(JSON.stringify(data.branches)));
      setOriginalBranches(JSON.parse(JSON.stringify(data.branches)));
    } catch (error) {
      console.error("Error fetching regulation:", error);
      alert("Error loading regulation data");
    }
  };

  useEffect(() => {
    fetchReg();
  }, [id]);

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
               <h1 className="text-2xl font-bold mb-4 text-white">Edit Regulation</h1>
               <form onSubmit={handleSubmit}>
               <div className="mb-4">
                    <label className="block mb-2  text-white">Regulation Name</label>
                    <input
                    type="text"
                    value={regulationName}
                    onChange={(e) => handleRegNameChange(e.target.value)}
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
                                        onChange={(e) => handleBranchChange(branchIndex, 'branch_name', e.target.value)} 
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
                                                                 value={subject.subjectName}
                                                                 onChange={(e) => handleSubjectChange(branchIndex, semesterIndex,subjectIndex ,'subjectName', e.target.value)}
                                                                 className="p-2 border border-gray-300 rounded-md mr-2"
                                                            />
                                                            <input
                                                                 type="number"
                                                                 placeholder="Credits"
                                                                 value={subject.credits}
                                                                 onChange={(e) => handleSubjectChange(branchIndex, semesterIndex,subjectIndex, 'credits', e.target.value)}
                                                                 className="p-2 border border-gray-300 rounded-md"
                                                            />
                                                       </div>
                                                  ))}
                                                  <button type="button" onClick={() => addSubject(semesterIndex,branchIndex)} className="text-blue-500 px-4">
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
