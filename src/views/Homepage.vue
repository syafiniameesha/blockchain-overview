<template>
    <div class="app">

        <!-- HERO -->
        <section class="hero">
            <p class="tag">BLOCKCHAIN</p>
            <h1>Everything About<br />Blockchain</h1>
            <p class="subtitle">
                Understand blockchain, its benefits, and how different
                blockchain platforms compare.
            </p>
        </section>

        <!-- WHAT IS BLOCKCHAIN -->
        <section class="section">
            <div class="section-title">
                <span>01</span>
                <h2>What is Blockchain?</h2>
            </div>

            <p>
                Blockchain is a decentralized digital system that records
                transactions securely across multiple computers.
            </p>

            <div class="flow">
                <div class="box">Transaction</div>
                <span>→</span>
                <div class="box">Block</div>
                <span>→</span>
                <div class="box">Blockchain</div>
            </div>
        </section>

        <!-- BENEFITS -->
        <section class="section">
            <div class="section-title">
                <span>02</span>
                <h2>Benefits of Blockchain</h2>
            </div>

            <div class="benefits">
                <div class="benefit">
                    <h3>🔐 Secure</h3>
                    <p>Protects transaction records using cryptography.</p>
                </div>

                <div class="benefit">
                    <h3>👀 Transparent</h3>
                    <p>Transactions can be verified and traced.</p>
                </div>

                <div class="benefit">
                    <h3>📝 Immutable</h3>
                    <p>Recorded transactions are difficult to alter.</p>
                </div>

                <div class="benefit">
                    <h3>🤖 Automated</h3>
                    <p>Smart contracts can automatically execute rules.</p>
                </div>
            </div>
        </section>

        <!-- COMPARISON -->
        <section class="section">
            <div class="section-title">
                <span>03</span>
                <h2>Blockchain Comparison</h2>
            </div>

            <div class="comparison">
                <div class="comparison-card">
                    <h3>Bitcoin</h3>
                    <p>Digital payments</p>
                    <strong>~$0.50–$5+</strong>
                    <small>Transaction Cost</small>
                </div>

                <div class="comparison-card recommended">
                    <span class="recommended-label">RECOMMENDED</span>
                    <h3>Polygon</h3>
                    <p>Smart Contracts</p>
                    <strong>~$0.001–$0.01</strong>
                    <small>Transaction Cost</small>
                </div>

                <div class="comparison-card">
                    <h3>Ethereum</h3>
                    <p>Smart Contracts & DApps</p>
                    <strong>~$0.01–$1+</strong>
                    <small>Transaction Cost</small>
                </div>

                <div class="comparison-card">
                    <h3>Solana</h3>
                    <p>Fast & Low-Cost Apps</p>
                    <strong>~$0.001</strong>
                    <small>Transaction Cost</small>
                </div>
            </div>
        </section>

        <!-- PROJECT EXAMPLE -->
        <section class="section example">
            <div class="section-title" style="color: #FFF;">
                <span>04</span>
                <h2>Example: Project Payment</h2>
            </div>

            <div class="payment-flow">
                <div>
                    <span>CLIENT</span>
                    <strong>RM 1,000</strong>
                </div>

                <span class="arrow">→</span>

                <div>
                    <span>SMART CONTRACT</span>
                    <strong>Contract Signed ✓</strong>
                </div>

                <span class="arrow">→</span>

                <div>
                    <span>PAYMENT</span>
                    <strong>RM 700</strong>
                </div>

                <span class="arrow">→</span>

                <div>
                    <span>REMAINING</span>
                    <strong>RM 300</strong>
                </div>
            </div>

            <div class="footer">
                <el-button type="primary" @click="handleNextPage()">Test</el-button>
            </div>

        </section>

    </div>
</template>

<script>
export default {
    name: "Homepage",

    data() {
        return {};
    },

    methods: {
        handleNextPage() {
            this.$router.push({ path: '/blockchain' });
        }
    },
};
</script>

<style lang="scss" scoped>
.app {
    min-height: 100vh;
    width: 100%;
    background: #FFF;
    color: #171717;
    overflow-x: hidden;
    overflow-y: visible;
}

:global(html),
:global(body),
:global(#app) {
    margin: 0;
    min-height: 100%;
    overflow-y: auto;
}

/* HERO */
.hero {
    min-height: 90dvh;
    padding: 60px 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #171717;

    .tag {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 4px;
        margin-bottom: 20px;
    }

    h1 {
        font-size: clamp(50px, 8vw, 110px);
        line-height: 0.95;
        margin: 0;
        letter-spacing: -4px;
    }

    .subtitle {
        max-width: 600px;
        margin-top: 35px;
        font-size: 18px;
        line-height: 1.6;
        color: #666;
    }
}

/* GENERAL SECTION */

.section {
    padding: 120px 10%;
    border-top: 1px solid #ddd;

    .section-title {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 50px;
        color: #171717;

        span {
            font-size: 14px;
            font-weight: 700;
            color: #999;
        }

        h2 {
            font-size: 42px;
            margin: 0;
            letter-spacing: -1px;
        }
    }

    > p {
        max-width: 800px;
        font-size: 24px;
        line-height: 1.5;
        color: #555;
    }
}

/* BLOCKCHAIN FLOW */

.flow {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-top: 60px;

    .box {
        padding: 25px 40px;
        background: #fff;
        border: 1px solid #ddd;
        font-weight: 600;
    }

    span {
        font-size: 25px;
        color: #999;
    }
}

/* BENEFITS */

.benefits {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.benefit {
    background: #fff;
    padding: 35px;
    border: 1px solid #ddd;

    h3 {
        margin: 0 0 15px;
        font-size: 22px;
    }

    p {
        margin: 0;
        color: #666;
        line-height: 1.5;
    }
}

/* COMPARISON */

.comparison {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.comparison-card {
    position: relative;
    padding: 35px 25px;
    background: #fff;
    border: 1px solid #ddd;

    h3 {
        font-size: 25px;
        margin: 0 0 15px;
    }

    p {
        color: #666;
        min-height: 45px;
    }

    strong {
        display: block;
        margin-top: 30px;
        font-size: 20px;
    }

    small {
        color: #999;
    }
}

.recommended {
    border: 2px solid #171717;

    .recommended-label {
        display: inline-block;
        margin-bottom: 20px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1px;
    }
}

/* PAYMENT */

.example {
    background: #171717;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: max-content;

    .footer {
        display: flex;
        align-items: end;
        justify-content: end;
        float: right;

        button {
            min-width: 100px;
        }
    }

    .section-title span {
        color: #777;
    }
}

.payment-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 40px;

    > div {
        display: flex;
        flex-direction: column;
        gap: 12px;

        span {
            font-size: 11px;
            letter-spacing: 2px;
            color: #FFF;
        }

        strong {
            font-size: 25px;
        }
    }

    .arrow {
        font-size: 30px;
        color: #FFF;
    }

}

/* RESPONSIVE */

@media (max-width: 900px) {
    .comparison {
        grid-template-columns: repeat(2, 1fr);
    }

    .payment-flow {
        flex-direction: column;
        align-items: flex-start;

        .arrow {
            transform: rotate(90deg);
        }
    }
}

@media (max-width: 600px) {
    .hero,
    .section {
        padding: 80px 25px;
    }

    .benefits,
    .comparison {
        grid-template-columns: 1fr;
    }

    .flow {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>