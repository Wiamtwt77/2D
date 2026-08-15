export class Timeline {
    constructor() {
        this.frames = [];
        this.currentFrame = 0;
        this.isPlaying = false;
        this.fps = 30;
    }

    addKeyframe(bonesData) {
        const snapshot = JSON.parse(JSON.stringify(bonesData));
        this.frames.push(snapshot);
        this.currentFrame = this.frames.length - 1;
        return this.currentFrame;
    }

    clear() {
        this.frames = [];
        this.currentFrame = 0;
    }

    getFrameCount() {
        return this.frames.length;
    }
}
