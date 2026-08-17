<template>
    <div class="app">
        <div class="header">
            <el-button plain @click="handleGoBack()">← Go Back</el-button>
            <div class="network">
                <span class="dot" :class="{ offline: !wallet.connected }"></span>
                Polygon Amoy Testnet
            </div>
        </div>

        <section class="hero">
            <div>
                <span class="eyebrow">BLOCKCHAIN TESTING</span>
                <h1>Polygon<br />Test Environment</h1>
                <p>Connect your wallet and test blockchain transactions directly from the frontend.</p>
            </div>
            <div class="hero-card">
                <span>NETWORK</span>
                <strong>Polygon Amoy</strong>
                <small>Chain ID: 80002</small>
            </div>
        </section>

        <section class="section">
            <div class="section-header">
                <div>
                    <span class="number">01</span>
                    <h2>Wallet</h2>
                </div>
                <el-button v-if="!wallet.connected" type="primary" @click="connectWallet">
                    Connect MetaMask
                </el-button>
                <el-button v-else plain @click="disconnectWallet">Disconnect</el-button>
            </div>

            <div class="wallet-card">
                <div class="wallet-icon">◇</div>
                <div class="wallet-info">
                    <span class="label">WALLET ADDRESS</span>
                    <strong v-if="wallet.connected">{{ shortenAddress(wallet.address) }}</strong>
                    <strong v-else>Not connected</strong>
                    <span v-if="wallet.connected" class="address">{{ wallet.address }}</span>
                </div>
                <div class="wallet-balance">
                    <span class="label">POL BALANCE</span>
                    <strong>{{ wallet.balance }} POL</strong>
                </div>
            </div>

            <div v-if="wallet.connected && !wallet.correctNetwork" class="network-warning">
                <strong>Wrong Network</strong>
                <span>Please switch MetaMask to Polygon Amoy Testnet.</span>
                <el-button size="small" type="warning" @click="switchToAmoy">Switch to Amoy</el-button>
            </div>
        </section>

        <section class="section">
            <div class="section-header">
                <div>
                    <span class="number">02</span>
                    <h2>Test Transaction</h2>
                </div>
            </div>

            <div class="transaction-card">
                <div class="form-row">
                    <div class="form-group">
                        <label>FROM</label>
                        <div class="readonly">
                            {{ wallet.connected ? shortenAddress(wallet.address) : "Connect wallet first" }}
                        </div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="form-group">
                        <label>TO</label>
                        <el-input
                            v-model="transaction.to"
                            placeholder="Recipient wallet address"
                            :disabled="!wallet.connected || !wallet.correctNetwork"
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>AMOUNT</label>
                        <el-input
                            v-model="transaction.amount"
                            placeholder="0.001"
                            type="number"
                            min="0"
                            step="0.001"
                            :disabled="!wallet.connected || !wallet.correctNetwork"
                        >
                            <template #append>POL</template>
                        </el-input>
                    </div>
                    <div class="form-group">
                        <label>NETWORK</label>
                        <div class="readonly">Polygon Amoy Testnet</div>
                    </div>
                </div>

                <el-button
                    class="send-button"
                    type="primary"
                    :disabled="!wallet.connected || !wallet.correctNetwork"
                    :loading="transaction.loading"
                    @click="sendTransaction"
                >
                    {{ transaction.loading ? "Waiting for MetaMask..." : "Send Test Transaction" }}
                </el-button>

                <div v-if="transaction.loading" class="signing-message">
                    <span class="loading-dot"></span>
                    Please confirm the transaction in MetaMask.
                </div>
            </div>
        </section>

        <section v-if="transaction.status" class="section">
            <div class="section-header">
                <div>
                    <span class="number">03</span>
                    <h2>Transaction Result</h2>
                </div>
            </div>

            <div class="result-card" :class="transaction.status">
                <div class="result-icon">
                    <span v-if="transaction.status === 'success'">✓</span>
                    <span v-else-if="transaction.status === 'submitted'">✓</span>
                    <span v-else>!</span>
                </div>

                <div class="result-content">
                    <span class="label">STATUS</span>
                    <strong v-if="transaction.status === 'success'">Transaction Confirmed</strong>
                    <strong v-else-if="transaction.status === 'submitted'">Transaction Signed & Submitted</strong>
                    <strong v-else>Transaction Failed</strong>

                    <p v-if="transaction.hash">Transaction Hash</p>
                    <code v-if="transaction.hash">{{ transaction.hash }}</code>

                    <a
                        v-if="transaction.hash"
                        :href="`https://amoy.polygonscan.com/tx/${transaction.hash}`"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on PolygonScan →
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "BlockchainListing",
    data() {
        return {
            wallet: {
                connected: false,
                address: "",
                balance: "0.0000",
                chainId: "",
                correctNetwork: false,
            },
            transaction: {
                to: "0x309812c6159f57c0822103E41353729404354D16",
                amount: "0.001",
                loading: false,
                status: "",
                hash: "",
            },
        };
    },
    mounted() {
        this.setupMetaMaskListeners();
    },
    methods: {
        handleGoBack() {
            this.$router.back(-1);
        },

        async connectWallet() {
            if (!window.ethereum) {
                this.$message.error("MetaMask is not installed.");
                return;
            }
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                if (!accounts.length) return;

                this.wallet.address = accounts[0];
                this.wallet.connected = true;
                await this.checkNetwork();
                await this.getBalance();

                this.$message.success("Wallet connected.");
            } catch (error) {
                this.$message.error(error?.message || "Failed to connect wallet.");
            }
        },

        disconnectWallet() {
            this.wallet.connected = false;
            this.wallet.address = "";
            this.wallet.balance = "0.0000";
            this.wallet.chainId = "";
            this.wallet.correctNetwork = false;
            this.transaction.status = "";
            this.transaction.hash = "";
        },

        async checkNetwork() {
            if (!window.ethereum) return false;
            try {
                const chainId = await window.ethereum.request({ method: "eth_chainId" });
                this.wallet.chainId = chainId;
                this.wallet.correctNetwork = chainId.toLowerCase() === "0x13882";
                return this.wallet.correctNetwork;
            } catch (error) {
                console.error(error);
                return false;
            }
        },

        async switchToAmoy() {
            if (!window.ethereum) return;
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x13882" }],
                });
                await this.checkNetwork();
                await this.getBalance();
                this.$message.success("Switched to Polygon Amoy.");
            } catch (error) {
                console.error(error);
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x13882",
                                    chainName: "Polygon Amoy Testnet",
                                    nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
                                    rpcUrls: ["https://polygon-amoy.drpc.org"],
                                    blockExplorerUrls: ["https://amoy.polygonscan.com"],
                                },
                            ],
                        });
                        await this.checkNetwork();
                        await this.getBalance();
                    } catch (addError) {
                        console.error(addError);
                        this.$message.error("Failed to add Polygon Amoy.");
                    }
                } else {
                    this.$message.error(error?.message || "Failed to switch network.");
                }
            }
        },

        async getBalance() {
            if (!window.ethereum || !this.wallet.address) return;
            try {
                const balance = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [this.wallet.address, "latest"],
                });
                const balanceInPol = Number(BigInt(balance)) / 1e18;
                this.wallet.balance = balanceInPol.toFixed(4);
            } catch (error) {
                console.error(error);
            }
        },

        async sendTransaction() {
            if (!window.ethereum) {
                this.$message.error("MetaMask is not installed.");
                return;
            }
            if (!this.wallet.connected) {
                this.$message.warning("Please connect your wallet first.");
                return;
            }

            const correctNetwork = await this.checkNetwork();
            if (!correctNetwork) {
                this.$message.warning("Please switch to Polygon Amoy first.");
                return;
            }

            if (!this.transaction.to || !this.transaction.amount) {
                this.$message.warning("Please enter recipient and amount.");
                return;
            }

            try {
                this.transaction.loading = true;
                this.transaction.status = "";
                this.transaction.hash = "";

                const amount = Number(this.transaction.amount);
                if (!Number.isFinite(amount) || amount <= 0) {
                    this.$message.warning("Please enter a valid amount.");
                    return;
                }

                const amountWei = BigInt(Math.round(amount * 1e18));
                const amountHex = "0x" + amountWei.toString(16);

                const hash = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{ from: this.wallet.address, to: this.transaction.to, value: amountHex }],
                });

                this.transaction.hash = hash;
                this.transaction.status = "submitted";
                this.$message.success("Transaction signed and submitted!");

                await this.waitForTransaction(hash);

                this.transaction.status = "success";
                this.$message.success("Transaction confirmed!");
                await this.getBalance();
            } catch (error) {
                console.error("Transaction error:", error);
                if (error.code === 4001) {
                    this.$message.warning("Transaction rejected in MetaMask.");
                } else {
                    this.$message.error(error?.message || "Transaction failed.");
                }
                this.transaction.status = "error";
            } finally {
                this.transaction.loading = false;
            }
        },

        async waitForTransaction(hash) {
            let receipt = null;
            while (!receipt) {
                receipt = await window.ethereum.request({
                    method: "eth_getTransactionReceipt",
                    params: [hash],
                });
                if (!receipt) {
                    await new Promise((resolve) => setTimeout(resolve, 1500));
                }
            }
            if (receipt.status && receipt.status !== "0x1") {
                throw new Error("Transaction reverted.");
            }
            return receipt;
        },

        setupMetaMaskListeners() {
            if (!window.ethereum) return;

            window.ethereum.on("accountsChanged", async (accounts) => {
                if (!accounts.length) {
                    this.disconnectWallet();
                    return;
                }
                this.wallet.address = accounts[0];
                this.wallet.connected = true;
                await this.checkNetwork();
                await this.getBalance();
            });

            window.ethereum.on("chainChanged", async () => {
                await this.checkNetwork();
                await this.getBalance();
            });
        },

        shortenAddress(address) {
            if (!address) return "";
            return address.substring(0, 6) + "..." + address.substring(address.length - 4);
        },
    },
};
</script>

