// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ITokensRegistry.sol";

/**
 * @dev TokenRegistry is the contract in charge of whitelist tokens usable
 *      by POS contracts to accept as payments.
 *      This tokens are usually with enough liquidity to make sure token conversion
 *      is possible without any significant loss for users.
 */
contract TokensRegistry is Ownable {

    // =============================================== Storage ========================================================

    /// @dev tokens array available for usage across the all the POS.
    address[] private _tokens;

    /// @dev tokens available for usage across the all the POS.
    mapping (address => bool) private _supported;

    /// @dev tokens paused for usage across the all the POS.
    mapping (address => bool) private _paused;

    // =============================================== Events =========================================================

    /// @dev Emitted by the `addToken` function
    /// @param token The address the token added to the registry
    event TokenAdded(address indexed token);

    /// @dev Emitted by the `pauseToken` function
    /// @param token The address the token paused on the registry
    event TokenPaused(address indexed token);

    /// @dev Emitted by the `resumeToken` function
    /// @param token The address the token resumed on the registry
    event TokenResumed(address indexed token);

    // =============================================== Setters ========================================================

    /// @dev adds a new token to the registry.
    ///      requires the token to not be supported before addition.
    /// @param token_ The address the token to add to the registry.
    function addToken(address token_) external onlyOwner {
        require(!isSupported(token_), "TokenRegistry: the token is already supported");
        _tokens.push(token_);
        _supported[token_] = true;
        emit TokenAdded(token_);
    }

    /// @dev pauses a previously added token.
    ///      requires the token to be supported.
    /// @param token_ The address the token to pause.
    function pauseToken(address token_) external onlyOwner {
        require(isSupported(token_), "TokenRegistry: the token is not supported");
        _paused[token_] = true;
        emit TokenPaused(token_);
    }

    /// @dev pauses a previously added token.
    ///      requires the token to be supported and to be paused.
    /// @param token_ The address the token to resume.
    function resumeToken(address token_) external onlyOwner {
        require(isSupported(token_), "TokenRegistry: the token is not supported");
        require(_paused[token_], "TokenRegistry: the token is not paused");
        _paused[token_] = false;
        emit TokenResumed(token_);
    }

    // =============================================== Getters ========================================================

    /// @dev returns all supported tokens.
    function getSupportedTokens() public view returns (address[] memory) {
        return _tokens;
    }

    /// @dev returns true if provided token is supported.
    /// @param token_ Address of the token to query.
    function isSupported(address token_) public view returns (bool) {
        return _supported[token_];
    }

    /// @dev returns true if provided token is supported and active.
    /// @param token_ Address of the token to query.
    function isActive(address token_) public view returns (bool) {
        return isSupported(token_) && !_paused[token_];
    }

}
