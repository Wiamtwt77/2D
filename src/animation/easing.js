export const easing = {
    linear: t => t,
    easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};

export function interpolateBones(bonesA, bonesB, progress, easingType = 'easeInOut') {
    const easeFunc = easing[easingType] || easing.easeInOut;
    const p = easeFunc(progress);

    return bonesA.map((boneA, index) => {
        const boneB = bonesB[index];
        return {
            ...boneA,
            x: boneA.x + (boneB.x - boneA.x) * p,
            y: boneA.y + (boneB.y - boneA.y) * p
        };
    });
}
