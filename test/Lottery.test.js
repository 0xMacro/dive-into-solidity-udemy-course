const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther, formatEther } = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");

describe("Lottery Contract", function () {
  let owner, addr1, addr2, lottery;
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
      await expect(lottery.connect(addr1).getBalance()).to.be.revertedWith(
        "ONLY_OWNER"
      );
    });
  });

  describe("Playing", () => {
    it("Allows a player to enter", async () => {
      await addr1.sendTransaction({
        to: lottery.address,
        // parseEther("0.1") will return "100000000000000000" (which is the equivalent in wei)
        value: parseEther("0.1"),
      });

      // Checking if the contract's balance increased
      const newBalance = await lottery.getBalance();
      expect(newBalance).to.be.equal(parseEther("0.1"));

      // Public getters generated for arrays require an index to be passed, so we'll check the 0 index (where this new player should be)
      const newPlayer = await lottery.players(0);
      expect(newPlayer).to.be.equal(addr1.address);
    });

    it("Can't pick a winner if less than 4 players", async () => {
      await addr1.sendTransaction({
        to: lottery.address,
        value: parseEther("0.1"),
      });
      await addr2.sendTransaction({
        to: lottery.address,
        value: parseEther("0.1"),
      });
      await expect(lottery.pickWinner()).to.be.revertedWith(
        "NOT_ENOUGH_PLAYERS"
      );
    });

    it("Can pick a winner and winner gets paid", async () => {
      // Make 4 players enter the game
      for (let i = 0; i < 4; i++) {
        await addrs[i].sendTransaction({
          to: lottery.address,
          value: parseEther("0.1"),
        });
      }

      await lottery.pickWinner();
      const winner = await lottery.gameWinners(0);

      // The winner should be one of the 4 players
      expect(addrs.slice(0, 4).map((player) => player.address)).to.include(
        winner
      );

      const winnerBalance = await provider.getBalance(winner);
      // With hardhat, by default, all test signers have 10000 ETH, so we check if the winner has more than that
      expect(winnerBalance.gt(BigNumber.from(parseEther("10000")))).to.be.true;
    });
  });
});
