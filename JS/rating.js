export const loadTestimonials = () => {
    const ratingBoxes = document.querySelectorAll('.rating-box');

    ratingBoxes.forEach(box => {
        const inputs = box.querySelectorAll('input[type="radio"]');
        const display = box.querySelector('.rating-num');

        // Function to update the number
        const updateRating = () => {
            const checkedInput = box.querySelector('input[type="radio"]:checked');
            if (checkedInput) {
                // Formats the value to 1 decimal place (e.g., 5.0)
                display.textContent = parseFloat(checkedInput.value).toFixed(1);
            }
        };

        // Update on load
        updateRating();

        // Update whenever a star is clicked
        inputs.forEach(input => {
            input.addEventListener('change', updateRating);
        });
    });
};
