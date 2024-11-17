// 質問リスト（初期値）
let questions = ["好きな食べ物は？", "あなたの趣味は？"];

// HTML要素を取得
const randomQuestionBtn = document.getElementById('randomQuestionBtn');
const questionDisplay = document.getElementById('questionDisplay');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const newQuestionInput = document.getElementById('newQuestionInput');
const saveQuestionBtn = document.getElementById('saveQuestionBtn');

// 質問をランダムに表示する
randomQuestionBtn.addEventListener('click', () => {
    if (questions.length === 0) {
        questionDisplay.textContent = "質問がありません。追加してください。";
        return;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    questionDisplay.textContent = questions[randomIndex];
});

// 質問を追加する
saveQuestionBtn.addEventListener('click', () => {
    const newQuestion = newQuestionInput.value.trim();
    if (newQuestion) {
        questions.push(newQuestion);
        newQuestionInput.value = ''; // 入力欄をクリア
        alert("質問を追加しました！");
    } else {
        alert("質問を入力してください。");
    }
});