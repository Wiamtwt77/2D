export function initUploadPanel(rig, onUploadComplete) {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `<h3>🎨 لوحة رفع الأجزاء (12 عظمة)</h3><br/>`;

    rig.bones.forEach(bone => {
        const div = document.createElement('div');
        div.className = 'upload-section';
        div.innerHTML = `
            <h4>${bone.name}</h4>
            <input type="file" accept="image/*" data-bone-id="${bone.id}">
        `;
        sidebar.appendChild(div);
    });

    sidebar.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const boneId = parseInt(e.target.getAttribute('data-bone-id'));
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        rig.textures[boneId] = img;
                        if (onUploadComplete) onUploadComplete();
                    };
                };
                reader.readAsDataURL(file);
            }
        });
    });
}
