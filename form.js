document.getElementById('free-trial-button').addEventListener('click', function() {
    window.location.href = 'form.html';
});

document.getElementById('whatsapp-btn').addEventListener('click', function() {
    var whatsappUrl = 'https://wa.me/447453654443'; 
    window.open(whatsappUrl, '_blank');
});

document.getElementById('mail-btn').addEventListener('click', function() {
    var email = 'Info.hdstreaming@gmail.com'; // Replace with your email address
    var subject = 'Package Subscription'; // Replace with your email subject
    var body = 'I Want to Subscribe your Package'; // Replace with your email body text
    var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailtoLink;
});
const form = document.getElementById('form');
const result = document.getElementById('result');

form?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = "Details sent successfully<br>You will get your access within 24 hours, please don't forget to check your mail.";
        } else {
            console.log(response);
            result.innerHTML = json.message;
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
    })
    .then(function() {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
});
