import { Entity } from '../../EntityComponentSystem/Entity';
import { Action } from '../Action';
import { Color } from '../../Color';
export declare class Flash implements Action {
    id: number;
    private _graphics;
    private _duration;
    private _stopped;
    private _started;
    private _entity;
    private _material;
    private _total;
    private _currentDuration;
    constructor(entity: Entity, color: Color, duration?: number);
    update(elapsed: number): void;
    isComplete(): boolean;
    stop(): void;
    reset(): void;
}
