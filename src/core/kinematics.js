export function applyIK(bone, targetX, targetY) {
    const dx = targetX - bone.x;
    const dy = targetY - bone.y;
    const angle = Math.atan2(dy, dx);
    
    bone.x = targetX - Math.cos(angle) * bone.length;
    bone.y = targetY - Math.sin(angle) * bone.length;
}

export function updateBoneHierarchy(bones) {
    bones.forEach(bone => {
        if (bone.parent !== null) {
            const parent = bones[bone.parent];
        }
    });
}
