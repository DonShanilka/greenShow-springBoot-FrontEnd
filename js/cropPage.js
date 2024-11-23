const popupModal = document.getElementById('popupModal');
    const addCropButton = document.getElementById('addCropButton');
    const cancelPopup = document.getElementById('cancelPopup');
    const saveChanges = document.getElementById('saveChanges');
    const tableBody = document.getElementById('tableBody');

    addCropButton.addEventListener('click', () => {
        popupModal.classList.remove('hidden');
    });

    cancelPopup.addEventListener('click', () => {
        popupModal.classList.add('hidden');
        document.getElementById('addCropsForm').reset();
    });

    saveChanges.addEventListener('click', () => {
        const category = document.getElementById('category').value;
        const name1 = document.getElementById('name1').value;
        const name2 = document.getElementById('name2').value;
        const season = document.getElementById('season').value;
        const image = document.getElementById('image').files[0]?.name || 'No Image';

        const row = `
            <tr>
                <td class="px-6 py-4">${category}</td>
                <td class="px-6 py-4"><img src="#" alt="${image}" class="w-12 h-12 object-cover rounded"></td>
                <td class="px-6 py-4">${name1}</td>
                <td class="px-6 py-4">${name2}</td>
                <td class="px-6 py-4">${season}</td>
                <td class="px-6 py-4 text-right space-x-2">
                    <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Edit</button>
                    <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
        popupModal.classList.add('hidden');
        document.getElementById('addCropsForm').reset();
    });