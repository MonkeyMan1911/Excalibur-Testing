import { Entity } from '../../EntityComponentSystem/Entity';
import { Action } from '../Action';
export declare class Die implements Action {
    id: number;
    private _entity;
    private _stopped;
    constructor(entity: Entity);
    update(elapsed: number): void;
    isComplete(): boolean;
    stop(): void;
    reset(): void;
}
