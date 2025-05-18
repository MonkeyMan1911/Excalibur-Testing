import { Color } from '../../Color';
import { ExcaliburGraphicsContextState } from './ExcaliburGraphicsContext';
import { Material } from './material';
export declare class ContextState implements ExcaliburGraphicsContextState {
    opacity: number;
    z: number;
    tint: Color | null | undefined;
    material: Material | null | undefined;
}
export declare class StateStack {
    private _pool;
    current: ExcaliburGraphicsContextState;
    private _states;
    private _cloneState;
    save(): void;
    restore(): void;
}
