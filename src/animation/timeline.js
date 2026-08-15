import { interpolateBones } from './easing.js';

export class Timeline {
    constructor() {
        this.keyframes = {}; // مفتاحها هو الوقت بالثواني (مثلاً: 0.0, 1.2)
        this.currentTime = 0.0;
        this.duration = 5.0;
    }

    // تسجيل فريم مفتاحي تلقائياً عند الوقت الحالي
    setKeyframe(time, bonesData) {
        const roundedTime = Math.round(time * 10) / 10;
        this.keyframes[roundedTime] = JSON.parse(JSON.stringify(bonesData));
    }

    clear() {
        this.keyframes = {};
        this.currentTime = 0.0;
    }

    getKeyframeCount() {
        return Object.keys(this.keyframes).length;
    }

    // حساب الحالة الحالية للشخصية في أي جزء من الثانية عبر الـ Interpolation
    evaluate(time) {
        const times = Object.keys(this.keyframes).map(Number).sort((a, b) => a - b);
        
        if (times.length === 0) return null;
        if (times.length === 1 || time <= times[0]) return this.keyframes[times[0]];
        if (time >= times[times.length - 1]) return this.keyframes[times[times.length - 1]];

        // البحث عن أقرب نقطتي Keyframe ليتم الدمج بينهما بسلاسة
        let t1 = times[0];
        let t2 = times[times.length - 1];

        for (let i = 0; i < times.length - 1; i++) {
            if (time >= times[i] && time <= times[i + 1]) {
                t1 = times[i];
                t2 = times[i + 1];
                break;
            }
        }

        const progress = (time - t1) / (t2 - t1);
        return interpolateBones(this.keyframes[t1], this.keyframes[t2], progress);
    }
}
