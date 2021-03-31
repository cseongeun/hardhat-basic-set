import { ethers } from 'hardhat';
import { expect } from 'chai';

import { SignerWithAddress, Contract } from '../utils';
import { BigNumber } from '@ethersproject/bignumber';
import { ERC20Ownable } from './testCases/ERC20Ownable.test';


describe("ERC20Mock", function () {
  const MAIN_CONTRACT = 'ERC20All'; 

  // Players 
  let accounts: SignerWithAddress[];
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;

  // Token Init Property
  let token: Contract; 
  let tokenName: string = 'ERC20';
  let tokenSymbol: string = 'ERC';
  let tokenDecimals: number = 18;
  let tokenInitialSupply = BigNumber.from(10000000).mul(BigNumber.from(10).pow(tokenDecimals));

  before(async function () {
    const accounts = await ethers.getSigners();
    [owner, user1, user2, user3] = accounts;
  })

  beforeEach(async function () {
    const tokenContract = await ethers.getContractFactory(MAIN_CONTRACT, owner) 
    token = await tokenContract.deploy(tokenName, tokenSymbol, tokenInitialSupply.toString());
  })

  describe('ERC20 Metadata', function () {
    it('Optional: returns the name of the token', async function () {
      expect(await token.name()).to.equal(tokenName);
    })
    it('Optional: returns the symbol of the token', async function () {
      expect(await token.symbol()).to.equal(tokenSymbol);
    })
    it('Optional: returns the number of decimals the token uses', async function () {
      expect(await token.decimals()).to.equal(tokenDecimals);
    })
  })
  describe('ERC20 Standard', function () {
    it('Required: Returns the total token supply.', async function () {
      expect(await token.totalSupply()).to.equal(tokenInitialSupply);
    })  
    it('Required: Returns the account balance of another account with address _owner.', async function () {
      expect(await token.balanceOf(owner.address)).to.equal(tokenInitialSupply);
    })
    it('Required: Transfers _value amount of tokens to address _to, and MUST fire the Transfer event.', async function () {          
      await expect(() => token.connect(owner).transfer(user1.address, 1))
        .to.changeTokenBalances(token, [owner, user1], [-1, 1])

      await expect(token.connect(owner).transfer(user1.address, 1))
        .to.emit(token, 'Transfer')
        .withArgs(owner.address, user1.address, 1);
    })
    it('Required: Transfers _value amount of tokens from address _from to address _to, and MUST fire the Transfer event.', async function () {
      await token.connect(owner).approve(user1.address, 1);
      await expect(() => token.connect(user1).transferFrom(owner.address, user2.address, 1))
        .to.changeTokenBalances(token, [owner, user1, user2], [-1, 0, 1]);

      await token.connect(owner).approve(user1.address, 1);
      await expect(token.connect(user1).transferFrom(owner.address, user2.address, 1))
        .to.emit(token, 'Transfer')
        .withArgs(owner.address, user2.address, 1);
    })
    it('Required: Returns the amount which _spender is still allowed to withdraw from _owner.', async function () {
      expect(await token.allowance(owner.address, user1.address)).to.equal(0);
    })
    it('Required: Allows _spender to withdraw from your account multiple times, up to the _value amount.', async function () {
      await token.connect(owner).approve(user1.address, 1)
      expect(await token.allowance(owner.address, user1.address)).to.equal(1);

      await expect(token.connect(owner).approve(user1.address, 1))
        .to.emit(token, 'Approval')
        .withArgs(owner.address, user1.address, 1);
    })
  })
  describe('ERC20 Recommend', function () {
    it('Recommend: Increase the amount of tokens that an owner allowed to a spender, and fire the Approval event', async function () {
      await token.connect(owner).approve(user1.address, 1);
      
      await expect(token.connect(owner).increaseAllowance(user1.address, 1))
        .to.emit(token, 'Approval')
        .withArgs(owner.address, user1.address, 2);
      expect(await token.allowance(owner.address, user1.address)).to.equal(2);
    })
    it('Recommend: Decrease the amount of tokens that an owner allowed to a spender. and fire the Approval event', async function () {
      await token.connect(owner).approve(user1.address, 1);
      await expect(token.connect(owner).decreaseAllowance(user1.address, 1))
        .to.emit(token, 'Approval')
        .withArgs(owner.address, user1.address, 0);
      expect(await token.allowance(owner.address, user1.address)).to.equal(0);
    })
  })

  describe('ERC20 Extensions', function () {
    ERC20Ownable(token, accounts);
  })

});