<style scoped lang="scss">
.app {
    min-height: 100dvh;
    width: 100%;
    background: #f8f8f5;
    color: #171717;
    overflow-x: hidden;
}

.header {
    padding: 25px 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
}

.network {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #67c23a;
}

.dot.offline {
    background: #999;
}

.hero {
    min-height: 65vh;
    padding: 80px 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
}

.eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    color: #888;
}

.hero h1 {
    font-size: clamp(50px, 7vw, 100px);
    line-height: 0.95;
    letter-spacing: -4px;
    margin: 25px 0;
}

.hero p {
    max-width: 550px;
    color: #666;
    font-size: 18px;
    line-height: 1.6;
}

.hero-card {
    min-width: 230px;
    padding: 35px;
    background: white;
    border: 1px solid #ddd;
}

.hero-card span,
.hero-card small {
    display: block;
    color: #999;
    font-size: 11px;
    letter-spacing: 2px;
}

.hero-card strong {
    display: block;
    font-size: 22px;
    margin: 15px 0;
}

.section {
    padding: 100px 10%;
    border-top: 1px solid #ddd;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.section-header > div {
    display: flex;
    align-items: center;
    gap: 18px;
}

.number {
    font-size: 12px;
    color: #999;
}

.section h2 {
    margin: 0;
    font-size: 38px;
    letter-spacing: -1px;
}

