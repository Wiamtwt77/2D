// src/core/rig.js

export const Rig = {
    bones: [
        { id: 'root', name: 'الجذع (Root)', x: 400, y: 250, rotation: 0, parent: null, image: null },
        { id: 'arm_l', name: 'اليد اليسرى', x: 350, y: 200, rotation: 0, parent: 'root', image: null },
        { id: 'arm_r', name: 'اليد اليمنى', x: 450, y: 200, rotation: 0, parent: 'root', image: null },
        { id: 'head', name: 'الرأس', x: 400, y: 150, rotation: 0, parent: 'root', image: null }
    ],

    // ربط صورة عينة بعظمة معينة
    attachImageToBone(boneId, imageObj) {
        const bone = this.bones.find(b => b.id === boneId);
        if (bone) {
            bone.image = imageObj;
            console.log(`تم ربط الصورة بنجاح بالعظمة: ${bone.name}`);
        }
    },

    // تحديث موقع أو زاوية عظمة
    updateBoneTransform(boneId, data) {
        const bone = this.bones.find(b => b.id === boneId);
        if (bone) {
            if (data.x !== undefined) bone.x = data.x;
            if (data.y !== undefined) bone.y = data.y;
            if (data.rotation !== undefined) bone.rotation = data.rotation;
        }
    }
};
