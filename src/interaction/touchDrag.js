import { solve2BoneIK } from '../core/kinematics.js';

export function initTouchDrag(canvas, rig, onDragUpdate) {
    let selectedBone = null;
    let isDragging = false;

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    canvas.addEventListener('mousedown', (e) => {
        const pos = getMousePos(e);
        // نحدد العظمة التي تم النقر عليها (مثلاً اليد اليمنى ID: 3 أو اليسرى ID: 6)
        selectedBone = rig.bones.find(bone => {
            const dist = Math.hypot(bone.x - pos.x, bone.y - pos.y);
            return dist < 25;
        });
        if (selectedBone) isDragging = true;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || !selectedBone) return;
        const pos = getMousePos(e);

        if (selectedBone.id === 3) {
            // سحب اليد اليمنى مع تطبيق الـ IK على الكتف (1) والكوع (2) واليد (3)
            solve2BoneIK(rig.bones[1], rig.bones[2], rig.bones[3], pos.x, pos.y);
        } else if (selectedBone.id === 6) {
            // سحب اليد اليسرى
            solve2BoneIK(rig.bones[4], rig.bones[5], rig.bones[6], pos.x, pos.y);
        } else {
            // تحريك عادية لباقي الأجزاء
            selectedBone.x = pos.x;
            selectedBone.y = pos.y;
        }

        if (onDragUpdate) onDragUpdate();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        selectedBone = null;
    });
}
