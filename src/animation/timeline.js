// src/animation/timeline.js

export class TimelineManager {
    constructor(onFrameUpdate) {
        this.currentFrame = 0;
        this.totalFrames = 50;
        this.isPlaying = false;
        this.fps = 30;
        this.keyframes = {}; // مثال: { 0: {boneId: {x, y, rotation}}, 15: {...} }
        this.onFrameUpdate = onFrameUpdate;
        this.timer = null;
    }

    addKeyframe(frameIndex, boneId, transformData) {
        if (!this.keyframes[frameIndex]) {
            this.keyframes[frameIndex] = {};
        }
        this.keyframes[frameIndex][boneId] = { ...transformData };
        console.log(`تم إضافة كيفريم عند الإطار ${frameIndex} للعظمة ${boneId}`);
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        const interval = 1000 / this.fps;

        this.timer = setInterval(() => {
            this.currentFrame++;
            if (this.currentFrame > this.totalFrames) {
                this.currentFrame = 0; // إعادة التكرار
            }
            if (this.onFrameUpdate) {
                this.onFrameUpdate(this.currentFrame);
            }
        }, interval);
    }

    pause() {
        this.isPlaying = false;
        clearInterval(this.timer);
    }

    setFrame(frame) {
        this.currentFrame = frame;
        if (this.onFrameUpdate) {
            this.onFrameUpdate(this.currentFrame);
        }
    }
}
