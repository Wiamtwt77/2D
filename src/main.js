import { rig } from './core/rig.js';
import { renderScene } from './core/renderer.js';
import { initTouchDrag } from './interaction/touchDrag.js';
import { initUploadPanel } from './ui/uploadPanel.js';
import { Timeline } from './animation/timeline.js';
import { interpolateBones } from './animation/easing.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timeline = new Timeline();

let onionSkinEnabled = false;

initUploadPanel(rig, () => {
    renderScene(ctx, rig, [], timeline.currentFrame);
});

initTouchDrag(canvas, rig, () => {
    renderScene(ctx, rig, getOnionSkins(), timeline.currentFrame);
});

document.getElementById('saveKeyframeBtn').addEventListener('click', () => {
    timeline.addKeyframe(rig.bones);
    updateFramesTrack();
    document.getElementById('frameCount').innerText = `الفريمات: ${timeline.getFrameCount()}`;
    document.getElementById('scrubBar').max = Math.max(1, timeline.getFrameCount() - 1);
});

document.getElementById('resetPoseBtn').addEventListener('click', () => {
    window.location.reload();
});

document.getElementById('onionBtn').addEventListener('click', () => {
    onionSkinEnabled = !onionSkinEnabled;
    document.getElementById('onionBtn').innerText = `🧅 قشر البصل: ${onionSkinEnabled ? 'مفعل' : 'معطل'}`;
    renderScene(ctx, rig, getOnionSkins(), timeline.currentFrame);
});

document.getElementById('scrubBar').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    if (timeline.getFrameCount() > 1) {
        const total = timeline.getFrameCount() - 1;
        const progress = val / total;
        const frameIdx1 = Math.floor(progress * total);
        const frameIdx2 = Math.min(total, frameIdx1 + 1);
        const subProgress = (progress * total) - frameIdx1;

        const easingType = document.getElementById('easingSelect').value;
        if (timeline.frames[frameIdx1] && timeline.frames[frameIdx2]) {
            rig.bones = interpolateBones(timeline.frames[frameIdx1], timeline.frames[frameIdx2], subProgress, easingType);
        }
    }
    renderScene(ctx, rig, getOnionSkins(), timeline.currentFrame);
});

function getOnionSkins() {
    if (!onionSkinEnabled || timeline.frames.length === 0) return [];
    return timeline.frames.slice(Math.max(0, timeline.currentFrame - 2), timeline.currentFrame);
}

function updateFramesTrack() {
    const track = document.getElementById('framesTrack');
    track.innerHTML = '';
    timeline.frames.forEach((_, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `frame-thumb ${idx === timeline.currentFrame ? 'active' : ''}`;
        thumb.innerText = `F${idx + 1}`;
        track.appendChild(thumb);
    });
}

renderScene(ctx, rig, [], 0);
