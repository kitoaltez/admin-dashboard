document.addEventListener('DOMContentLoaded', function() {
    const addAppointmentBtn = document.getElementById('addAppointmentBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModal = document.querySelector('.close');
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentTable = document.getElementById('appointmentTable');
    const searchBar = document.getElementById('search-bar');
    const appointmentDetailsModal = document.getElementById('appointmentDetailsModal');
    const closeDetailsModal = document.querySelector('.close-details');
    const appointmentDetailsContent = document.getElementById('appointmentDetailsContent');

    let appointments = [];

    addAppointmentBtn.addEventListener('click', () => {
        appointmentModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        appointmentModal.style.display = 'none';
    });

    closeDetailsModal.addEventListener('click', () => {
        appointmentDetailsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === appointmentModal) {
            appointmentModal.style.display = 'none';
        }
        if (event.target === appointmentDetailsModal) {
            appointmentDetailsModal.style.display = 'none';
        }
    });

    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('appointmentName').value;
        const address = document.getElementById('appointmentAddress').value;
        const propose = document.getElementById('appointmentPropose').value;
        const text = document.getElementById('appointmentText').value;

        const newAppointment = {
            name,
            address,
            propose,
            text,
            status: 'Pending'
        };

        appointments.push(newAppointment);
        renderAppointments();
        appointmentModal.style.display = 'none';
        appointmentForm.reset();
    });

    function renderAppointments(filteredAppointments = appointments) {
        appointmentTable.innerHTML = '';
        filteredAppointments.forEach((appointment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.address}</td>
                <td>${appointment.propose}</td>
                <td>${appointment.text}</td>
                <td>${appointment.status}</td>
                <td class="action-buttons">
                    <button class="reply-btn" onclick="replyAppointment(${index})">Reply</button>
                    <button class="approve-btn" onclick="approveAppointment(${index})">Approve</button>
                    <button class="deny-btn" onclick="denyAppointment(${index})">Deny</button>
                </td>
            `;
            row.addEventListener('click', () => showAppointmentDetails(index));
            appointmentTable.appendChild(row);
        });
    }

    function showAppointmentDetails(index) {
        const appointment = appointments[index];
        appointmentDetailsContent.innerHTML = `
            <p><strong>Name:</strong> ${appointment.name}</p>
            <p><strong>Address:</strong> ${appointment.address}</p>
            <p><strong>Propose:</strong> ${appointment.propose}</p>
            <p><strong>Text:</strong> ${appointment.text}</p>
            <p><strong>Status:</strong> ${appointment.status}</p>
        `;
        appointmentDetailsModal.style.display = 'flex';
    }

    window.replyAppointment = function(index) {
        const appointment = appointments[index];
        alert(`Reply to: ${appointment.name}\nMessage: ${appointment.text}`);
    };

    window.approveAppointment = function(index) {
        appointments[index].status = 'Approved';
        renderAppointments();
    };

    window.denyAppointment = function(index) {
        appointments[index].status = 'Denied';
        renderAppointments();
    };

    window.removeAppointment = function(index) {
        appointments.splice(index, 1);
        renderAppointments();
    };

    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredAppointments = appointments.filter(appointment => 
            appointment.name.toLowerCase().includes(searchTerm) ||
            appointment.address.toLowerCase().includes(searchTerm) ||
            appointment.propose.toLowerCase().includes(searchTerm) ||
            appointment.text.toLowerCase().includes(searchTerm)
        );
        renderAppointments(filteredAppointments);
    });

    renderAppointments();
});