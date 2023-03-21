
const inputFile = document.getElementById('input-file');
const dropArea = document.getElementById('drop-area');
const dropMessage = document.querySelector('.drop-message');
const countBtn = document.getElementById('count-btn');
const resultsDiv = document.getElementById('results');

function highlightDropArea() {
    dropArea.classList.add('highlight');
    dropMessage.innerText = 'Drop the file';
}

function unhighlightDropArea() {
    dropArea.classList.remove('highlight');
    dropMessage.innerText = 'Drag and drop your file here';
}

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    highlightDropArea();
});

dropArea.addEventListener('dragleave', (event) => {
    event.preventDefault();
    unhighlightDropArea();
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    unhighlightDropArea();
    const file = event.dataTransfer.files[0];
    if (!file.type.match('text.*')) {
        resultsDiv.innerHTML = '<p>Error: Only text files are supported</p>';
        return;
    }
    inputFile.files = event.dataTransfer.files;
    dropMessage.innerText = inputFile.files[0].name;
});

inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
    if (!file.type.match('text.*')) {
        resultsDiv.innerHTML = '<p>Error: Only text files are supported</p>';
        return;
    }
    dropMessage.innerText = inputFile.files[0].name;
});

countBtn.addEventListener('click', () => {
    const file = inputFile.files[0];
    if (!file || !file.type.match('text.*')) {
        resultsDiv.innerHTML = '<p>Error: No file selected or file is not a text file</p>';
        return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        const fileContents = reader.result;
        const { frequencyMap, wordCount } = countWords(fileContents);
        const outputHtml = `
            <p>Word count: ${wordCount}</p>
            <ul>
              ${[...frequencyMap.entries()]
                .map(([word, count]) => `<li>${word}: ${count}</li>`)
                .join('')}
            </ul>
          `;
        resultsDiv.innerHTML = outputHtml;
    };
});
