//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

error Unauthorized();
error InvalidAmount();
error InvaildCall();

contract BuyMeCoffee is Ownable {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // Address of contract deployer. Marked payable so that
    // we can withdraw to this address later.
    address payable _owner;

    string public _handle;

    // List of all memos received from coffee purchases.
    Memo[] memos;

    constructor(string memory __handle, address __owner) {
        // Store the address of the deployer as a payable address.
        // When we withdraw funds, we'll withdraw here.
        _owner = payable(__owner);
        _handle = __handle;
        transferOwnership(__owner);
    }

    /**
     * @dev fetches all stored memos
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /**
     * @dev buy a coffee for owner (sends an ETH tip and leaves a memo)
     * @param _name name of the coffee purchaser
     * @param _message a nice message from the purchaser
     */
    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        // Must accept more than 0 ETH for a coffee.
        if (msg.value <= 0) revert InvalidAmount();

        // Add the memo to storage!
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        // Emit a NewMemo event with details about the memo.
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public onlyOwner {
        _owner.transfer(address(this).balance);
    }

    /**
     * @dev check the balance of the owner
     */
    function checkBalance() public view onlyOwner returns (uint256 balance) {
        return address(this).balance;
    }

    /**
     * @dev check if the owner
     */
    function checkMsgSender() public view onlyOwner returns (address) {
        return _msgSender();
    }

    /**
     * @dev set receive function
     */
    receive() external payable {
        buyCoffee("default anon", "here's a coffee");
    }

    /**
     * @dev set fallback function
     */
    fallback() external {
        revert InvaildCall();
    }
}
