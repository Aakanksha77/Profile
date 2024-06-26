document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note');
    const notesContainer = document.getElementById('notes-container');

    // Load saved notes from localStorage
    loadNotes();

    // Add note button click event
    addNoteButton.addEventListener('click', () => {
        createNote();
    });

    function createNote(content = '') {
        const note = document.createElement('div');
        note.classList.add('note');

        const textarea = document.createElement('textarea');
        textarea.value = content;
        textarea.placeholder = 'Enter your note...';

        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('delete-note');
        deleteButton.addEventListener('click', () => {
            notesContainer.removeChild(note);
            saveNotes();
        });

        note.appendChild(deleteButton);
        note.appendChild(textarea);
        notesContainer.appendChild(note);

        // Save notes on change
        textarea.addEventListener('input', saveNotes);
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note textarea').forEach(note => {
            notes.push(note.value);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        savedNotes.forEach(noteContent => createNote(noteContent));
    }
});
