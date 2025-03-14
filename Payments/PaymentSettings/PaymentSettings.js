document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('paymentSettingsForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            paymentDate: document.getElementById('paymentDate').value,
            frequency: document.getElementById('frequency').value,
            gracePeriod: document.getElementById('gracePeriod').value,
            penaltyRate: document.getElementById('penaltyRate').value,
            firstReminder: document.getElementById('firstReminder').value,
            secondReminder: document.getElementById('secondReminder').value
        };

        // Show success message (you can modify this to send data to a server)
        alert('Settings saved successfully!');
        console.log('Form data:', formData);
    });

    // Handle input validation for penalty rate
    const penaltyRateInput = document.getElementById('penaltyRate');
    penaltyRateInput.addEventListener('input', function () {
        let value = parseInt(this.value);
        if (value < 0) this.value = 0;
        if (value > 100) this.value = 100;
    });

    // Add active class to current nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});