const fs = require('fs');
const path = require('path');
const https = require('https');

const iconsToFetch = [
    'microscope', 'layout-dashboard', 'folder-kanban', 'kanban-square',
    'file-check-2', 'bell', 'pie-chart', 'search', 'plus', 'download',
    'search-x', 'activity', 'check-circle', 'bug', 'folder', 'users',
    'arrow-right', 'zap', 'check-square', 'check-circle-2', 'x-circle',
    'clock', 'edit-2', 'trash-2'
];

const dir = path.join(__dirname, 'icons');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const promises = iconsToFetch.map(icon => {
    return new Promise((resolve, reject) => {
        const url = `https://unpkg.com/lucide-static@latest/icons/${icon}.svg`;
        const dest = path.join(dir, `${icon}.svg`);
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Failed to fetch ${icon}, status: ${res.statusCode}`);
                resolve(false);
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                fs.writeFileSync(dest, data);
                resolve(true);
            });
        }).on('error', err => {
            console.error(`Error fetching ${icon}: ${err.message}`);
            resolve(false);
        });
    });
});

Promise.all(promises).then(() => {
    const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`;

    fs.writeFileSync(path.join(dir, 'app-icon.svg'), appIconSvg);
    fs.writeFileSync(path.join(dir, 'app-icon-16.svg'), appIconSvg.replace('viewBox="0 0 24 24"', 'width="16" height="16" viewBox="0 0 24 24"'));
    fs.writeFileSync(path.join(dir, 'app-icon-32.svg'), appIconSvg.replace('viewBox="0 0 24 24"', 'width="32" height="32" viewBox="0 0 24 24"'));
    fs.writeFileSync(path.join(dir, 'app-icon-64.svg'), appIconSvg.replace('viewBox="0 0 24 24"', 'width="64" height="64" viewBox="0 0 24 24"'));
    fs.writeFileSync(path.join(dir, 'app-icon-192.svg'), appIconSvg.replace('viewBox="0 0 24 24"', 'width="192" height="192" viewBox="0 0 24 24"'));
    fs.writeFileSync(path.join(dir, 'app-icon-512.svg'), appIconSvg.replace('viewBox="0 0 24 24"', 'width="512" height="512" viewBox="0 0 24 24"'));

    console.log("Icons generation finished!");
});
