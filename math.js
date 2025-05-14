function addCut() {
    const container = document.getElementById('cuts-container');

    const div = document.createElement('div');
    div.classList.add('cut-entry');

    div.innerHTML = `
        <input type="number" placeholder="How many people cut" class="cut-count" required>
        <input type="number" placeholder="Hour of cut (e.g. 2.25)" class="cut-hour" step="0.01" required>
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;

    container.appendChild(div);
}

document.getElementById('ssbd-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const hour = document.getElementById('hour').value;
    const planPPH = parseInt(document.getElementById('planPPH').value);
    const volume = parseInt(document.getElementById('volume').value);
    let staffing = parseInt(document.getElementById('staffing').value);
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);

    let totalHours = 0;
    let totalCuts = 0;

    const cutCounts = document.querySelectorAll('.cut-count');
    const cutHours = document.querySelectorAll('.cut-hour');

    for (let i = 0; i < cutCounts.length; i++) {
        const cutNum = parseInt(cutCounts[i].value);
        const cutAt = parseFloat(cutHours[i].value);
        totalHours += cutNum * cutAt;
        totalCuts += cutNum;
    }

    const remainingStaff = staffing - totalCuts;
    totalHours += remainingStaff * hoursWorked;

    const actualPPH = Math.round(volume / totalHours);
    const ssStaffing = remainingStaff;
    const adjustments = totalCuts;

    const output =
`Small Sort - ${hour} hour
Plan PPH ${planPPH}
Actual PPH ${actualPPH}
Volume ${volume.toLocaleString()}
SS Staffing ${ssStaffing}
Adjustments ${adjustments}
Hours ${totalHours.toFixed(2)}`;

    const resultBox = document.getElementById('result');
    resultBox.textContent = output;
    resultBox.style.display = 'block';
    resultBox.style.backgroundColor = '#fff';
});

