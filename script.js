// Mapping Inputs to Preview Elements
const inputs = {
    date: document.getElementById('date-input'),
    prospect: document.getElementById('prospect-input'),
    note: document.getElementById('note-input'),
    btnText: document.getElementById('btn-text-input'),
    btnLink: document.getElementById('btn-link-input'),
    fName: document.getElementById('footer-name-input'),
    fTitle: document.getElementById('footer-title-input'),
    fMarket: document.getElementById('footer-market-input'),
    fEmail: document.getElementById('footer-email-input'),
    fWeb: document.getElementById('footer-website-input'),
};

const preview = {
    date: document.getElementById('preview-date'),
    prospect: document.getElementById('preview-prospect'),
    note: document.getElementById('preview-note'),
    btn: document.getElementById('preview-btn'),
    fName: document.getElementById('preview-f-name'),
    fTitle: document.getElementById('preview-f-title'),
    fMarket: document.getElementById('preview-f-market'),
    fEmail: document.getElementById('preview-f-email'),
    fWeb: document.getElementById('preview-f-web'),
};

// Live Update Function
function updatePreview() {
    preview.date.innerText = inputs.date.value || '[Date/Time]';
    preview.prospect.innerText = inputs.prospect.value || '[Prospect Name]';
    
    // Handle Optional Note
    if (inputs.note.value.trim() === '') {
        preview.note.style.display = 'none';
    } else {
        preview.note.style.display = 'block';
        preview.note.innerText = inputs.note.value;
    }

    preview.btn.innerText = inputs.btnText.value || 'Click Here';
    preview.btn.href = inputs.btnLink.value || '#';
    
    preview.fName.innerText = inputs.fName.value || 'Name';
    preview.fTitle.innerText = inputs.fTitle.value || 'Title';
    preview.fMarket.innerText = inputs.fMarket.value || 'Market';
    
    preview.fEmail.innerText = inputs.fEmail.value || 'email@example.com';
    preview.fEmail.href = 'mailto:' + inputs.fEmail.value;
    
    preview.fWeb.innerText = inputs.fWeb.value || 'website.com';
    // Simple validation to ensure URL starts with http
    let webLink = inputs.fWeb.value;
    if (webLink && !webLink.startsWith('http')) {
        webLink = 'https://' + webLink;
    }
    preview.fWeb.href = webLink || '#';
}

// Attach Event Listeners to all inputs
Object.values(inputs).forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Copy Functionality (Selects rendered rich text to clipboard)
function copyEmail() {
    const emailContent = document.getElementById('email-preview-content');
    
    // Create range to select the rendered HTML
    const range = document.createRange();
    range.selectNode(emailContent);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    try {
        // Execute copy
        document.execCommand('copy');
        
        // UX Feedback
        const btn = document.getElementById('copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Copied Successfully!';
        btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        btn.classList.add('bg-green-600', 'hover:bg-green-700');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            btn.classList.remove('bg-green-600', 'hover:bg-green-700');
        }, 3000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    // Unselect text
    selection.removeAllRanges();
}

// Initial render
updatePreview();
