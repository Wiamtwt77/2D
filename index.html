import { SceneManager } from './core/sceneManager.js';
import { Rig } from './core/rig.js';
import { renderScene } from './core/renderer.js';
import { saveProject } from './services/projectService.js';

// تهيئة عناصر الرسم والبيئة
const canvas = document.getElementById('canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const sceneManager = new SceneManager();

// دالة تحديث ورسم المشهد الحالي على الكانفاس
function updateStudio() {
    if (!ctx || !canvas) return;
    
    // مسح الشاشة
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // الحصول على المشهد الحالي
    const currentScene = sceneManager.getCurrentScene();
    
    // تلوين خلفية المشهد
    ctx.fillStyle = currentScene.background || '#121829';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // رسم عناصر العظام والشخصية عبر نظام الرندر
    const bones = currentScene.bones || Rig.defaultBones || [];
    renderScene(ctx, Rig, bones, sceneManager.currentSceneIndex);
}

// تحديث شريط المشاهد في القائمة الجانبية
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

// ربط أزرار الواجهة والوظائف التفاعلية
function initStudioInterface() {
    // زر إضافة مشهد جديد
    const addSceneBtn = document.getElementById('addSceneBtn');
    if (addSceneBtn) {
        addSceneBtn.onclick = () => {
            sceneManager.addScene();
            renderSceneTabs();
            updateStudio();
        };
    }

    // زر الحفظ السحابي عبر Supabase
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

    // تفعيل أدوات التحريك الجانبية
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
