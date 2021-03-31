// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../Core/ERC20.sol";

contract ERC20Bertio is ERC20 {
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) public ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  function burn(uint256 amount) public {
    _burn(msg.sender, amount);
  }

  function burnFrom(address account, uint256 amount) public {
    uint256 decreasedAllowance = allowance(account, _msgSender()).sub(amount, "ERC20: burn amount exceeds allowance");

    _approve(account, _msgSender(), decreasedAllowance);
    _burn(account, decreasedAllowance);
  }
}
