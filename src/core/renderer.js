export function renderScene(ctx, rig, onionSkinFrames = [], currentFrameIndex = 0) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    onionSkinFrames.forEach((frame, idx) => {
        ctx.save();
        ctx.globalAlpha = 0.2 + (idx * 0.05);
        ctx.strokeStyle = '#e94560';
        drawSkeleton(ctx, frame.bones, rig.textures);
        ctx.restore();
    });

    drawSkeleton(ctx, rig.bones, rig.textures);
}

function drawSkeleton(ctx, bones, textures) {
    bones.forEach(bone => {
        if (bone.parent !== null) {
            const parent = bones[bone.parent];
            ctx.beginPath();
            ctx.moveTo(parent.x, parent.y);
            ctx.lineTo(bone.x, bone.y);
            ctx.strokeStyle = '#0f3460';
            ctx.lineWidth = 6;
            ctx.stroke();
        }
    });

    bones.forEach(bone => {
        ctx.save();
        ctx.translate(bone.x, bone.y);
        
        if (textures && textures[bone.id]) {
            const img = textures[bone.id];
            ctx.drawImage(img, -20, -20, 40, 40);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#e94560';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        ctx.restore();
    });
}
