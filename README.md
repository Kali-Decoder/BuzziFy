<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=1000&size=55&pause=1000&center=true&vCenter=true&width=1000&lines=BuzziFy;  Now+Watch+And+Earn+Rewards" alt="Typing SVG" /></a>
<br/> <br/> 
![c79a33af-ccb8-4f41-a434-83ac9298e3f6](https://github.com/user-attachments/assets/51d01ffc-9824-41a0-834c-822dc244b5c7)

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
![6096066066871598693](https://github.com/user-attachments/assets/05a7be99-999a-4713-8634-4b1dfccdcae8)
![6096066066871598694](https://github.com/user-attachments/assets/da1f1da8-8b3a-4999-af2e-968368d5800c)
![6096066066871598691](https://github.com/user-attachments/assets/353c7753-bb8e-4e50-87af-fc169515a355)
![6096066066871598692](https://github.com/user-attachments/assets/61be2eb2-7b3c-4873-9d70-9d0e27f73157)
![6096066066871598697](https://github.com/user-attachments/assets/33c61804-d027-488a-aa3c-9bb91b078a46)
![6096066066871598690](https://github.com/user-attachments/assets/063f144c-d4cc-4fbf-b57a-d96165677283)








