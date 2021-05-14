pragma solidity >= 0.6.0 ;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol" ;
import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";

contract RGANFT is ERC721URIStorage , VRFConsumerBase {

    bytes32 public keyHash;
    address public vrfCoordinator;
    uint256 internal fee;

    struct Artwork {
        uint256 random_value;
        string artworkName;
    }

    Artwork[] public artworks;

    // mappings for randomness
    mapping(bytes32 => string) requestToArtworkName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) public
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("RGANFT","RGAN")  {
        vrfCoordinator = _VRFCoordinator;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 Link
    }

    function requestNewRandomArtwork (uint256 userProvidedSeed, string memory name) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToArtworkName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        // extracting random values 
        uint256 newId = artworks.length;
        // creating new artwork 
        artworks.push(
            Artwork(
                randomNumber,
                requestToArtworkName[requestId]
            )
        );
        _safeMint(requestToSender[requestId], newId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId),
                "ERC721 : transfer caller is not owner nor approved");
        _setTokenURI(tokenId, _tokenURI);
    }

    function getArtworkCount() public view  returns(uint) {
        return artworks.length;
  }
}