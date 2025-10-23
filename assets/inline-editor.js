// Inline Editor JavaScript
let originalContent = {};

function enableEdit(icon) {
    const section = icon.parentElement;
    const content = section.querySelector('.editable-content');
    const controls = section.querySelector('.save-controls');
    const sectionId = section.getAttribute('data-id');
    
    // Sla originele content op
    originalContent[sectionId] = content.innerHTML;
    
    // Maak bewerkbaar
    content.setAttribute('contenteditable', 'true');
    section.classList.add('editing');
    controls.classList.add('active');
    icon.style.opacity = '0';
    
    // Focus op content
    content.focus();
}

function saveEdit(button) {
    const section = button.closest('.editable-section');
    const content = section.querySelector('.editable-content');
    const controls = section.querySelector('.save-controls');
    const sectionId = section.getAttribute('data-id');
    
    // Maak niet meer bewerkbaar
    content.setAttribute('contenteditable', 'false');
    section.classList.remove('editing');
    controls.classList.remove('active');
    
    // Sla op in localStorage
    const pageKey = 'content_' + window.location.pathname + '_' + sectionId;
    localStorage.setItem(pageKey, content.innerHTML);
    
    // Toon notificatie
    showNotification('Wijzigingen opgeslagen!');
    
    // Verwijder originele content uit geheugen
    delete originalContent[sectionId];
}

function cancelEdit(button) {
    const section = button.closest('.editable-section');
    const content = section.querySelector('.editable-content');
    const controls = section.querySelector('.save-controls');
    const sectionId = section.getAttribute('data-id');
    
    // Herstel originele content
    if (originalContent[sectionId]) {
        content.innerHTML = originalContent[sectionId];
    }
    
    // Maak niet meer bewerkbaar
    content.setAttribute('contenteditable', 'false');
    section.classList.remove('editing');
    controls.classList.remove('active');
    
    // Verwijder originele content uit geheugen
    delete originalContent[sectionId];
}

function showNotification(message) {
    let notification = document.getElementById('editor-notification');
    
    // Maak notificatie element als het niet bestaat
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'editor-notification';
        notification.className = 'editor-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Laad opgeslagen content bij het laden van de pagina
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.editable-section').forEach(section => {
        const sectionId = section.getAttribute('data-id');
        const pageKey = 'content_' + window.location.pathname + '_' + sectionId;
        const savedContent = localStorage.getItem(pageKey);
        
        if (savedContent) {
            const content = section.querySelector('.editable-content');
            if (content) {
                content.innerHTML = savedContent;
            }
        }
    });
});