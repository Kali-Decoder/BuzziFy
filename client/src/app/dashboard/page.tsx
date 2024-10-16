"use client";
import React from "react";
import { useDataContext } from "@/context/DataContext";
import { useAccount } from "wagmi";
const DashboardPage = () => {
  const { address } = useAccount();
  const handleClick = async () => {
    if (!address) return;
  };
  return (
    <>
      <div className="container mx-auto bg-transparent dark:bg-transparent text-white h-screen flex overflow-hidden text-sm relative pt-24 md:pt-28 lg:pt-30">
        <div className="flex-grow flex overflow-x-hidden">
          <div className="flex-grow bg-transparent dark:bg-gray-900 overflow-y-auto">
            <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full bg-transparent dark:bg-gray-900 text-white dark:border-gray-800 sticky top-0">
              <div className="flex w-full items-center">
                <div className="flex items-center text-3xl text-white">
                  <img
                    src="https://avatars.githubusercontent.com/u/82640789?v=4"
                  
                    className="w-24 mr-4 rounded-full border-4"
                    alt="profile"
                  />
                  Nikku Dev
                </div>
                
                <div className="ml-auto sm:flex hidden items-center justify-end">
                  <div className="text-right">
                    <div className="text-md text-gray-400">
                      Account balance:
                    </div>
                    <div className="text-3xl text-white">2,794.00 BUZZ</div>
                  </div>
                  <button className="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                <a
                  href="#"
                  className="px-3 border-b-2 text-white dark:border-white pb-1.5"
                >
                  Activities
                </a>
                <a
                  href="#"
                  className="px-3 border-b-2 border-transparent text-white pb-1.5"
                >
                  Transfer
                </a>
                <a
                  href="#"
                  className="px-3 border-b-2 border-transparent text-white pb-1.5 sm:block hidden"
                >
                  Budgets
                </a>
                <a
                  href="#"
                  className="px-3 border-b-2 border-transparent text-white pb-1.5 sm:block hidden"
                >
                  Notifications
                </a>
                <a
                  href="#"
                  className="px-3 border-b-2 border-transparent text-white pb-1.5 sm:block hidden"
                >
                  Cards
                </a>
              </div>
            </div>
            <div className="sm:p-7 p-4">
              <div className="flex w-full items-center mb-7">
                <button className="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-white dark:border-gray-800 border border-gray-200 leading-none py-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 mr-2 text-white"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Last 30 days
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 ml-1.5 text-white"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-white dark:border-gray-800 border border-gray-200 leading-none py-0">
                  Filter by
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="ml-auto text-white text-xs sm:inline-flex hidden items-center">
                  <span className="mr-3">Page 2 of 4</span>
                  <button className="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
                    <svg
                      className="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
                    <svg
                      className="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                      Type
                    </th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                      Where
                    </th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
                      Description
                    </th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                      Amount
                    </th>
                    <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                 
                  <tr>
                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 mr-5 text-green-500"
                          stroke="currentColor"
                          stroke-width="3"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                        Income
                      </div>
                    </td>
                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center">
                        <img
                          className="w-7 h-7 mr-2.5 border border-gray-200 dark:border-gray-800 rounded-full"
                          src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt="profile"
                        />
                        Jane Cooper
                      </div>
                    </td>
                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                      Invoice No: 12993
                    </td>
                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
                      + $24.00
                    </td>
                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center">
                        <div className="sm:flex hidden flex-col">
                          01.04.2020
                          <div className="text-gray-400 text-xs">09:45 AM</div>
                        </div>
                        <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex w-full mt-5 space-x-2 justify-end">
                <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                  <svg
                    className="w-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                  1
                </button>
                <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-white leading-none">
                  2
                </button>
                <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                  3
                </button>
                <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                  4
                </button>
                <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                  <svg
                    className="w-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
