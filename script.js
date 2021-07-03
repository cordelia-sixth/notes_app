const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote() {
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

      <div class="main hidden"></div>
      <textarea></textarea>
    </div>
  `

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');

  const mainElm = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  // 入力と表示を切り替える
  editBtn.addEventListener('click', () => {
    mainElm.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  // ノートを削除
  deleteBtn.addEventListener('click', () => {
    note.remove();
  });

  textArea.addEventListener('input', event => {
    const { value } = event.target;
    mainElm.innerHTML = marked(value);
  });

  document.body.appendChild(note);
}

