// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Factory contract deploys and stores implementations of Points-of-Sales
 *      each user is only available to deploy a single POS for each address.
 *      The factory stores the the required contracts for the POS to work.
 */
contract Factory is Ownable {

    // =============================================== Storage ========================================================

    /// @dev Returns the address of the user deployment.
    mapping (address => address) private deployments;

    /// @dev active boolean enable/disable POS deployments.
    bool public active;

    /// @dev swapContract is the contract used to automate coin-conversion on payment.
    address public swapContract;

    /// @dev tokensRegistry is the contract to whitelist tokens.
    address public tokensRegistry;

    // =============================================== Events ========================================================


    /// @dev Emitted by the `deploy` function
    /// @param user The address that deployed the POS.
    //  @param implementation The address of the POS deployment.
    event Deployed(address indexed user, address indexed implementation);

    // ============================================== Modifiers =======================================================

    /**
     * @dev Modifier that checks if `active` is enabled.
    */
    modifier onlyActive() {
        require(active, "Factory: not active");
        _;
    }

    // =============================================== Setters ========================================================

    /// @dev Constructor.
    /// @param swapContract_ The address of the proxy implementation of the `SwapContract` contract.
    /// @param tokensRegistry_ The address of the proxy implementation of the `TokenRegistry` contract.
    constructor(address swapContract_, address tokensRegistry_) {
        active = false;
        swapContract = swapContract_;
        tokensRegistry = tokensRegistry_;
    }

    /// @dev enables or disables the contract to deploy POS contracts.
    /// @param active_ Enable or disable the Factory contract
    function setActive(bool active_) external onlyOwner {
        active = active_;
    }

    /// @dev deploys a POS contract with the `msg.sender` as the owner.
    ///      It only requires the user to have no previous deployment.
    // TODO
    function deploy() external onlyActive {
        require(deployments[msg.sender] != address(0), "Factory: user already has a deployment");
    }

    // =============================================== Getters ========================================================

    /// @dev returns the address of the user POS.
    /// @param user_ User to query
    function getDeployment(address user_) public view returns(address) {
        return deployments[user_];
    }



}
