// Add arrays for generating random positive messages1
const positiveMessages = [
    "我看到你的未來充滿光明！",
    "這張牌告訴我你正走在正確的道路上",
    "宇宙正在為你安排最好的結果",
    "保持樂觀，好運即將來臨",
    "你的直覺是對的，繼續相信自己",
    "機會就在眼前，大膽把握住它"
];

const positiveAdvice = [
    "建議你保持當前的態度和方向",
    "不妨嘗試新的可能性",
    "相信自己的判斷",
    "繼續保持積極的心態",
    "這是一個適合行動的時機",
    "耐心等待，時機即將成熟"
];

const positiveEndings = [
    "記住，你比想像中更強大！",
    "未來掌握在你手中！",
    "相信自己，你一定能成功！",
    "宇宙正在眷顧著你！",
    "保持這份信心，繼續前進！",
    "好運很快就會降臨！"
];

// 塔羅牌數據 - 簡化版本，只包含文字信息
const tarotCards = [
    { id: 0, name: "愚者", keywords: "開始,冒險,自發,天真" },
    { id: 1, name: "魔術師", keywords: "創造力,技能,意志力" },
    { id: 2, name: "女祭司", keywords: "直覺,神秘,內在知識" },
    { id: 3, name: "女皇", keywords: "豐收,母性,創造力" },
    { id: 4, name: "皇帝", keywords: "權威,結構,控制" },
    { id: 5, name: "教皇", keywords: "傳統,信仰,教育" },
    { id: 6, name: "戀人", keywords: "選擇,愛情,和諧" },
    { id: 7, name: "戰車", keywords: "意志,勝利,進取" },
    { id: 8, name: "力量", keywords: "勇氣,耐心,控制" },
    { id: 9, name: "隱士", keywords: "內省,智慧,孤獨" },
    { id: 10, name: "命運之輪", keywords: "變化,機會,命運" },
    { id: 11, name: "正義", keywords: "平衡,真理,因果" },
    { id: 12, name: "吊人", keywords: "犧牲,新視角,等待" },
    { id: 13, name: "死神", keywords: "結束,轉變,重生" },
    { id: 14, name: "節制", keywords: "平衡,和諧,適度" },
    { id: 15, name: "惡魔", keywords: "束縛,慾望,執著" },
    { id: 16, name: "塔", keywords: "突變,崩塌,啟示" },
    { id: 17, name: "星星", keywords: "希望,啟發,寧靜" },
    { id: 18, name: "月亮", keywords: "幻想,恐懼,直覺" },
    { id: 19, name: "太陽", keywords: "快樂,活力,成功" },
    { id: 20, name: "審判", keywords: "重生,決定,覺醒" },
    { id: 21, name: "世界", keywords: "完成,圓滿,統一" }
];

// DOM 元素
const elements = {
    chatHistory: document.getElementById('chatHistory'),
    userQuestion: document.getElementById('userQuestion'),
    sendButton: document.getElementById('sendQuestion'),
    spreadSelector: document.getElementById('spreadSelector'),
    spreadDescription: document.getElementById('spreadDescription'),
    cardsGrid: document.getElementById('cardsGrid'),
    selectedCards: document.getElementById('selectedCards'),
    readingResult: document.getElementById('readingResult')
};

// 牌陣數據
const spreads = {
    single: {
        name: "單張牌陣",
        description: "簡單的單張牌陣，適合日常簡單問題",
        maxCards: 1
    },
    three: {
        name: "三張牌陣",
        description: "過去、現在、未來的三張牌陣",
        maxCards: 3
    },
    celtic: {
        name: "凱爾特十字牌陣",
        description: "詳細的十字牌陣，可以深入分析問題",
        maxCards: 10
    }
};

// 當前選擇的牌陣
let currentSpread = spreads.single;
// 已選擇的卡牌
let selectedCardIds = [];

// 初始化
function initialize() {
    setupEventListeners();
    updateSpreadDescription();
    updateClock();
    setInterval(updateClock, 1000);
}

// 創建卡牌元素
function createCardElement(card) {
    const div = document.createElement('div');
    div.className = 'card';
    
    const content = document.createElement('div');
    content.className = 'card-content';
    content.innerHTML = `
        <div class="card-name">${card.name}</div>
        <div class="card-keywords">${card.keywords}</div>
    `;
    
    div.appendChild(content);
    return div;
}

// 設置事件監聽器
function setupEventListeners() {
    elements.spreadSelector.addEventListener('change', (e) => {
        currentSpread = spreads[e.target.value];
        updateSpreadDescription();
    });

    elements.sendButton.addEventListener('click', handleSendMessage);
    elements.userQuestion.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
}

// 處理發送消息
function handleSendMessage() {
    const question = elements.userQuestion.value.trim();
    if (!question) return;

    addMessageToChat(question, 'user');
    elements.userQuestion.value = '';

    selectedCardIds = getRandomCards(currentSpread.maxCards);

    setTimeout(() => {
        const response = generatePositiveReading();
        addMessageToChat(response, 'bot');
    }, 1000);
}

// 隨機選擇卡牌
function getRandomCards(count) {
    let availableCards = [...tarotCards.map(card => card.id)];
    let selectedIds = [];
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        selectedIds.push(availableCards[randomIndex]);
        availableCards.splice(randomIndex, 1);
    }
    
    return selectedIds;
}

// 生成占卜結果
function generatePositiveReading() {
    const selectedCards = selectedCardIds.map(id => tarotCards.find(card => card.id === id));
    
    if (selectedCards.length === 0) {
        return "請輸入您的問題，讓我為您解牌～";
    }

    const message = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    const advice = positiveAdvice[Math.floor(Math.random() * positiveAdvice.length)];
    const ending = positiveEndings[Math.floor(Math.random() * positiveEndings.length)];

    const cardReadings = selectedCards.map(card => {
        const position = Math.random() < 0.5 ? "正位" : "逆位";
        return `${card.name}（${position}）：${card.keywords}`;
    }).join('\n');

    const now = new Date();
    const timeStr = now.toLocaleString('zh-HK', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });

    return `
占卜時間：${timeStr}

${message}

抽到的牌：
${cardReadings}

${advice}

${ending}
    `.trim();
}

// 添加消息到聊天
function addMessageToChat(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    messageDiv.innerHTML = message.replace(/\n/g, '<br>');
    elements.chatHistory.appendChild(messageDiv);
    elements.chatHistory.scrollTop = elements.chatHistory.scrollHeight;
}

// 更新牌陣描述
function updateSpreadDescription() {
    elements.spreadDescription.textContent = currentSpread.description;
}

// 更新時鐘顯示
function updateClock() {
    const clockElement = document.getElementById('systemClock');
    const now = new Date();
    const timeStr = now.toLocaleString('zh-HK', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
    clockElement.textContent = timeStr;
}

// 初始化應用
initialize(); 