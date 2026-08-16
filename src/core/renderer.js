// src/core/renderer.js

export function renderScene(ctx, rig, currentSceneIndex) {
    if (!ctx) return;

    // رسم خطوط الربط بين العظام (الأب والابن)
    rig.bones.forEach(bone => {
        if (bone.parent) {
            const parentBone = rig.bones.find(b => b.id === bone.parent);
            if (parentBone) {
                ctx.beginPath();
                ctx.moveTo(parentBone.x, parentBone.y);
                ctx.lineTo(bone.x, bone.y);
                ctx.strokeStyle = '#30363d';
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.closePath();
            }
        }
    });

    // رسم مفاصل العظام والصور المرتبطة بها
    rig.bones.forEach(bone => {
        ctx.save();
        ctx.translate(bone.x, bone.y);
        ctx.rotate((bone.rotation * Math.PI) / 180);

        // إذا كانت هناك صورة مربوطة بالعظمة، يتم رسمها مع مراعاة التمحور
        if (bone.image) {
            ctx.drawImage(bone.image, -25, -25, 50, 50);
        } else {
            // رسم دائرة العظمة الافتراضية
            ctx.beginPath();
            ctx.arc(0, 0, 7, 0, Math.PI * 2);
            ctx.fillStyle = '#2f81f7';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            ctx.closePath();
        }

        ctx.restore();
    });
}
