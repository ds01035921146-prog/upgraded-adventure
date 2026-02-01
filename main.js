/* 실제 빈도 기반 가중치 예시 */
const freqData = {
  12:144, 34:142, 13:140, 38:136, 45:135,
  18:133, 14:132, 27:132, 33:132, 7:129,
  15:128, 17:128, 20:128, 21:128, 16:127,
  11:126, 6:124, 9:123, 24:121, 30:120,
  3:119, 5:118, 8:117, 4:116, 10:115,
  19:114, 22:113, 23:112, 25:110, 26:109,
  28:108, 29:107, 31:106, 32:105, 35:104,
  36:103, 37:102, 39:101, 40:100, 41:98,
  42:96, 43:94, 44:92, 1:90, 2:88
};

function weightedRandom() {
    const entries = Object.entries(freqData);
    const total = entries.reduce((s,[,w]) => s + w, 0);
    let r = Math.random() * total;
    let sum = 0;

    for (const [num, w] of entries) {
        sum += w;
        if (r <= sum) return parseInt(num);
    }
}

function ballClass(num) {
    if (num <= 10) return "low";
    if (num <= 20) return "mid1";
    if (num <= 30) return "mid2";
    if (num <= 40) return "mid3";
    return "high";
}

function createBalls(numbers) {
    const wrapper = document.createElement("div");
    wrapper.className = "history-line";

    numbers.forEach(n => {
        const b = document.createElement("div");
        b.className = "ball " + ballClass(n);
        b.innerText = n;
        wrapper.appendChild(b);
    });
    return wrapper;
}

function generateLotto() {
    let set = new Set();
    while (set.size < 6) set.add(weightedRandom());

    let nums = [...set].sort((a,b)=>a-b);

    // 현재 번호
    const current = document.getElementById("currentBalls");
    current.innerHTML = "";
    nums.forEach(n => {
        const b = document.createElement("div");
        b.className = "ball " + ballClass(n);
        b.innerText = n;
        current.appendChild(b);
    });

    // 기록 저장
    document.getElementById("history")
        .prepend(createBalls(nums));
}

const themeSwitch = document.getElementById('checkbox');

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
}
