import React from "react";
import { useDataContext } from "@/context/DataContext";
import { useAccount } from "wagmi";
const ActivityTab = () => {
  const { poolBets } = useDataContext();
  const { address } = useAccount();
  return (
    <>
      <div className="sm:border sm:py-6 sm:px-4 rounded-md">
        <h1 className="text-lg font-bold flex items-center gap-2 tracking-wide">
          Transactions
        </h1>
        <table
          className="w-full border-collapse font-thin text-sm
                    hover:[&_tbody>tr]:bg-red-50
                    [&_th]:hidden
                    
                    [&_th]:text-white
                    [&_th]:font-thin
                    [&_th]:text-left
                    [&_tr>*]:px-3
                    [&_tr>*]:py-2
                    [&_td]:font-semibold
                    [&_td]:relative 
                    [&_td]:flex
                    first:[&_tr>td]:pt-6
                    last:[&_tr>td]:pb-6
                    [&_td]:items-center 
                    [&_td]:gap-2
                    before:[&_td]:content-[attr(data-cell)]
                    before:[&_td]:font-normal
                    before:[&_td]:w-20
                
                    [&_div]:flex
                    [&_div]:items-center
                    [&_div]:gap-1
                    [&_div]:flex-wrap
                    [&_span]:rounded-full
                    [&_span]:text-xs
                    [&_span]:py-1
                    [&_span]:px-2
        

                    sm:first:[&_tr>td]:py-2
                    sm:last:[&_tr>td]:py-2
                    sm:[&_th]:table-cell
                    sm:[&_td]:table-cell
                    sm:before:[&_td]:hidden
                "
        >
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Predicted Score</th>
              <th>Claimed Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {poolBets?.map((bet, index) => {
              return (
                <tr key={index}>
                  <td data-cell="User">{bet.user}</td>
                  <td data-cell="Amount">{bet.amount} Buzz</td>
                  <td data-cell="Predicted score">{bet.targetScore}</td>
                  <td data-cell="Claimed amount">{bet.claimedAmount}</td>
                  {address === bet.user && bet.claimed ? (
                    <td>
                      <button className="mt-4 md:mt-0 bg-gradient-to-r from-s4 via-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition hover:from-s4 hover:via-blue-600 hover:to-purple-700">
                        Claim Now
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActivityTab;
