async function getLaptimes(candidate) {
   const response = await fetch('/files/' + encodeURIComponent(candidate));
    if (!response.ok) {
        console.error('Failed to fetch laptimes:', response.statusText);
        return null;
    }
    const data = await response.json();
    return data;
}

function displayLaptimes(candidate) {
    getLaptimes(candidate).then(data => {

        document.getElementById('session-name').textContent = data.sessions[0].name || 'Unnamed Session';
        document.getElementById('track-name').textContent = data.track;
        document.getElementById('car-name').textContent = `${data.players[0].car} / ${data.players[0].skin}`;

        const display = document.getElementById('laptime-display'); 
        if (!data || !data.sessions || data.sessions.length === 0) {
            display.innerHTML = '<p>No session data found in file.</p>';
            return;
        }   
        const session = data.sessions[0];
        let html = '<table class="table table-striped"><tr><th>Lap</th><th>Time</th><th>Sectors</th></tr>';

        session.laps.forEach((lap, index) => {
            const badLapClass = lap.time < 1 ? 'text-danger' : '';
            const displayClass = lap.lap === session.bestLaps[0].lap ? 'text-success' : badLapClass;
            html += `<tr><td class="${displayClass}">${index + 1}</td><td class="${displayClass}">${formatMs(lap.time)}</td><td>${lap.sectors.map(formatMs).join(' | ')}</td></tr>`;
        });

        html += '</table>';

        let avg = session.laps.filter(lap => lap.time > 1).reduce((sum, lap) => sum + lap.time, 0) / session.laps.filter(lap => lap.time > 1).length;

        html += `<p><strong>Best Lap Time:</strong> ${formatMs(session.bestLaps[0].time)} (Lap ${session.bestLaps[0].lap + 1})<br>`;
        html += `<strong>Average Lap Time:</strong> ${formatMs(avg)}</p>`;
        display.innerHTML = html;
    });
}

function formatMs(ms) {
    if (ms == null || isNaN(ms)) return '-';
    ms = Math.round(Number(ms));
    const sign = ms < 0 ? '-' : '';
    ms = Math.abs(ms);
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const remainder = ms % 1000;
    return `${sign}${minutes}:${String(seconds).padStart(2, '0')}.${String(remainder).padStart(3, '0')}`;
}


