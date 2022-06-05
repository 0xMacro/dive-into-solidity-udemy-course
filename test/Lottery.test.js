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
    const Lottery = await ethers.getContractFactory("Lottery");

    // Hardhat always deploys with the first address from getSigners(), but we'll be explicit here
    lottery = await Lottery.connect(owner).deploy();
  });

  describe("Only owner", () => {
    it("Only owner can pick a winner", async () => {
      await expect(lottery.connect(addr1).pickWinner()).to.be.revertedWith(
        "ONLY_OWNER"
      );
    });

    it("Only owner can call getBalance", async () => {
      // Delete this line
      assert.fail();
    });
  });

  describe("Playing", () => {
    it("Reverts if not exactly 0.1 ETH", async () => {
      // Delete this line
      assert.fail();
    });

    it("Allows a player to enter", async () => {
      await addr1.sendTransaction({
        to: lottery.address,
        // parseEther("0.1") will return "100000000000000000" (which is the equivalent in wei)
        value: parseEther("0.1"),
      });

      // TODO: Check if the contract's balance increased
      let newBalance;
      expect(newBalance).to.be.equal(parseEther("0.1"));

      // TODO: Check if the winner got added to the winners array
      // Public getters generated for arrays require an index to be passed, so check the 0 index (where this new player should be)
      let newPlayer;
      expect(newPlayer).to.be.equal(addr1.address);
    });

    it("Can't pick a winner if less than 4 players", async () => {
      // Delete this line
      assert.fail();
    });

    it("Can pick a winner and winner gets paid", async () => {
      // Make 4 players enter the game
      for (let i = 0; i < 4; i++) {}

      await lottery.pickWinner();

      // TODO: Get the lottery winner
      let winner;

      // TODO: Check if the winner is one of the 4 players

      const winnerBalance = await provider.getBalance(winner);
      // TODO: With hardhat, by default, all test signers have 10000 ETH, so check if the winner has more than that
    });
  });
});
