import { useRecoilState } from "recoil";
import userInfoAtom from "../state/userInfo";
import { Button } from "flowbite-react";
import boardInfoAtom from "../state/boardInfo";
import { useState } from "react";

function NavBar() {
    const [userInfo, _] = useRecoilState(userInfoAtom);
    const [boardInfo] = useRecoilState(boardInfoAtom);
    const [copyCode,setCopyCode]=useState('Collaborate / Share Link')


    const handleCopyCode=async ()=>{
        await navigator.clipboard.writeText(`https://planit.coauth.dev?code=${boardInfo}`);
        setCopyCode('Copied')
        setTimeout(function(){
            setCopyCode('Collaborate / Share Link')
        },3000)
    }

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://planit.coauth.dev/" className="flex items-center">
                        <img src="/logo.png" className="h-8 mr-3" alt="Plan It Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Plan.it</span>
                    </a>
                    <div className="flex items-center md:order-2">
                        <div className="mr-24 font-bold">
                            Welcome {userInfo}
                        </div>
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                        </button>

                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <div className="flex">
                            <div className=" mb-3 w-96" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    id="copy-target"
                                    value={`https://planit.coauth.dev?code=${boardInfo}`}
                                    disabled
                                    className="w-96"
                                    />
                                
                            </div>
                            <div>
                                <Button color="dark" className={'w-54'} onClick={handleCopyCode}>{copyCode}</Button>
                            </div>
                        </div>

                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {/* <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
                            </li> */}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar

