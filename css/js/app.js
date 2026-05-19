// ============================================================
//  钱包连接逻辑
// ============================================================

let isConnected = false;
let currentAccount = null;
let mockBalance = 12.5;

function generateMockAddress() {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * 16)];
    }
    return address;
}

function formatAddress(address) {
    if (!address) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

function toggleWallet() {
    if (isConnected) {
        disconnectWallet();
    } else {
        connectWallet();
    }
}

function connectWallet() {
    showToast('正在连接钱包...', 'info');
    setTimeout(() => {
        const address = generateMockAddress();
        currentAccount = address;
        isConnected = true;
        updateWalletUI();
        showToast('钱包连接成功!', 'success');
    }, 800);
}

function disconnectWallet() {
    isConnected = false;
    currentAccount = null;
    updateWalletUI();
    showToast('已断开钱包连接', 'info');
}

function updateWalletUI() {
    const btn = document.getElementById('walletConnectBtn');
    const dot = document.getElementById('walletDot');
    const status = document.getElementById('walletStatus');

    if (isConnected && currentAccount) {
        btn.classList.add('connected');
        dot.classList.add('connected-dot');
        status.textContent = formatAddress(currentAccount);
    } else {
        btn.classList.remove('connected');
        dot.classList.remove('connected-dot');
        status.textContent = '连接钱包';
    }
}

// ============================================================
//  页面切换逻辑
// ============================================================

function switchTab(tabName) {
    // 隐藏所有页面
    document.querySelectorAll('.page-container').forEach(el => {
        el.classList.remove('active');
    });

    // 移除所有导航激活状态
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    // 显示对应页面
    const targetPage = document.getElementById('page-' + tabName);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 激活对应的导航项
    const navIndex = {
        'home': 0,
        'predict': 1,
        'openclaw': 2,
        'community': 3,
        'rewards': 4
    };
    if (navIndex[tabName] !== undefined) {
        document.querySelectorAll('.nav-item')[navIndex[tabName]].classList.add('active');
    }
}

// ============================================================
//  Toast 通知
// ============================================================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.style.display = 'block';
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ============================================================
//  初始化
// ============================================================

// 默认显示首页
document.addEventListener('DOMContentLoaded', function() {
    switchTab('home');
});
