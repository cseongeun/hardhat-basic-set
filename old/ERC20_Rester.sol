// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../Core/ERC20.sol";
import "../Extensions/ERC20Ownable.sol";
import "../Extensions/ERC20TimeLockable.sol";

contract ERC20Rester is ERC20TimeLockable, ERC20Ownable {
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) public ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  function lock(
    address account,
    uint256 amount,
    bytes32 reason,
    uint256 release
  ) public onlyOwner {
    _lock(account, amount, reason, release);
  }

  function transferWithLock(
    address account,
    uint256 amount,
    bytes32 reason,
    uint256 release
  ) public onlyOwner {
    _transferWithLock(account, amount, reason, release);
  }

  function extendLock(
    address account,
    bytes32 reason,
    uint256 time
  ) public onlyOwner {
    _extendLock(account, reason, time);
  }

  function increaseLockAmount(
    address account,
    bytes32 reason,
    uint256 amount
  ) public onlyOwner {
    _increaseLockAmount(account, reason, amount);
  }
}
