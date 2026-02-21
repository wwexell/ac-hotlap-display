async function getFileList() {
    const response = await fetch('/files');
    if (!response.ok) {
        console.error('Failed to fetch file list:', response.statusText);
        return null;
    }
    const data = await response.json();
    return data;
}

function updateFileListOnPage(list) {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';
    if (!list || !Array.isArray(list)) {
        fileList.innerHTML = '<li>Error loading file list</li>';
        return;
    }
    list.forEach(file => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="displayLaptimes('${file}')">${file}</a>`;
        fileList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const list = await getFileList();
    updateFileListOnPage(list);
    document.getElementById('poll-latest-checkbox').checked = false;
    const refreshRate = await getRefreshRate();
    document.getElementById('refresh-rate').textContent = refreshRate / 1000;
});
