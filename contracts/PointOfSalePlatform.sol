// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";
import "./PointOfSale.sol";

contract PointOfSalePlatform is Ownable {

    bool public active;

    constructor() {
        active = false;
    }

    function setActive(bool _active) public onlyOwner {
        active = _active;
    }

    function deployNewStore(
        address _router,            // DEX for sales router address
        address _factory,           // DEX factory to fetch pairs
        address _receiveToken,      // Token that owner will receive
        address _prefToken,         // Prefered token for discounts and buyBackAndBurn
        address _weth,              // WETH address
        uint256 _fee,               // Fee to charge of each shop purchase
        uint256 _feeForPrefToken    // Fee to charge if users are using prefToken
    ) public returns(PointOfSale) {
        require(active, "POS Platform is not active");
        PointOfSale platform = new PointOfSale(_router, _factory, _receiveToken, _prefToken, _weth, msg.sender, _fee, _feeForPrefToken);
        return platform;
    }
}
