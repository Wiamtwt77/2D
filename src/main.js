import { SceneManager } from './core/sceneManager.js';
import { saveProject } from './services/projectService.js';

// 1. تهيئة الكانفاس وسياق الرسم
const canvas = document.getElementById('canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// 2. تهيئة مدير المشاهد
const sceneManager = new SceneManager();

// 3. رسم المشهد الحالي
function drawCurrentScene() {
    if (!ctx || !canvas) return;

    // مسح الكانفاس
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // الحصول على المشهد الحالي
    const currentScene = sceneManager.getCurrentScene();

    if (!currentScene) {
        return;
    }

    // لون الخلفية
    ctx.fillStyle = currentScene.background || '#121829';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // رسم العظام الموجودة في المشهد
    if (Array.isArray(currentScene.bones)) {
        currentScene.bones.forEach((bone) => {
            if (!bone) return;

            const x = Number.isFinite(bone.x) ? bone.x : 150;
            const y = Number.isFinite(bone.y) ? bone.y : 150;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                8,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = '#e94560';
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.closePath();
        });
    }
}


// 4. تحديث قائمة المشاهد
function renderSceneTabs() {
    const list = document.getElementById('scenesList');

    if (!list) return;

    list.innerHTML = '';

    sceneManager.scenes.forEach((scene, index) => {

        const btn = document.createElement('button');

        btn.className =
            `scene-tab ${
                index === sceneManager.currentSceneIndex
                    ? 'active'
                    : ''
            }`;

        btn.innerText = `🎬 ${scene.name}`;

        btn.onclick = () => {

            sceneManager.switchScene(index);

            renderSceneTabs();
            drawCurrentScene();
        };

        list.appendChild(btn);
    });
}


// 5. ربط أحداث الواجهة
function initStudioEvents() {

    // =========================
    // إضافة مشهد
    // =========================

    const addSceneBtn =
        document.getElementById('addSceneBtn');

    if (addSceneBtn) {

        addSceneBtn.onclick = () => {

            sceneManager.addScene();

            renderSceneTabs();
            drawCurrentScene();
        };
    }


    // =========================
    // حفظ المشروع في Supabase
    // =========================

    const saveCloudBtn =
        document.getElementById('saveCloudBtn');

    const saveStatus =
        document.getElementById('saveStatus');

    const projectNameInput =
        document.getElementById('projectNameInput');


    if (saveCloudBtn) {

        saveCloudBtn.onclick = async () => {

            try {

                saveCloudBtn.innerText =
                    'جاري الحفظ...';

                saveCloudBtn.disabled = true;


                const projectName =
                    projectNameInput?.value ||
                    'مشروع استوديو التحريك';


                const scenesData =
                    sceneManager.scenes;


                const result =
                    await saveProject(
                        projectName,
                        scenesData
                    );


                if (saveStatus) {

                    saveStatus.innerText =
                        'تم الحفظ بنجاح في السحابة!';

                    saveStatus.style.color =
                        '#2ea043';
                }


                console.log(
                    'تم الحفظ بنجاح، المعرف:',
                    result?.id
                );

            } catch (error) {

                console.error(
                    'خطأ أثناء الحفظ:',
                    error
                );


                if (saveStatus) {

                    saveStatus.innerText =
                        'فشل الحفظ!';

                    saveStatus.style.color =
                        '#f85149';
                }

            } finally {

                saveCloudBtn.innerText =
                    'حفظ في السحابة';

                saveCloudBtn.disabled = false;
            }
        };
    }


    // =========================
    // أدوات التحريك
    // =========================

    const toolBtns =
        document.querySelectorAll('.tool-btn');


    toolBtns.forEach((btn) => {

        btn.onclick = () => {

            toolBtns.forEach((button) => {
                button.classList.remove('active');
            });

            btn.classList.add('active');
        };
    });
}


// 6. التشغيل الأولي
function initStudio() {

    renderSceneTabs();

    drawCurrentScene();

    initStudioEvents();
}


// بدء التطبيق
initStudio();
