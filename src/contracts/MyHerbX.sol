pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract MyHerbX is ERC721 {
    address public owner;
    uint256 public nftPrice;
    string public baseURI;
    
    constructor(string memory _name, string memory _symbol, string memory _baseURI, uint256 _nftPrice) ERC721(_name, _symbol) {
        owner = msg.sender;
        baseURI = _baseURI;
        nftPrice = _nftPrice;
    }

    function buyNFT() public payable {
        require(msg.value == nftPrice, "Invalid payment amount");
        _mint(msg.sender, totalSupply() + 1);
    }

    function sellNFT(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        _burn(_tokenId);
        payable(msg.sender).transfer(nftPrice);
    }

    function setPrice(uint256 _nftPrice) public {
        require(msg.sender == owner, "Only the owner can set the NFT price");
        nftPrice = _nftPrice;
    }

    function setBaseURI(string memory _baseURI) public {
        require(msg.sender == owner, "Only the owner can set the base URI");
        baseURI = _baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
