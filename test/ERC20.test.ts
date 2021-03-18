import { ethers, waffle } from 'hardhat'
import { Signer } from 'ethers';
import { expect } from 'chai';

import { ERC20Mock, ERC20Mock__factory } from '../src/types';

describe("ERC20Mock", () => {
  let token: ERC20Mock; 

  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();

    const tokenContract = await ethers.getContractFactory('ERC20Mock',
    owner) as ERC20Mock__factory;

    token = await tokenContract.deploy('name', 'symbol', 10000);
  })
});