.wallet-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 25px;
    padding: 35px;
    background: white;
    border: 1px solid #ddd;
}

.wallet-icon {
    width: 55px;
    height: 55px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
}

.wallet-info,
.wallet-balance {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wallet-info strong,
.wallet-balance strong {
    font-size: 20px;
}

.label {
    font-size: 10px;
    letter-spacing: 2px;
    color: #999;
    font-weight: 700;
}

.address {
    font-size: 11px;
    color: #999;
    word-break: break-all;
}

.network-warning {
    margin-top: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    background: #fff7e6;
    border: 1px solid #f0d9a6;
}

.network-warning span {
    flex: 1;
    color: #8a6d3b;
    font-size: 13px;
}

.transaction-card {
    padding: 40px;
    background: white;
    border: 1px solid #ddd;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 30px 1fr;
    gap: 20px;
    align-items: end;
    margin-bottom: 25px;
}

.form-row + .form-row {
    grid-template-columns: 1fr 1fr;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-group label {
    font-size: 10px;
    letter-spacing: 2px;
    color: #999;
    font-weight: 700;
}

.readonly {
    min-height: 40px;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid #dcdfe6;
    color: #666;
    display: flex;
    align-items: center;
}

.arrow {
    text-align: center;
    font-size: 20px;
    color: #999;
}

.send-button {
    margin-top: 10px;
}

.signing-message {
    margin-top: 20px;
    padding: 15px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #666;
    font-size: 13px;
}

.loading-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 8px;
    border-radius: 50%;
    background: #67c23a;
}

.result-card {
    display: flex;
    gap: 25px;
    padding: 35px;
    background: white;
    border: 1px solid #ddd;
}

.result-card.success {
    border-color: #67c23a;
}

.result-card.submitted {
    border-color: #409eff;
}

.result-card.error {
    border-color: #f56c6c;
}

.result-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    font-size: 22px;
}

.result-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.result-content strong {
    font-size: 22px;
}

.result-content p {
    margin: 15px 0 0;
    color: #999;
}

.result-content code {
    word-break: break-all;
    font-size: 12px;
}

.result-content a {
    margin-top: 10px;
    color: #409eff;
    font-size: 13px;
}

@media (max-width: 900px) {
    .hero {
        flex-direction: column;
        align-items: flex-start;
    }

    .wallet-card {
        grid-template-columns: auto 1fr;
    }

    .wallet-balance {
        grid-column: 2;
    }

    .payment-flow {
        flex-direction: column;
        align-items: flex-start;
    }

    .payment-arrow {
        transform: rotate(90deg);
    }

    .network-warning {
        flex-wrap: wrap;
    }
}

@media (max-width: 600px) {
    .section,
    .hero,
    .project-section {
        padding-left: 25px;
        padding-right: 25px;
    }

    .form-row,
    .form-row + .form-row {
        grid-template-columns: 1fr;
    }

    .arrow {
        display: none;
    }

    .hero h1 {
        letter-spacing: -2px;
    }
}
</style>