import { Entity } from '../../EntityComponentSystem/Entity';
import { Action } from '../Action';
export declare class Fade implements Action {
    id: number;
    private _graphics;
    private _endOpacity;
    private _remainingTime;
    private _originalTime;
    private _multiplier;
    private _started;
    private _stopped;
    constructor(entity: Entity, endOpacity: number, duration: number);
    update(elapsed: number): void;
    isComplete(): boolean;
    stop(): void;
    reset(): void;
}
