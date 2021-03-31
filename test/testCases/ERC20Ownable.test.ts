import { expect } from 'chai';
import { SignerWithAddress, Contract } from '../../utils';

export function ERC20Ownable(token: Contract, accounts: SignerWithAddress[]) {

  describe('ERC20Ownable', function ()  {
    it('', async function () {
      console.log(accounts);
      
    })
    // it('Extensions: Has an owner', async function () {
    //   expect(await token.owner(), owner.address);
    // })
    // it('Extensions: Changes owner after transfer ownership', async function () {
    //   await token.connect(owner).transferOwnership(user1.address);
    //   expect(await token.owner(), user1.address);
    // })
    // it('Extensions: Prevents non-owner from transfer ownership', async function () {
    //   await expect(token.connect(owner).transferOwnership(user1.address))
    //     .to.be.revertedWith('Ownable: caller is not the owner');
    // })
    // it('Extensions: Prevents non-address to transfer ownership', async function () {
    //   await expect(token.connect(owner).transferOwnership(user1.address))
    //     .to.be.revertedWith('Ownable: new owner is the zero address') 
    // })
  })
}