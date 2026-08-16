import { SceneManager } from './core/sceneManager.js';
import { saveProject } from './services/projectService.js';
import { rig } from './core/rig.js';

// 1. تهيئة الكانفاس وسياق الرسم
const canvas = document.getElementById('canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// 2. تهيئة مدير المشاهد
const sceneManager = new SceneManager();

// 3. دالة رسم المشهد الحالي على الكانفاس
function drawCurrentScene() {
    if (!ctx || !canvas) return;
    
    // مسح الشاشة
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // الحصول على المشهد الحالي
    const currentScene = sceneManager.getCurrentScene();
    
    // تلوين الخلفية
    ctx.fillStyle = currentScene.background || '#121829';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // رسم العظام الافتراضية
    if (currentScene.bones) {
        currentScene.bones.forEach(bone => {
            ctx.beginPath();
            ctx.arc(bone.x || 150, bone.y || 150, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#e94560';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            ctx.closePath();
        });
    }
}

// 4. تحديث قائمة المشاهد في الواجهة الجانبية
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
            drawCurrentScene();
        };
        list.appendChild(btn);
    });
}

// 5. ربط أزرار الواجهة والوظائف
function initStudioEvents() {
    // زر إضافة مشهد جديد
    const addSceneBtn = document.getElementById('addSceneBtn');
    if (addSceneBtn) {
        addSceneBtn.onclick = () => {
            sceneManager.addScene();
            renderSceneTabs();
            drawCurrentScene();
        };
    }

    // زر الحفظ في السحابة
    const saveCloudBtn = document.getElementById('saveCloudBtn');
    const saveStatus = document.getElementById('saveStatus');
    const projectNameInput = document.getElementById('projectNameInput');

    if (saveCloudBtn) {
        saveCloudBtn.onclick = async () => {
            try {
                saveCloudBtn.innerText = "جاري الحفظ...";
                const projectName = projectNameInput ? projectNameInput.value : "مشروع استوديو التحريك";
                const scenesData = sceneManager.scenes;
                
                const result = await saveProject(projectName, scenesData);
                
                if (saveStatus) {
                    saveStatus.innerText = "تم الحفظ بنجاح في السحابة!";
                    saveStatus.style.color = "#2ea043";
                }
                saveCloudBtn.innerText = "حفظ في السحابة";
                console.log("تم الحفظ بنجاح، المعرف:", result.id);
            } catch (error) {
                console.error("خطأ أثناء الحفظ:", error);
                if (saveStatus) {
                    saveStatus.innerText = "فشل الحفظ!";
                    saveStatus.style.color = "#f85149";
                }
                saveCloudBtn.innerText = "حفظ في السحابة";
            }
        };
    }

    // تفاعل أدوات التحريك الجانبية
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.onclick = () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
}

// 6. التشغيل الأولي للتطبيق
function initStudio() {
    renderSceneTabs();
    drawCurrentScene();
    initStudioEvents();
}

initStudio();
