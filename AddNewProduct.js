document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('productModal');
    const addProductBtn = document.getElementById('addProductBtn');
    const closeModal = document.querySelector('.close');
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    const imageUpload = document.getElementById('imageUpload');
    const previewImage = document.getElementById('previewImage');
    const productDetailsModal = document.getElementById('productDetailsModal');
    const closeDetailsModal = document.querySelector('.close-details');
    const productDetailsContent = document.getElementById('productDetailsContent');

    // Open modal
    addProductBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close details modal
    closeDetailsModal.addEventListener('click', () => {
        productDetailsModal.style.display = 'none';
    });

    // Preview image
    imageUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const productCode = document.getElementById('productCode').value;
        const productName = document.getElementById('productName').value;
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        const imageFile = imageUpload.files[0];

        if (!productCode || !productName || !category || !price || !quantity || !imageFile) {
            alert('Please fill all fields and upload an image.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;

            // Add new row to the table
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${productTable.rows.length + 1}</td>
                <td>${productCode}</td>
                <td>${productName}</td>
                <td>${category}</td>
                <td>${price}</td>
                <td>${quantity}</td>
                <td><img src="${imageUrl}" alt="Product Image" style="width: 50px; height: 50px;"></td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            productTable.appendChild(newRow);

            // Add click event to the new row (for product details)
            newRow.addEventListener('click', () => {
                productDetailsContent.innerHTML = `
                    <p><strong>Product Code:</strong> ${productCode}</p>
                    <p><strong>Name:</strong> ${productName}</p>
                    <p><strong>Category:</strong> ${category}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Quantity:</strong> ${quantity}</p>
                    <img src="${imageUrl}" alt="Product Image">
                `;
                productDetailsModal.style.display = 'flex';
            });

            // Add click event to the Edit button (stop propagation)
            const editButton = newRow.querySelector('.edit-btn');
            editButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Stop event from bubbling up to the row
                editProduct(this);
            });

            // Add click event to the Delete button (stop propagation)
            const deleteButton = newRow.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Stop event from bubbling up to the row
                deleteProduct(this);
            });

            // Clear form and close modal
            productForm.reset();
            previewImage.style.display = 'none';
            modal.style.display = 'none';
        };
        reader.readAsDataURL(imageFile);
    });
});

// Edit Product Functionality
function editProduct(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    // Populate the form with the row's data
    document.getElementById('productCode').value = cells[1].textContent;
    document.getElementById('productName').value = cells[2].textContent;
    document.getElementById('category').value = cells[3].textContent;
    document.getElementById('price').value = cells[4].textContent;
    document.getElementById('quantity').value = cells[5].textContent;

    // Set the image preview (if applicable)
    const imageSrc = cells[6].querySelector('img').src;
    const previewImage = document.getElementById('previewImage');
    previewImage.src = imageSrc;
    previewImage.style.display = 'block';

    // Open the modal for editing
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';

    // Update the form submission to handle editing
    const productForm = document.getElementById('productForm');
    productForm.removeEventListener('submit', handleFormSubmit); // Remove old listener
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Update the row with new data
        cells[1].textContent = document.getElementById('productCode').value;
        cells[2].textContent = document.getElementById('productName').value;
        cells[3].textContent = document.getElementById('category').value;
        cells[4].textContent = document.getElementById('price').value;
        cells[5].textContent = document.getElementById('quantity').value;

        // Update the image (if changed)
        const newImageFile = document.getElementById('imageUpload').files[0];
        if (newImageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                cells[6].querySelector('img').src = e.target.result;
            };
            reader.readAsDataURL(newImageFile);
        }

        // Close the modal and reset the form
        modal.style.display = 'none';
        productForm.reset();
        previewImage.style.display = 'none';
    });
}

// Delete Product Functionality
function deleteProduct(button) {
    const row = button.closest('tr');
    row.remove();
}