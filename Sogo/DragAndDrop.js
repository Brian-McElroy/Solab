const list = document.querySelector('.sortable-list');
let draggingItem = null;
list.addEventListener('dragstart', (e) => {
    draggingItem = e.target;
    e.target.classList.add('dragging');
});
list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.sortable-item')
        .forEach(item => item.classList.remove('over'));
    draggingItem = null;
    SetTopFive();
});
list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);
    document.querySelectorAll('.sortable-item').forEach
        (item => item.classList.remove('over'));
    if (draggingOverItem) {
        draggingOverItem.classList.add('over');
        list.insertBefore(draggingItem, draggingOverItem);
    } else {
        list.appendChild(draggingItem); 
    }
});
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll
        ('.sortable-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Mobile touch events
list.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    draggingItem = e.target.closest('.sortable-item');
    if (draggingItem) {
        draggingItem.classList.add('dragging');
        touchOffsetY = touch.clientY - draggingItem.getBoundingClientRect().top;
    }
}, { passive: true });

list.addEventListener('touchmove', (e) => {
    if (!draggingItem) return;
    e.preventDefault();
    const touch = e.touches[0];
    const draggingOverItem = getDragAfterElement(list, touch.clientY);
    document.querySelectorAll('.sortable-item').forEach(item => item.classList.remove('over'));
    if (draggingOverItem) {
        draggingOverItem.classList.add('over');
        list.insertBefore(draggingItem, draggingOverItem);
    } else {
        list.appendChild(draggingItem);
    }
});

list.addEventListener('touchend', () => {
    if (draggingItem) {
        draggingItem.classList.remove('dragging');
        document.querySelectorAll('.sortable-item').forEach(item => item.classList.remove('over'));
        draggingItem = null;
    }
    SetTopFive();
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}