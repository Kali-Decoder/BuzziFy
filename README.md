<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=1000&size=55&pause=1000&center=true&vCenter=true&width=1000&lines=Buzzi+-+Fy;  Now+Watch+And+Earn+Rewards" alt="Typing SVG" /></a>
 <br/> <br/> <br/> <br/> <br/> 
![Buzzify](https://github.com/user-attachments/assets/5fb554af-3af3-4ac5-ab70-df619db2da71)

 <br/> <br/>
# BuzziFy<>Base-India

### BuzziFy is a platform designed for avid reel viewers, offering them the opportunity to place bets on the engagement of content creators. If the engagement of a content creator increases within a specified time frame, users can earn rewards based on their predictions.

## Key Features
### Here are the BuzzyFI features in point form:

- **Monetize Your Existing Reels:** Turn your current reels into revenue-generating content.
- **Upload Custom Reels:** Share and monetize your own custom-created reels.
- **Invest in Favorite Creators' Reels:** Place an investment amount on your favorite content creators' reels for a specific tenure.
- **Withdraw Rewards:** Redeem your earnings once the investment tenure is complete.
- **Earn Reels-Fi Tokens:** Gain Reels-Fi tokens through a "Refer and Earn" program.

## Technical Architecture
<img width="1214" alt="Screenshot 2024-08-07 at 10 07 16 AM" src="https://github.com/user-attachments/assets/300dffc3-9f8a-44b6-aa39-940c847cfd65">

## TechStack

- Next.js
- Typescript
- Tailwind CSS
- Move Language
- Solidity
- Petra Wallet SDK

## Challenges and Solution
- Inadequate Rewards for User Engagement
    - Problem: Despite contributing valuable content and engagement, users receive little to no tangible rewards for their participation on most social media platforms.
- Barrier to Monetization for Small Creators
    - Many small creators struggle to monetize their content effectively due to high entry barriers and the dominance of established influencers.
- Time and Effort Not Valued
    - Users spend significant time and effort creating and engaging with content but often feel that their contributions are undervalued.


## Bounty Tracks: Based India: Deployed Contracts Link:
- **1. Base Sepolia Testnet:** <br/>
  - BuzziFy Buzz Token(Contract Address ): 0x7AD1a4b60c8C265a951459B4888354D1339c3cDa) :
    https://sepolia.basescan.org/address/0x7AD1a4b60c8C265a951459B4888354D1339c3cDa
  - BuzziFy (Contract Address ): 0x72105396D6b1c1378581D5Be21683A6470c1F2aE):
    https://sepolia.basescan.org/address/0x72105396D6b1c1378581D5Be21683A6470c1F2aE

## Contract Overview : 

| **Function**                | **Visibility** | **Parameters**                                                                 | **Explanation**                                                                                                                                                                                                                                    |
|-----------------------------|----------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(address _token)`| `external`     | `_token`: address of the ERC20 token to be used for betting                    | Initializes the contract by setting the token address and the owner to the message sender.                                                                                                                                                        |
| `createPool()`               | `external`     | None                                                                          | Allows the owner to create a new betting pool with a specified end time (5 minutes from creation). The pool is assigned an ID, and the pool's initial parameters (amount, bets, end time) are set.                                                  |
| `placeBet(uint256 _amount, uint256 _targetScore, uint256 _pool_id)`| `external` | `_amount`: amount of tokens to bet, `_targetScore`: predicted score, `_pool_id`: ID of the pool| Allows users to place a bet on a specific pool by providing the amount of tokens and target score. The bet is only accepted if it’s within the pool's betting period, and users haven't already placed a bet. Transfers tokens to the contract.     |
| `setResult(uint256 _pool_id, uint256 _finalScore)` | `external`    | `_pool_id`: ID of the pool, `_finalScore`: final score of the pool             | Allows the owner to set the final result of the pool after the betting period ends. This function ends the pool and initiates the reward calculation for the bets based on their accuracy.                                                          |
| `_calculationReward(uint256 _pool_id)` | `private`      | `_pool_id`: ID of the pool                                                   | Calculates the reward for each bet based on its accuracy compared to the final score. Uses a weighted accuracy formula to proportionally distribute rewards from the pool among participants.                                                      |
| `claimBet(uint _pool_id)`    | `external`     | `_pool_id`: ID of the pool                                                    | Allows users to claim their reward if they placed a bet in the pool and their claimable reward is greater than zero. Ensures that the pool has ended before claiming. Tokens are transferred to the user upon successful claim.                    |
| `withdraw(uint256 amount, address _receiver)` | `external`    | `amount`: amount to withdraw, `_receiver`: address to receive the funds        | Allows the owner to withdraw unclaimed tokens from the contract. Transfers a specified amount of tokens to a designated receiver address.                                                                                                          |

## Key Concepts
- **Betting Pools**: A pool where users can place bets based on their prediction of a score.
- **Bet**: Contains user info, bet amount, target score, and whether the bet has been claimed.
- **Final Score**: The actual outcome of the event, which is compared to users' target scores.
- **Reward Calculation**: Based on the accuracy of users' predictions, with more accurate bets getting a higher portion of the total pool.

## Events

- **BetPlaced**: Emitted when a user places a bet in a pool.
- **BetClaimed**: Emitted when a user successfully claims their reward.

---


### Platform UI 
<img width="1470" alt="Screenshot 2024-08-08 at 2 03 52 PM" src="https://github.com/user-attachments/assets/ea999d8f-e6f7-47e1-987e-e44d57ceac36">
<img width="1470" alt="Screenshot 2024-08-08 at 2 04 11 PM" src="https://github.com/user-attachments/assets/96bbc367-fd66-4624-afac-9b79407d3346">

<img width="1469" alt="Screenshot 2024-08-08 at 2 28 29 AM" src="https://github.com/user-attachments/assets/2b584fdb-daa4-4bcd-b7be-190b2dd7f253">
<img width="1470" alt="Screenshot 2024-08-08 at 2 28 41 AM" src="https://github.com/user-attachments/assets/2769e0b1-4374-4bed-8ea7-bc6efa4ae52a">
<img width="1468" alt="Screenshot 2024-08-08 at 2 28 59 AM" src="https://github.com/user-attachments/assets/acb32b1a-7dda-42ea-9cea-72b18d2a31ff">
<img width="1470" alt="Screenshot 2024-08-08 at 2 29 11 AM" src="https://github.com/user-attachments/assets/6d268e22-dfef-4eb1-b165-c3ac3b69a1b2">
<img width="1470" alt="Screenshot 2024-08-08 at 2 30 30 AM" src="https://github.com/user-attachments/assets/4f245bdb-8183-4dab-b775-b370d0c89c82">
<img width="1467" alt="Screenshot 2024-08-08 at 2 30 39 AM" src="https://github.com/user-attachments/assets/c98d29f4-c4bb-401e-ada9-1d80a482bb33">
<img width="1470" alt="Screenshot 2024-08-08 at 2 55 17 AM" src="https://github.com/user-attachments/assets/1c044137-3758-4b9b-b83a-ac0ae3e71e25">
<img width="1470" alt="Screenshot 2024-08-08 at 3 02 25 AM" src="https://github.com/user-attachments/assets/aba561ae-a44a-4277-8125-c8fd9676de4a">


