// src/ui/uploadPanel.js

export class UploadPanel {
    constructor(onImageLoaded) {
        this.onImageLoaded = onImageLoaded;
        this.initUploadListener();
    }

    initUploadListener() {
        // إنشاء عنصر رفع ملفات مخفي أو ربطه بزر في الواجهة إذا وجد
        const uploadInput = document.getElementById('imageUploadInput');
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            if (this.onImageLoaded) {
                                this.onImageLoaded(img, file.name);
                            }
                        };
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // دالة مساعدة لإنشاء زر الرفع برمجياً إذا لم يكن موجوداً
    static createUploadButton(containerId, callback) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.id = 'dynamicImageUpload';
        input.style.display = 'none';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => callback(img, file.name);
                };
                reader.readAsDataURL(file);
            }
        };

        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.innerText = '📁 رفع صورة عظمة/شخصية';
        btn.onclick = () => input.click();

        container.appendChild(input);
        container.appendChild(btn);
    }
}
