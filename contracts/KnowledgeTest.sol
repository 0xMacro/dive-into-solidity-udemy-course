//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract KnowledgeTest {
    string[] public tokens = ["BTC", "ETH"];
    address[] public players;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function transferAll(address receiver) external {
        require(msg.sender == owner, "ONLY_OWNER");
        (bool result, ) = receiver.call{value: getBalance()}("");
        require(result, "TRANSFER_FAILED");
    }

    function start() external {
        players.push(msg.sender);
    }

    function concatenate(
        string calldata str1,
        string calldata str2
    ) external pure returns (string memory) {
        return string(abi.encodePacked(str1, str2));
    }

    function changeTokens() external {
        string[] storage t = tokens;
        t[0] = "VET";
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
