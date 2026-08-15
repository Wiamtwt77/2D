// حساب حركة ذراع مكونة من مفصلين (كتف -> كوع -> يد) بطول ثابت ودوران حقيقي
export function solve2BoneIK(shoulder, elbow, hand, targetX, target5Y) {
    const dx = targetX - shoulder.x;
    const dy = target5Y - shoulder.y;
    const distance = Math.hypot(dx, dy);

    const l1 = elbow.length; // طول العظمة الأولى
    const l2 = hand.length;   // طول العظمة الثانية
    const maxLen = l1 + l2;

    let tx = targetX;
    let ty = target5Y;

    // منع تمدد الذراع إذا تجاوز الهدف أقصى طول
    if (distance > maxLen) {
        const angle = Math.atan2(dy, dx);
        tx = shoulder.x + Math.cos(angle) * maxLen;
        ty = shoulder.y + Math.sin(angle) * maxLen;
    }

    const dX2 = tx - shoulder.x;
    const dY2 = ty - shoulder.y;
    const dist2 = Math.hypot(dX2, dY2);

    // قانون جيب التمام لحساب زاوية الكوع بدقة
    const cosAngle = (dist2 * dist2 + l1 * l1 - l2 * l2) / (2 * dist2 * l1);
    const clampedCos = Math.max(-1, Math.min(1, cosAngle));
    const angle1 = Math.atan2(dY2, dX2);
    const angle2 = Math.acos(clampedCos);

    // تحديث إحداثيات الكوع ليحني الذراع بسلاسة
    const elbowAngle = angle1 - angle2;
    elbow.x = shoulder.x + Math.cos(elbowAngle) * l1;
    elbow.y = shoulder.y + Math.sin(elbowAngle) * l1;

    // تحديث إحداثيات اليد النهائية
    hand.x = tx;
    hand.y = ty;
}
