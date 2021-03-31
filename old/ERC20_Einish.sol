// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../Core/ERC20.sol";
import "../Extensions/ERC20Pausable.sol";
import "../Extensions/ERC20Ownable.sol";

contract ERC20Einish is ERC20Pausable, ERC20Ownable {
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) public ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }
}
