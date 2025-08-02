document.addEventListener('DOMContentLoaded', () => {
    const SERVICE_ID = 'service_o3c3ym3';
    const TEMPLATE_ID = 'template_iwldjyr';
    const PUBLIC_KEY = '5roQxkNb671d8UqQA';

    emailjs.init({ publicKey: PUBLIC_KEY });

    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.querySelector('.form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = document.getElementById('user_name').value.trim();
        const userEmail = document.getElementById('user_email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (userName === '' || userEmail === '' || message === '') {
            statusMessage.textContent = 'Please fill out all fields.';
            statusMessage.style.color = 'red';
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            statusMessage.textContent = 'Please enter a valid email address.';
            statusMessage.style.color = 'red';
            return;
        }

        statusMessage.textContent = 'Sending...';
        statusMessage.style.color = 'gray';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
            .then(() => {
                statusMessage.textContent = 'Message sent successfully!';
                statusMessage.style.color = 'green';
                contactForm.reset();
            }, (err) => {
                statusMessage.textContent = 'Failed to send message. Please try again.';
                statusMessage.style.color = 'red';
                console.error('EmailJS Error:', JSON.stringify(err));
            });
    });
});