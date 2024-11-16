
        // Get references to the modal and buttons
        const openPopup = document.getElementById('openPopup');
        const closePopup = document.getElementById('closePopup');
        const popupModal = document.getElementById('popupModal');

        // Open modal when the button is clicked
        openPopup.addEventListener('click', () => {
            popupModal.classList.remove('hidden');
        });

        // Close modal when the close button is clicked
        closePopup.addEventListener('click', () => {
            popupModal.classList.add('hidden');
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === popupModal) {
                popupModal.classList.add('hidden');
            }
        });

        // Handle form submission (optional - can be customized as needed)
        const addCropsForm = document.getElementById('addCropsForm');
        addCropsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Form submitted!');
            popupModal.classList.add('hidden');
        });
 