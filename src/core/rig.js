export const rig = {
    bones: [
        { id: 0, name: 'الجذع/الحوض (Root)', x: 425, y: 220, length: 0, parent: null },
        { id: 1, name: 'الكتف الأيمن', x: 395, y: 150, length: 30, parent: 0 },
        { id: 2, name: 'الاليد العليا (R. Upper Arm)', x: 350, y: 180, length: 50, parent: 1 },
        { id: 3, name: 'اليد السفلى واليد (R. Hand)', x: 310, y: 210, length: 50, parent: 2 },
        
        { id: 4, name: 'الكتف الأيسر', x: 455, y: 150, length: 30, parent: 0 },
        { id: 5, name: 'اليد اليسرى العليا (L. Upper Arm)', x: 500, y: 180, length: 50, parent: 4 },
        { id: 6, name: 'اليد اليسرى السفلى (L. Hand)', x: 540, y: 210, length: 50, parent: 5 },
    ],
    textures: {}
};
