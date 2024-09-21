"use client"
import Image from "next/image";
import Link from 'next/link';
import { useRef,useState } from "react";

export default function Home() {
     
     const [inputFields1, setInputFields] = useState([]);

     const handleAddInputField = () => {
          setInputFields([...inputFields1, '']);
     };

     const handleInputChange = (index, value) => {
     const updatedFields = [...inputFields1];
     updatedFields[index] = value;
     setInputFields(updatedFields);
     };

     const [inputFields2, setInputFields2] = useState([]);
     const handleAddInputField2 = () => {
          setInputFields2([...inputFields2, '']);
     };
     const handleInputChange2 = (index, value) => {
          const updatedFields = [...inputFields2];
          updatedFields[index] = value;
          setInputFields2(updatedFields);
     };

     const [inputFields3, setInputFields3] = useState([]);
     const handleAddInputField3 = () => {
          setInputFields3([...inputFields2, '']);
     };
     const handleInputChange3 = (index, value) => {
          const updatedFields = [...inputFields3];
          updatedFields[index] = value;
          setInputFields3(updatedFields);
     };

     const [inputFields4, setInputFields4] = useState([]);
     const handleAddInputField4 = () => {
          setInputFields4([...inputFields2, '']);
     };
     const handleInputChange4 = (index, value) => {
          const updatedFields = [...inputFields4];
          updatedFields[index] = value;
          setInputFields4(updatedFields);
     };

     const [inputFields5, setInputFields5] = useState([]);
     const handleAddInputField5 = () => {
          setInputFields5([...inputFields5, '']);
     };
     const handleInputChange5 = (index, value) => {
          const updatedFields = [...inputFields5];
          updatedFields[index] = value;
          setInputFields5(updatedFields);
     };

     const [inputFields6, setInputFields6] = useState([]);
     const handleAddInputField6 = () => {
          setInputFields6([...inputFields6, '']);
     };
     const handleInputChange6 = (index, value) => {
          const updatedFields = [...inputFields6];
          updatedFields[index] = value;
          setInputFields6(updatedFields);
     };

     const [inputFields7, setInputFields7] = useState([]);
     const handleAddInputField7 = () => {
          setInputFields7([...inputFields7, '']);
     };
     const handleInputChange7 = (index, value) => {
          const updatedFields = [...inputFields7];
          updatedFields[index] = value;
          setInputFields7(updatedFields);
     };

     const [inputFields8, setInputFields8] = useState([]);
     const handleAddInputField8 = () => {
          setInputFields8([...inputFields8, '']);
     };
     const handleInputChange8 = (index, value) => {
          const updatedFields = [...inputFields8];
          updatedFields[index] = value;
          setInputFields2(updatedFields);
     };

     function handleSubmit(e) {
          e.preventDefault();
          
          console.log(inputFields1,inputFields2)
     }




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
                         <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Add Regulation</h1>
                         <form className="max-w-sm mx-auto">

                              <div className="my-2">
                                   <label for="RegName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regulation Name</label>
                                   <input type="text" id="RegName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="R22" required />
                              </div>
                              <h3 className="block mb-2 text-center font-medium text-gray-900 dark:text-white">Semesters</h3>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 1</h5>
                              <div id="sem1">
                                   {inputFields1.map((field, index) => (
                                        <div className="py-4 flex">
                                             <div className="px-3">
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name" required />
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10" required value={field} onChange={(e) => handleInputChange(index, e.target.value)}/>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                              <button onClick={ handleAddInputField  } className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 2</h5>
                              <div id="sem2">
                                   {inputFields2.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange2(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField2} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 3</h5>
                              <div id="sem3">
                                   {inputFields3.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange3(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField3} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 4</h5>
                              <div id="sem4">
                                   {inputFields4.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange4(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField4} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 5</h5>
                              <div id="sem5">
                                   {inputFields5.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange5(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField5} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 6</h5>
                              <div id="sem6">
                                   {inputFields6.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange6(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField6} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 7</h5>
                              <div id="sem7">
                                   {inputFields7.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange7(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField7} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <h5 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester 8</h5>
                              <div id="sem8">
                                   {inputFields8.map((field, index) => (
                                        <div className="py-4">
                                             <div>
                                                  <label for="SubjectName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                                  <input type="text" id="SubjectName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Name"  value={field} onChange={(e) => handleInputChange8(index, e.target.value)}/>
                                             </div>
                                             <div>
                                                  <label for="Credits" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credits</label>
                                                  <input type="Number" id="Credits" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10"  />
                                             </div>
                                        </div>
                                        ))}
                              </div>
                              <button onClick={handleAddInputField8} className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Add Subject</button>
                              <br></br>
                              <button className="my-3 inline-flex items-center justify-center px-2 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" onClick={handleSubmit}>Submit</button>
                         </form>
                    </div>
               </div>
          </main>
     );
}
