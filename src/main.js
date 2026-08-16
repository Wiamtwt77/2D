import { SceneManager } from './core/sceneManager.js';
import { Rig } from './core/rig.js';
import { renderScene } from './core/renderer.js';
import { TimelineManager } from './animation/timeline.js';
import { UploadPanel } from './ui/uploadPanel.js';
import { saveProject } from './services/projectService.js';

// تهيئة الكانفاس والبيئة
const canvas = document.getElementById('canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const sceneManager = new SceneManager();
const timeline = new TimelineManager((frame) => {
    updateStudio();
    // تحديث مؤشر الإطار في الواجهة إن وجد
    const timeDisplay = document.querySelector('.time-display');
    if (timeDisplay) {
        timeDisplay.innerText = `00:00 / 05:00 ( الإطار: ${frame} )`;
    }
});

// دالة التحديث الرسومي الشاملة
function updateStudio() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentScene = sceneManager.getCurrentScene();
    ctx.fillStyle = currentScene.background || '#121829';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // رسم الهيكل والعظام
    renderScene(ctx, Rig, sceneManager.currentSceneIndex);
}

// تحديث قائمة المشاهد الجانبية
function renderSceneTabs() {
    const list = document.getElementById('scenesList');
    if (!list) return;
    
    list.innerHTML = '';
    sceneManager.scenes.forEach((scene, index) => {
        const btn = document.createElement('button');
        btn.className = `scene-tab ${index === sceneManager.currentSceneIndex ? 'active' : ''}`;
        btn.innerText = `🎬 ${scene.name}`;
        
        btn.onclick = () => {
            sceneManager.switchScene(index);
            renderSceneTabs();
            updateStudio();
        };
        list.appendChild(btn);
    });
}

// تفعيل تفاعل الواجهة والأزرار بالكامل
function initStudioInterface() {
    // 1. زر إضافة مشهد جديد
    const addSceneBtn = document.getElementById('addSceneBtn');
    if (addSceneBtn) {
        addSceneBtn.onclick = () => {
            sceneManager.addScene();
            renderSceneTabs();
            updateStudio();
        };
    }

    // 2. زر الحفظ السحابي عبر Supabase
    const saveCloudBtn = document.getElementById('saveCloudBtn');
    const saveStatus = document.getElementById('saveStatus');
    const projectNameInput = document.getElementById('projectNameInput');

    if (saveCloudBtn) {
        saveCloudBtn.onclick = async () => {
            try {
                saveCloudBtn.innerText = "جاري الحفظ...";
                const projectName = projectNameInput ? projectNameInput.value : "مشروع استوديو التحريك";
                const scenesData = sceneManager.scenes;
                
                await saveProject(projectName, scenesData);
                
                if (saveStatus) {
                    saveStatus.innerText = "تم الحفظ بنجاح في السحابة!";
                    saveStatus.style.color = "#2ea043";
                }
                saveCloudBtn.innerText = "حفظ في السحابة";
            } catch (error) {
                console.error("خطأ أثناء الحفظ السحابي:", error);
                if (saveStatus) {
                    saveStatus.innerText = "فشل الحفظ!";
                    saveStatus.style.color = "#f85149";
                }
                saveCloudBtn.innerText = "حفظ في السحابة";
            }
        };
    }

    // 3. تفعيل أزرار تشغيل الخط الزمني (Play / Pause)
    const playBtn = document.querySelector('.play-btn.active-play, .play-btn');
    if (playBtn) {
        playBtn.onclick = () => {
            if (timeline.isPlaying) {
                timeline.pause();
                playBtn.innerText = "▶ تشغيل";
            } else {
                timeline.play();
                playBtn.innerText = "⏸ إيقاف مؤقت";
            }
        };
    }

    // 4. دمج لوحة رفع الصور تلقائياً في الشريط الجانبي الأيسر
    const leftSidebar = document.querySelector('.left-sidebar');
    if (leftSidebar) {
        const uploadContainer = document.createElement('div');
        uploadContainer.className = 'panel-section';
        uploadContainer.innerHTML = '<h3>رفع الأصول</h3>';
        uploadContainer.id = 'uploadSection';
        leftSidebar.insertBefore(uploadContainer, leftSidebar.firstChild);

        UploadPanel.createUploadButton('uploadSection', (img, filename) => {
            // ربط الصورة الافتراضية بأول عظمة كاختبار تفاعلي سريع
            Rig.attachImageToBone('head', img);
            updateStudio();
        });
    }

    // 5. تفعيل أدوات التحريك الجانبية
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.onclick = () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
}

// التشغيل الأولي للاستوديو
function init() {
    renderSceneTabs();
    updateStudio();
    initStudioInterface();
}

init();
