# Dive into Solidity Course

This is the project repository for the Dive into Solidity Udemy course by Macro. 
Please fork this repository to complete the two projects in the course locally. 

All the normal hardhat tooling is available in this repository, such as `npx hardhat test` and `npx hardhat compile`.

## Knowledge Test

Please complete each of the following tasks by adding or editing code in the `KnowledgeTest.sol` contract after finishing section 1:

- Add a public state variable of type address called `owner`
- Declare the `constructor` and initialize the owner variable in the constructor. The `owner` should be initialized with the address of the account that deploys the contract
- Modify the `changeTokens()` function in such a way that it changes the state variable called tokens.
- Make it so that the contract can receive ETH by sending it directly to the contract address
- Add a function called `getBalance()` that returns the contract's balance
- Add a function called `transferAll()` that takes an argument of type `address` and transfers the entire balance of the contract to it
- Add a restriction so that only the `owner` can call `transferAll()`, otherwise, make it revert with an `"ONLY_OWNER"` error (use a require statement)
- Add a function called `start()` that adds the address of the account that calls it to the dynamic array called `players`
- Declare a function called `concatenate` that takes two strings as parameters and returns them concatenated
- Note: Since Solidity does not offer a native way to concatenate strings use abi.encodePacked() to do that

Once you are done, run `npx hardhat test` to check your work :D

## Lottery Contract

The Lottery contract is a smart contract where people can enter the lottery by sending 0.1 ETH to the contract. When the owner of the contract decides, they can call the function `pickWinner` which will select a random player and award them with all of the ETH from the lottery.

Technical Spec for Lottery contract: 
- Anyone’s able to send a fixed amount of Ether to the contract’s address
- The address of a sender will be stored in a dynamic array called players. The same user can send more than one transaction to have more chances of winning. The same principle as in a classical lottery where you can buy as many tickets as you want at a fixed price per ticket
- The contract has an owner with special permission
- After there are at least 3 players, the owner can call a function that makes the contract pick a random player from the list which will be the winner 
- The contract transfers the entire balance to the winner’s address, the players array is reset and the lottery is now ready to play again


The `Lottery.sol` contract is full of comments with todo tasks. 
Please complete all of the todos listed in the comments in the Lottery contract, and then run `npx hardhat test` to check your work. 
There is a solution lecture at the end of section 2 on Udemy, which explains the contract line by line.