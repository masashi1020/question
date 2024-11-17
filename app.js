// 質問リスト（初期質問なし）
const questions = [];

// HTML要素を取得
const randomQuestionBtn = document.getElementById('randomQuestionBtn');
const questionDisplay = document.getElementById('questionDisplay');
const newQuestionInput = document.getElementById('newQuestionInput');
const saveQuestionBtn = document.getElementById('saveQuestionBtn');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const manageQuestionsBtn = document.getElementById('manageQuestionsBtn');
const addQuestionForm = document.getElementById('addQuestionForm');
const manageQuestions = document.getElementById('manageQuestions');
const questionsList = document.getElementById('questionsList');

// ローカルストレージに質問を保存する関数
function saveQuestionsToLocalStorage() {
    localStorage.setItem('questions', JSON.stringify(questions));
}

// ローカルストレージから質問を読み込む関数
function loadQuestionsFromLocalStorage() {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
        questions.push(...JSON.parse(savedQuestions));
    }
}

// 質問をランダムに出す
randomQuestionBtn.addEventListener('click', () => {
    if (questions.length === 0) {
        questionDisplay.textContent = "質問がありません。追加してください。";
        return;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    questionDisplay.textContent = questions[randomIndex];
});

// 新しい質問を追加
saveQuestionBtn.addEventListener('click', () => {
    const newQuestion = newQuestionInput.value.trim();
    if (!newQuestion) {
        alert("質問を入力してください。");
        return;
    }
    questions.push(newQuestion);
    saveQuestionsToLocalStorage(); // 質問をローカルストレージに保存
    newQuestionInput.value = ""; // 入力欄をクリア
    alert("質問を保存しました！");
    updateQuestionsList(); // 管理画面のリストを更新
});

// フォームの表示・非表示を切り替える
addQuestionBtn.addEventListener('click', () => {
    if (addQuestionForm.style.display === "none") {
        addQuestionForm.style.display = "block"; // フォームを表示
    } else {
        addQuestionForm.style.display = "none"; // フォームを非表示
    }
});

// 質問管理画面を表示
manageQuestionsBtn.addEventListener('click', () => {
    if (manageQuestions.style.display === "none") {
        manageQuestions.style.display = "block"; // 管理画面を表示
        updateQuestionsList(); // リストを更新
    } else {
        manageQuestions.style.display = "none"; // 管理画面を非表示
    }
});

// 質問一覧を更新
function updateQuestionsList() {
    questionsList.innerHTML = ""; // リストをクリア

    questions.forEach((question, index) => {
        const li = document.createElement("li");
        li.textContent = question;

        // 削除ボタンを作成
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", () => {
            confirmDeleteQuestion(index);
        });

        li.appendChild(deleteBtn);
        questionsList.appendChild(li);
    });
}

// 質問削除の確認ダイアログを表示
function confirmDeleteQuestion(index) {
    const confirmation = confirm("この質問を削除してもよろしいですか？");
    if (confirmation) {
        questions.splice(index, 1); // 質問を削除
        saveQuestionsToLocalStorage(); // 保存
        updateQuestionsList(); // リストを更新
        alert("質問を削除しました。");
    }
}

// ページ読み込み時に質問を読み込む
loadQuestionsFromLocalStorage();