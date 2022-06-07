const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther, formatEther } = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");

describe("Knowledge Test", function () {
  // Declaring outside of the tests to have access inside them
  let owner, addr1, addr2, addrs, lottery;
  let provider = waffle.provider;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Knowledge = await ethers.getContractFactory("KnowledgeTest");

    // Hardhat always deploys with the first address from getSigners(), but we'll be explicit here
    contract = await Knowledge.connect(owner).deploy();
  });

  it("Has an owner variable that is public", async () => {
    await contract.owner();
  });

  it("Initializes the owner variable to the deployer", async () => {
    const contractOwner = await contract.owner();
    expect(contractOwner).to.be.eq(owner.address);
  });

  it("changeTokens() changes the state of the variable 'tokens'", async () => {
    await contract.changeTokens();
    const firstToken = await contract.tokens(0);
    expect(firstToken).to.be.eq("VET");
  });

  it("Contract can receive ETH", async () => {
    await addr1.sendTransaction({
      to: contract.address,
      // parseEther("0.1") will return "100000000000000000" (which is the equivalent in wei)
      value: parseEther("0.1"),
    });
  });

  it("Gets the balance of the contract", async () => {
    await addr1.sendTransaction({
      to: contract.address,
      // parseEther("0.1") will return "100000000000000000" (which is the equivalent in wei)
      value: parseEther("0.1"),
    });

    const contractBalance = await provider.getBalance(contract.address);

    const fetchedContractBalance = await contract.getBalance();

    expect(contractBalance).to.be.eq(fetchedContractBalance);
  });

  it("transferAll() sends all the ether in the contract to another address", async () => {
    await addr1.sendTransaction({
      to: contract.address,
      value: parseEther("0.1"),
    });

    await expect(
      await contract.transferAll(addr2.address)
    ).to.changeEtherBalances(
      [contract, addr2],
      [parseEther("-0.1"), parseEther("0.1")]
    );
  });

  it("Only owner can call transferAll()", async () => {
    await expect(
      contract.connect(addr1).transferAll(addr1.address)
    ).to.be.revertedWith("ONLY_OWNER");
  });

  it("start() adds the calling address to 'players'", async () => {
    await contract.start();
    const firstPlayer = await contract.players(0);

    expect(firstPlayer).to.be.eq(owner.address);
  });

  it("concatenate() returns two strings concatenated", async () => {
    const concatenation = await contract.concatenate("aaa", "bbb");

    expect(concatenation).to.be.eq("aaabbb");
  });
});
