import { TimelineManager } from '../animation/timeline.js';
import { Rig } from './rig.js';

export class Scene {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.background = '#121829';
        this.timeline = new TimelineManager();
        // نسخ هيكل الشخصية الافتراضي لهذا المشهد
        this.bones = JSON.parse(JSON.stringify(Rig.bones));
        this.audio = null;
    }
}

export class SceneManager {
    constructor() {
        this.scenes = [];
        this.currentSceneIndex = 0;
        
        // إنشاء المشهد الافتراضي الأول عند بدء المشروع
        this.addScene("المشهد 1 (البداية)");
    }

    addScene(name) {
        const newScene = new Scene(this.scenes.length + 1, name || `المشهد ${this.scenes.length + 1}`);
        this.scenes.push(newScene);
        this.currentSceneIndex = this.scenes.length - 1;
        return newScene;
    }

    getCurrentScene() {
        return this.scenes[this.currentSceneIndex];
    }

    switchScene(index) {
        if (index >= 0 && index < this.scenes.length) {
            this.currentSceneIndex = index;
            return this.getCurrentScene();
        }
        return null;
    }

    deleteScene(index) {
        if (this.scenes.length > 1) {
            this.scenes.splice(index, 1);
            if (this.currentSceneIndex >= this.scenes.length) {
                this.currentSceneIndex = this.scenes.length - 1;
            }
            return this.getCurrentScene();
        }
        return null; // لا يمكن حذف المشهد الأخير
    }
}
