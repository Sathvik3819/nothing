// Sample booking data
const bookings = [
    { visitor: 'Likhit Grandhe', space: 'Banquet hall', dateTime: 'Mar 13, 4:30 PM', status: 'pending' },
    { visitor: 'Likhit Grandhe', space: 'Community hall', dateTime: 'Mar 13, 4:30 PM', status: 'pending' },
    { visitor: 'Likhit Grandhe', space: 'Banquet hall', dateTime: 'Mar 13, 4:30 PM', status: 'approved' },
    { visitor: 'Likhit Grandhe', space: 'Gym', dateTime: 'Mar 13, 4:30 PM', status: 'pending' },
    { visitor: 'John Doe', space: 'Gym', dateTime: 'Mar 16, 2:00 PM', status: 'approved' },
    { visitor: 'Jane Smith', space: 'Swimming pool', dateTime: 'Mar 16, 3:30 PM', status: 'pending' },
    { visitor: 'Mike Johnson', space: 'Meeting', dateTime: 'Mar 23, 10:00 AM', status: 'approved' },
    { visitor: 'Sarah Wilson', space: 'Banquet hall', dateTime: 'Mar 23, 6:00 PM', status: 'pending' }
];

function populateBookingsTable() {
    const tableBody = document.getElementById('bookingsTableBody');
    tableBody.innerHTML = '';

    bookings.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.visitor}</td>
            <td>${booking.space}</td>
            <td>${booking.dateTime}</td>
            <td><span class="status-badge status-${booking.status}">${booking.status}</span></td>
            <td class="action-buttons">
                ${booking.status === 'pending' ? `
                    <button class="btn-approve">✓</button>
                    <button class="btn-reject">✕</button>
                ` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Create and append hover info element
const hoverInfo = document.createElement('div');
hoverInfo.className = 'calendar-hover-info';
document.querySelector('.calendar').appendChild(hoverInfo);

// Calendar functionality
function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        daysContainer.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Check if this day has any bookings
        const dateStr = `Mar ${day}`;
        const dayBookings = bookings.filter(booking => booking.dateTime.startsWith(dateStr));

        if (dayBookings.length > 0) {
            dayElement.classList.add('has-booking');
        }

        dayElement.addEventListener('mouseover', (e) => {
            if (dayBookings.length > 0) {
                const rect = dayElement.getBoundingClientRect();
                const calendarRect = document.querySelector('.calendar').getBoundingClientRect();

                hoverInfo.innerHTML = `
                    <h4>${dateStr} Bookings</h4>
                    <ul>
                        ${dayBookings.map(booking => `
                            <li>
                                ${booking.visitor} - ${booking.space}
                                <br>
                                <small>${booking.dateTime.split(', ')[1]} (${booking.status})</small>
                            </li>
                        `).join('')}
                    </ul>
                `;

                // Position the hover info
                const top = rect.top - calendarRect.top + rect.height + 5;
                const left = rect.left - calendarRect.left;

                // Adjust position if it would go off the right edge
                const rightEdge = left + 200; // 200px is min-width of hover info
                const calendarWidth = calendarRect.width;

                hoverInfo.style.top = `${top}px`;
                hoverInfo.style.left = rightEdge > calendarWidth
                    ? `${calendarWidth - 210}px`
                    : `${left}px`;
                hoverInfo.style.display = 'block';
            }
        });

        dayElement.addEventListener('mouseout', () => {
            hoverInfo.style.display = 'none';
        });

        daysContainer.appendChild(dayElement);
    }
}

// Initialize calendar
const currentDate = new Date();
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Event listeners
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    document.getElementById('currentMonth').textContent =
        currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    document.getElementById('currentMonth').textContent =
        currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Search functionality
document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#bookingsTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Initialize the page
populateBookingsTable();