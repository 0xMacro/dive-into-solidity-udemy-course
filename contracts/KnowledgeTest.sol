//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract KnowledgeTest {
    string[] public tokens = ["BTC", "ETH"];
    address[] public players;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }

    function changeTokens() external {
        tokens[0] = "VET";
    }

    receive() external payable {}

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function transferAll(address recepient) external onlyOwner {
        uint256 totalBalance = address(this).balance;
        (bool res, ) = recepient.call{value: totalBalance}("");
        require(res);
    }

    function start() external {
        players.push(msg.sender);
    }

    function concatenate(string memory a, string memory b) external pure returns(string memory) {
        // string.concat(a,b);
        return string(abi.encodePacked(a, b));
    }
}
