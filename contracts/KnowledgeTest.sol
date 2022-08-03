//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract KnowledgeTest {
    string[] public tokens = ["BTC", "ETH"];
    address[] public players;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeTokens() public {
        string[] storage t = tokens;
        t[0] = "VET";
        console.log(tokens[0], ",", tokens[1]);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function transferAll(address payable destination) public {
        require(msg.sender == owner, "ONLY_OWNER");
        uint256 balance = this.getBalance();
        destination.transfer(balance);
    }

    function start() public {
        players.push(msg.sender);
    }

    function concatenate(string memory s1, string memory s2)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(s1, s2));
    }

    receive() external payable {}
}
