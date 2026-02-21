let poller;

async function getRefreshRate() {
    const response = await fetch('/refreshRate');
    if (!response.ok) {
        console.error('Failed to fetch refresh rate:', response.statusText);
        return 5000; // default to 5 seconds if fetch fails
    }
    const data = await response.json();
    return data.refreshRate;
}

async function initiatePolling() {
    const pollInterval = await getRefreshRate();
    poller = setInterval(async () => {
        const list = await getFileList();
        updateFileListOnPage(list);
        const candidate = list && list.length > 0 ? list[0] : null;
        if (candidate) {
            displayLaptimes(candidate); 
        }
    }, pollInterval);   
}

function stopPolling() {
    if(poller){
        clearInterval(poller);
        poller = null;
    }
}

function togglePolling() {
    const toggle = document.getElementById('poll-latest-checkbox');   
    if (toggle.checked) {
        initiatePolling();
    } else {
        stopPolling();
    }  
};