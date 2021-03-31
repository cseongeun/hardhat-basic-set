// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../Core/ERC20.sol";
import "../Extensions/ERC20Freezable.sol";
import "../Extensions/ERC20Ownable.sol";

contract ERC20Marettin is ERC20Freezable, ERC20Ownable {
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) public ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  function freeze(address account) public onlyOwner {
    _freeze(account);
  }

  function unfreeze(address account) public onlyOwner {
    _unfreeze(account);
  }
}
