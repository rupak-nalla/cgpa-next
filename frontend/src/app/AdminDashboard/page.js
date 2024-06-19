
export default function Home() {
     const regulations={
          "1":"R22",
          "2":"R18",
          "3":"R16",
     }
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

               <div className="min-h-screen min-w-screen bg-slate-800 p-5">
                    <div className="flex justify-between">
                         <h3 class="text-3xl font-bold dark:text-white">Regulations</h3>
                         <div>
                              <a href="/AddRegulation">
                                   <button className="bg-blue-600 px-4 py-2 rounded text-white mx-2">Add Regulation</button>
                              </a>
                         </div>
                    </div>

                    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div id="regulations">
                         
                         {Object.keys(regulations).map((key) => (
                              <div key={key} className="bg-slate-600 shadow-md  rounded-lg  px-4 py-2 mb-3">
                                   <div className="flex justify-between items-center ">
                                        <h2 className="text-xl font-bold text-white">{regulations[key]}</h2>
                                        <div>
                                             <button type="button" className="bg-blue-600 px-4 py-2 rounded text-white mx-2">Edit</button>
                                             <button type="button" className="bg-red-600 px-4 py-2 rounded text-white">Remove</button>

                                        </div>
                                   </div>
                              </div>
                         ))}
                         
                    </div>
                    

                    

                    
               </div>
          </main>
     );
}