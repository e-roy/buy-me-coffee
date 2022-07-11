//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BuyMeCoffee.sol";

error NoPayable();

contract CoffeeFactory {
    // BuyMeCoffee[] public coffees;

    struct CoffeeFactoryStruct {
        uint256 _coffeeIndex;
        address _contract;
        address _owner;
        string _handle;
    }

    mapping(uint256 => CoffeeFactoryStruct) public allCoffeeContracts;

    mapping(string => address) public searchHandles;

    uint256 public numCoffeeContracts;

    function createCoffeeContract(string calldata _handle) public {
        // Create a new coffee contract
        BuyMeCoffee newCoffeeContract = new BuyMeCoffee(_handle, msg.sender);

        // Add the new coffee contract to the mapping
        allCoffeeContracts[numCoffeeContracts] = (
            CoffeeFactoryStruct(
                numCoffeeContracts,
                address(newCoffeeContract),
                msg.sender,
                _handle
            )
        );

        searchHandles[_handle] = address(newCoffeeContract);

        // Increment the number of coffee contracts
        numCoffeeContracts++;

        // Emit the event
        // emit NewCoffeeContract(msg.sender, newCoffeeContract._coffeeIndex, newCoffeeContract._contract, newCoffeeContract._owner);
    }

    /**
     * @dev set receive function
     */
    receive() external payable {
        revert NoPayable();
    }

    /**
     * @dev set fallback function
     */
    fallback() external {
        revert InvaildCall();
    }
}
