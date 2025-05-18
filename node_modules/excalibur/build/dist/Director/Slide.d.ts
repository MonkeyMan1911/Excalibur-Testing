import { Engine } from '../Engine';
import { Scene } from '../Scene';
import { Transition, TransitionOptions } from './Transition';
import { EasingFunction } from '../Util/EasingFunctions';
export interface SlideOptions {
    /**
     * Duration of the transition in milliseconds
     */
    duration: number;
    /**
     * Slide direction for the previous scene to move: up, down, left, right
     */
    slideDirection: 'up' | 'down' | 'left' | 'right';
    /**
     * Optionally select an easing function, by default linear (aka lerp)
     */
    easingFunction?: EasingFunction;
}
/**
 * Slide`s between the previous scene and the destination scene
 *
 * Note: Slide` only works as an "in" transition
 */
export declare class Slide extends Transition {
    private _image;
    private _screenCover;
    private _easing;
    private _vectorEasing;
    readonly slideDirection: 'up' | 'down' | 'left' | 'right';
    constructor(options: TransitionOptions & SlideOptions);
    onPreviousSceneDeactivate(scene: Scene<unknown>): Promise<void>;
    private _destinationCameraPosition;
    private _startCameraPosition;
    private _camera;
    private _directionOffset;
    onInitialize(engine: Engine): void;
    onUpdate(progress: number): void;
}
