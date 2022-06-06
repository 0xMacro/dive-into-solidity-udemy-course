//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract KnowledgeTest {
    string[] public tokens = ["BTC", "ETH"];
    address[] public players;

    function changeTokens() public view {
        string[] memory t = tokens;
        t[0] = "VET";
    }
}
