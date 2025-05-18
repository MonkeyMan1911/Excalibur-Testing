import { Entity } from '../../EntityComponentSystem/Entity';
import { Action } from '../Action';
export declare class Meet implements Action {
    id: number;
    private _tx;
    private _motion;
    private _meetTx;
    private _meetMotion;
    x: number;
    y: number;
    private _current;
    private _end;
    private _dir;
    private _speed;
    private _distanceBetween;
    private _started;
    private _stopped;
    private _speedWasSpecified;
    constructor(actor: Entity, actorToMeet: Entity, speed?: number);
    update(elapsed: number): void;
    isComplete(): boolean;
    stop(): void;
    reset(): void;
}
