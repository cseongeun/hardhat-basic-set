// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../Core/ERC20.sol";
import "../Extensions/ERC20Ownable.sol";
import "../Extensions/ERC20Pausable.sol";
import "../Extensions/ERC20Freezable.sol";
import "../Extensions/ERC20TimeLockable.sol";

contract ERC20All is ERC20Ownable, ERC20Pausable, ERC20Freezable, ERC20TimeLockable {
  
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) public ERC20(name, symbol) {
    _mint(_msgSender(), initialSupply);
  }

  /* 토큰 발행 - 오너 */
  function mint(uint256 amount) public onlyOwner {
    _mint(_msgSender(), amount);
  }

  /* 토큰 소각 */
  function burn(uint256 amount) public {
    _burn(_msgSender(), amount);
  }

  /* 토큰 동결 */
  function pause() public onlyOwner {
    _pause();
  }

  /* 토큰 동결 해제 */
  function unpause() public onlyOwner {
    _unpause();
  }

  /* 주소 동결 */
  function freeze(address account) public onlyOwner {
    _freeze(account);
  }

  /* 주소 동결 해제 */
  function unfreeze(address account) public onlyOwner {
    _unfreeze(account);
  }

  /* 락업 토큰 전송 */
  function transferWithLock(address account, uint256 amount, bytes32 reason, uint256 release) public onlyOwner {
    _transferWithLock(account, amount, reason, release);
  }

  /* 락업 기간 연장 */
  function extendLock(address account, bytes32 reason, uint256 time) public onlyOwner {
    _extendLock(account, reason, time);
  }

  /* 락업 수량 증액 */
  function increaseLockAmount(address account, bytes32 reason, uint256 amount) public onlyOwner {
    _increaseLockAmount(account, reason, amount);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Pausable, ERC20Freezable, ERC20TimeLockable) {
    super._beforeTokenTransfer(from, to, amount);
  }
}
