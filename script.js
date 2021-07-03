const addBtn = document.getElementById('add');

// 保存してあるノートを読み込む
// これは配列
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes) {
  notes.forEach(note => {
    addNewNote(note);
  })
}

addBtn.addEventListener('click', () => {
  addNewNote();
});

// 新しいノートを作成
function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="notes">
      <div class="tools">
        <button class="edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>

      <div class="main ${text ? '' : 'hidden'}"></div>
      <textarea class="${text ? 'hidden' : ''}"></textarea>
    </div>
  `

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');

  const mainElm = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  // 保存してあったノートを表示
  textArea.value = text;
  mainElm.innerHTML = marked(text);
  

  // 入力と表示を切り替える
  editBtn.addEventListener('click', () => {
    mainElm.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  // ノートを削除
  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });

  // 入力されたら表示
  textArea.addEventListener('input', event => {
    const { value } = event.target;

    // markdownをHTMLに変換
    mainElm.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);
}

// ノートを保存
function updateLS() {
  // すべてのノートを取得
  // remove()されたノートは文字通り存在してないので
  // そのノートの値は取得もされない。
  // よって存在するノートのみローカルストレージに保存されるので
  // 削除も兼ねている
  const noteText = document.querySelectorAll('textarea');
  console.log(noteText);

  // それぞれのノートのテキストを配列に保存
  const notes = [];
  noteText.forEach(note => {
    notes.push(note.value);
    console.log(note.value);
  });
  
  // 文字列に変換してローカルストレージに保存
  localStorage.setItem('notes', JSON.stringify(notes));
}