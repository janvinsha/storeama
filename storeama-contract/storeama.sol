// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Storeama {
 using Counters for Counters.Counter;
 Counters.Counter private _documentIds;
 mapping(uint256 => Document) private documents;

struct Document{
     string name;
        string docType;
    string description;
      string url;
      address user;
    }
    
    event DocumentCreated (
      string name,
       string docType,
    string description,
      string url,
      address user
    );

    constructor() {
    }
      function createDocument(string memory name,string memory docType,string memory description,
      string memory url
    ) public payable {
      _documentIds.increment();
      uint256 newDocumentId = _documentIds.current();
    
      documents[newDocumentId] =Document(
        name,
       docType ,
        description,
        url,
        msg.sender
       );
        emit DocumentCreated(  name,
       docType ,
        description,
        url,
        msg.sender);
    }

    function getDocuments(address tempAddress) public view returns(Document[] memory){
   uint documentCount = _documentIds.current();
      uint currentIndex = 0;
      Document[] memory tempDocuments = new Document[](documentCount);
      for (uint i = 0; i < documentCount; i++) {
          if(documents[i + 1].user == tempAddress){
          uint currentId = i + 1;
          Document memory currentDocument = tempDocuments[currentId];
          tempDocuments[currentIndex] = currentDocument;
          currentIndex += 1;
          }
      }
      return tempDocuments;
    }

        function getDocument(uint256 id) public view returns(Document memory){
        return documents[id];
     }


}

