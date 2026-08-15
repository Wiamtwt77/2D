export const rig = {
    bones: [
        { id: 0, name: 'الحوض (Pelvis)', x: 425, y: 220, length: 0, parent: null },
        { id: 1, name: 'الجذع (Torso)', x: 425, y: 160, length: 60, parent: 0 },
        { id: 2, name: 'الرأس (Head)', x: 425, y: 100, length: 60, parent: 1 },
        { id: 3, name: 'الكتف الأيمن (Right Shoulder)', x: 395, y: 150, length: 30, parent: 1 },
        { id: 4, name: 'اليد اليمنى العليا (R. Upper Arm)', x: 360, y: 180, length: 45, parent: 3 },
        { id: 5, name: 'اليد اليمنى السفلى (R. Lower Arm)', x: 330, y: 220, length: 45, parent: 4 },
        { id: 6, name: 'الكتف الأيسر (Left Shoulder)', x: 455, y: 150, length: 30, parent: 1 },
        { id: 7, name: 'اليد اليسرى العليا (L. Upper Arm)', x: 490, y: 180, length: 45, parent: 6 },
        { id: 8, name: 'اليد اليسرى السفلى (L. Lower Arm)', x: 520, y: 220, length: 45, parent: 7 },
        { id: 9, name: 'الفخذ الأيمن (Right Thigh)', x: 405, y: 230, length: 60, parent: 0 },
        { id: 10, name: 'الساق اليمنى (Right Shin)', x: 405, y: 300, length: 70, parent: 9 },
        { id: 11, name: 'الفخذ الأيسر (Left Thigh)', x: 445, y: 230, length: 60, parent: 0 },
        { id: 12, name: 'الساق اليسرى (Left Shin)', x: 445, y: 300, length: 70, parent: 11 }
    ],
    textures: {}
};
