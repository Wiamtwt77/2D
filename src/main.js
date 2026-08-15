import { rig } from './core/rig.js';
import { renderScene } from './core/renderer.js';
import { initTouchDrag } from './interaction/touchDrag.js';
import { initUploadPanel } from './ui/uploadPanel.js';
import { Timeline } from './animation/timeline.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timeline = new Timeline();

let isPlaying = false;
let playInterval = null;

// تهيئة اللوحة الأساسية
initUploadPanel(rig, () => {
    updateScene();
});

// عند سحب العظمة وانتهائها (Mouse Up)، يتم تسجيل Keyframe تلقائياً في الزمن الحالي!
initTouchDrag(canvas, rig, () => {
    updateScene();
}, () => {
    // حدث عند الانتهاء من السحب (Auto-Keyframing)
    timeline.setKeyframe(timeline.currentTime, rig.bones);
    updateKeyframeUI();
});

// شريط التحكم بالزمن (Scrubber)
const timeScrubber = document.getElementById('timeScrubber');
timeScrubber.addEventListener('input', (e) => {
    timeline.currentTime = parseFloat(e.target.value);
    document.getElementById('timeDisplayinnerText').innerText = `الوقت: ${timeline.currentTime.toFixed(1)}s`;
    
    // جلب وضعية الشخصية المحسوبة في هذا الوقت بالذات
    const evaluatedBones = timeline.evaluate(timeline.currentTime);
    if (evaluatedBones) {
        rig.bones = evaluatedBones;
    }
    renderScene(ctx, rig, [], 0);
});

// زر التشغيل (Play)
document.getElementById('playBtn').addEventListener('click', () => {
    if (isPlaying) {
        clearInterval(playInterval);
        isPlaying = false;
        document.getElementById('playBtn').innerText = '▶️ تشغيل المشهد';
        return;
    }

    if (timeline.getKeyframeCount() < 2) {
        alert('يرجى تحريك الشخصية في أوقات مختلفة أولاً لإنشاء حركات مفتاحية (Keyframes)!');
        return;
    }

    isPlaying = true;
    document.getElementById('playBtn').innerText = '⏸️ إيقاف مؤقت';
    timeline.currentTime = 0;

    playInterval = setInterval(() => {
        timeline.currentTime += 0.1;
        if (timeline.currentTime > timeline.duration) {
            timeline.currentTime = 0;
        }
        timeScrubber.value = timeline.currentTime;
        document.getElementById('timeDisplay').innerText = `الوقت: ${timeline.currentTime.toFixed(1)}s`;

        const evaluatedBones = timeline.evaluate(timeline.currentTime);
        if (evaluatedBones) {
            rig.bones = evaluatedBones;
        }
        renderScene(ctx, rig, [], 0);
    }, 100);
});

document.getElementById('resetPoseBtn').addEventListener('click', () => {
    window.location.reload();
});

document.getElementById('clearTimelineBtn').addEventListener('click', () => {
    timeline.clear();
    updateKeyframeUI();
    renderScene(ctx, rig, [], 0);
});

function updateKeyframeUI() {
    document.getElementById('keyframeCount').innerText = `الـ Keyframes: ${timeline.getKeyframeCount()}`;
}

function updateScene() {
    renderScene(ctx, rig, [], 0);
    import { saveProject } from './services/projectService.js';

// دالة تجريبية للتأكد من الربط
async function testConnection() {
    const mockScenes = [{ name: "مشهد تجريبي", bones: [] }];
    try {
        console.log("جاري محاولة الحفظ في سوبابايز...");
        const result = await saveProject("مشروع اختباري", mockScenes);
        console.log("تم الحفظ بنجاح! معرف المشروع هو:", result.id);
    } catch (error) {
        console.error("حدث خطأ أثناء الربط:", error);
    }
}

// استدعي الدالة
testConnection();
}

// العرض الأولي
updateScene();
