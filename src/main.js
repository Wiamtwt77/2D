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
    
    // رسم العظام الافتراضية الخاصة بالمشهد
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

// 4. تحديث شريط عرض المشاهد في الواجهة
function renderSceneTabs() {
    const list = document.getElementById('scenesList');
    if (!list) return;
    
    list.innerHTML = ''; // تفريغ الشريط القديم
    
    sceneManager.scenes.forEach((scene, index) => {
        const btn = document.createElement('button');
        btn.className = `scene-tab ${index === sceneManager.currentSceneIndex ? 'active' : ''}`;
        btn.innerText = `🎬 ${scene.name}`;
        
        // عند الضغط على أي مشهد يتم التبديل إليه
        btn.onclick = () => {
            sceneManager.switchScene(index);
            renderSceneTabs();
            drawCurrentScene();
        };
        list.appendChild(btn);
    });
}

// 5. ربط زر إضافة مشهد جديد
const addSceneBtn = document.getElementById('addSceneBtn');
if (addSceneBtn) {
    addSceneBtn.addEventListener('click', () => {
        sceneManager.addScene();
        renderSceneTabs();
        drawCurrentScene();
    });
}

// 6. دالة اختبار الحفظ في سوبابايز تلقائياً عند التشغيل
async function testSupabaseConnection() {
    try {
        console.log("جاري محاولة الحفظ في سوبابايز...");
        const scenesData = sceneManager.scenes;
        const result = await saveProject("مشروع استوديو التحريك", scenesData);
        console.log("تم الحفظ بنجاح في السحابة! معرف المشروع:", result.id);
    } catch (error) {
        console.error("فشل الاتصال أو الحفظ في سوبابايز:", error);
    }
}

// 7. التشغيل الأولي للتطبيق
function initStudio() {
    renderSceneTabs();
    drawCurrentScene();
    testSupabaseConnection();
}

initStudio();
