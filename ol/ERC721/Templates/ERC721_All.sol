// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../Core/ERC721.sol";

contract ERC721All is ERC721 {
  
  constructor(
    string memory name,
    string memory symbol,
  ) ERC721(name, symbol) {
    
  }

  // function baseURI() public view returns (string memory) {
  //   return _baseURI();
  // }

  // function exists(uint256 tokenId) public view returns (bool) {
  //   return _exists(tokenId);
  // }

  // function mint(address to, uint256 tokenId) public onlyOwner {
  //   _mint(to, tokenId);
  // }
  
  // function safeMint(address to, uint256 tokenId) public onlyOwner {
  //   _safeMint(to, tokenId);
  // }
}
