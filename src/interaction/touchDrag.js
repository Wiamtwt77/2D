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
        selectedBone = rig.bones.find(bone => {
            const dist = Math.hypot(bone.x - pos.x, bone.y - pos.y);
            return dist < 20;
        });
        if (selectedBone) isDragging = true;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || !selectedBone) return;
        const pos = getMousePos(e);
        selectedBone.x = pos.x;
        selectedBone.y = pos.y;
        if (onDragUpdate) onDragUpdate();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        selectedBone = null;
    });
}
