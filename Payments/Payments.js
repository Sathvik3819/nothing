const visitors = [
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'paid' },
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'paid' },
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'late' },
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'pending' },
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'paid' },
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'paid' },
    { name: 'Likith Grandhe', purpose: 'Meeting', time: '4:30 PM', status: 'paid' },
];

function renderVisitorTable() {
    const tableBody = document.getElementById('visitorTableBody');
    tableBody.innerHTML = '';

    visitors.forEach(visitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${visitor.name}</td>
            <td>${visitor.purpose}</td>
            <td>${visitor.time}</td>
            <td><button class="status ${visitor.status}">${visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}</button></td>
            <td>
                <button class="action-btn">${visitor.status === 'pending' ? 'Remind' : 'View'}</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function initializeSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    const timeFilter = document.getElementById('timeFilter');

    searchInput.addEventListener('input', (e) => {
        // Implement search functionality
        console.log('Searching:', e.target.value);
    });

    timeFilter.addEventListener('change', (e) => {
        // Implement time filter
        console.log('Filter changed:', e.target.value);
    });
}

function initializeEventListeners() {
    const addPaymentBtn = document.getElementById('addPayment');
    addPaymentBtn.addEventListener('click', () => {
        // Implement add payment functionality
        console.log('Add payment clicked');
    });

    // Initialize pagination
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.page-btn.active').classList.remove('active');
            btn.classList.add('active');
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderVisitorTable();
    initializeSearchFilter();
    initializeEventListeners();
});