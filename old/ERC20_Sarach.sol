// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../Core/ERC20.sol";
import "../Extensions/ERC20Ownable.sol";

contract ERC20Sarach is ERC20, ERC20Ownable {
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) public ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  function mint(uint256 amount) public onlyOwner {
    _mint(msg.sender, amount);
  }

  function burn(uint256 amount) public {
    _burn(msg.sender, amount);
  }
}
