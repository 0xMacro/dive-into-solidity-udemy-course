const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther, formatEther } = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");

describe("Lottery Contract", function () {
  // Declaring outside of the tests to have access inside them
  let owner, addr1, addr2, addrs, lottery;
  let provider = waffle.provider;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Knowledge = await ethers.getContractFactory("Knowledge");

    // Hardhat always deploys with the first address from getSigners(), but we'll be explicit here
    knowledge = await Knowledge.connect(owner).deploy();
  });

  it("Has a setter and getter for the supply state variable", async () => {
      
  })
});
