//define variables
const addBtn = document.getElementById('add');
const row = document.querySelector('.row');

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add(`col-sm-3`);
    note.innerHTML = `
        <div class="card note shadow">
            <div class="card-header tools d-flex justify-content-between">
                <div class="text-truncate title me-2" style="max-width:150px">
                    ${text}
                </div>
                <div className="buttons-wrapper">
                    <button class="btn btn-warning btn-sm me-2 edit">
                    <i class="bi bi-file-earmark-code-fill"></i>
                    </button>
                    <button class="btn btn-danger btn-sm remove">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="main ${text ? '' : 'd-none'}"></div>
                <textarea id="textarea" class="textarea ${text ? 'd-none' : 'form-control'}"></textarea>
            </div>
            <div class="card-footer justify-content-center d-flex">
                <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#mdModal" class="btn btn-outline-info btn-sm">Markdown Cheatsheet</a>
            </div>
        </div>
    `

    const editBtn = note.querySelector('.edit')
    const removeBtn = note.querySelector('.remove')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('.textarea')
    const title = note.querySelector('.title')

    textArea.value = text
    main.innerHTML = marked(text)

    //remove button function
    removeBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })
    
    //edit button function
    editBtn.addEventListener('click', () => {
        main.classList.toggle('d-none')
        textArea.classList.toggle('d-none');
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
        title.innerHTML = value

        updateLS()
    })

    row.appendChild(note);
}

//localStorage
function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}
