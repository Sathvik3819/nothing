document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('visitorForm');

    // Set default date to today
    const paymentDateInput = document.getElementById('paymentDate');
    const today = new Date().toISOString().split('T')[0];
    paymentDateInput.value = today;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            residentName: document.getElementById('residentName').value,
            flatNo: document.getElementById('flatNo').value,
            amount: document.getElementById('amount').value,
            paymentDate: document.getElementById('paymentDate').value,
            paymentMode: document.getElementById('paymentMode').value,
            paymentStatus: document.getElementById('paymentStatus').value,
            notes: document.getElementById('notes').value
        };

        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);

        // Show success message
        alert('Payment details saved successfully!');

        // Reset form
        form.reset();
        paymentDateInput.value = today;
    });
});

function cancelForm() {
    const form = document.getElementById('visitorForm');
    form.reset();

    // Reset date to today
    const paymentDateInput = document.getElementById('paymentDate');
    const today = new Date().toISOString().split('T')[0];
    paymentDateInput.value = today;
}