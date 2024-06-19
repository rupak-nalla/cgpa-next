"use client"
import Image from "next/image";
import Link from 'next/link';
import { useState,useEffect } from "react";
export default function Home() {

     const items = {
          0: 'subject 1',
          1: 'subject 2',
          2: 'subject 3',
          3: 'subject 4',
          4: 'subject 5',
        };
     const [lenSems,setLenSems]=useState(0);
     const [sub,setSub]=useState(false);
     const [sc,setsc]=useState(false);
     const [Res,setRes]=useState(-1);
     const [inputFields, setInputFields] = useState([]);
     function getFields(){
          const Calby= document.getElementById('Calby').value;
          const sem=document.getElementById('YS').value;
          if(Calby=='1'){
               setSub(true);
               setsc(false);
          }
          else{
               
               setLenSems(parseInt(sem,10));
               console.log(lenSems);
               setSub(false);
               setsc(true);
               const newInputFields = Array.from({ length: lenSems }, (_, index) => ({
                    id: index,
                    value: '',
               }));
               setInputFields(newInputFields);
          }
     }
     useEffect(() => {
          const newInputFields = Array.from({ length: lenSems }, (_, index) => ({
               id: index,
               value: '',
          }));
          setInputFields(newInputFields);
     }, [lenSems]);
     const handleInputChange = (index, value) => {
          const newInputFields = [...inputFields];
          newInputFields[index].value = parseFloat(value);
          setInputFields(newInputFields);
     };
     function CalByCGPA() {
          let sum=0;
          for (let i = 0; i < inputFields.length; i++) {
               sum+=inputFields[i].value;
          }
          setRes(sum/inputFields.length)
     }
     useEffect(()=>{},[Res])
     return (
     <main>
          <nav class="bg-white border-gray-200 dark:bg-gray-900">
               <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                         <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                         <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CGPA Calculator</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                         <span class="sr-only">Open main menu</span>
                         <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                         </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                         <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                              <li>
                                   <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><a href="/Login">Login</a></button>
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
                              <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Year and Sem</label>
                              <select id="Reg" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                   <option selected>Select Regulation</option>
                                   <option value="1">R22</option>
                                   <option value="2">R18</option>
                                   <option value="3">R16</option>
                                   
                              </select>
                         </div>
                         <div className="">
                              <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calculate by</label>
                              <select id="Calby" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                   <option selected>Calculate by</option>
                                   <option value="1">using Subjects</option>
                                   <option value="2">using SGPA</option>
                              </select>
                         </div>
                         {/* select year and sem */}
                         <div className="">
                              <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Year and Sem</label>
                              <select id="YS" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                   <option selected>Select Year and Sem</option>
                                   <option value="1">1-1</option>
                                   <option value="2">1-2</option>
                                   <option value="3">2-1</option>
                                   <option value="4">2-2</option>
                                   <option value="5">3-1</option>
                                   <option value="6">3-2</option>
                                   <option value="7">4-1</option>
                                   <option value="8">4-2</option>
                              </select>
                         </div>
                         <div className="flex justify-center">

                              <button onClick={getFields} type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Get fields</button>
                         </div>
                         {
                         sub ?(
                              <div className="subjects">
                                   <h3 className="text-center text-white">Enter Points scored below</h3>
                                   {/* get points for subjects */}
                                   
                                   {Object.keys(items).map((key) => (
                                        
                                        <div key={key}>
                                             <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{items[key]}</label>
                                             <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required />
                                        </div>
                                   ))}
                                   <div className="flex justify-center m-4">
                                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Get subjects</button>
                                   </div>
                              </div>
                         ):(
                              <div></div>
                         )
                    }
                    {
                              sc ?(
                                   
                                   <div className="CGPA">
                                        {
                                             Res>=0 ?(
                                                  <div>
                                                       <h2 className="text-white">Result:{Res}</h2>
                                                  </div>
                                             ):(
                                                  <div></div>
                                             )
                                        }
                                        
                                        <h3 className="text-white">Enter SCGPAs</h3>
                                        {inputFields.map((field, index)=> (
                                             <div key={index}>
                                                  <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index+1} sem</label>
                                                  <input id={`field-${field.id}`} value={field.value}  onChange={(e) => handleInputChange(index, e.target.value)} step="0.01" type="number"  aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required />
                                             </div>
                                        ))}
                                        <button type="button" onClick={CalByCGPA} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Calculate</button>
                                   </div>
                              ):(
                                   <div></div>
                              )
                         }
                         
                    
                    </form>
               </div>
          </div>
     </main>
     );
}
