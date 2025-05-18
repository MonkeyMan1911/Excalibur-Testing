import { FrameStats } from '../../Debug/DebugConfig';
import { Entity } from '../../EntityComponentSystem';
import { ExcaliburGraphicsContext } from '../../Graphics/Context/ExcaliburGraphicsContext';
import { Ray } from '../../Math/ray';
import { Vector } from '../../Math/vector';
import { Pool } from '../../Util/Pool';
import { BodyComponent } from '../BodyComponent';
import { BoundingBox } from '../BoundingBox';
import { Collider } from '../Colliders/Collider';
import { CollisionType } from '../CollisionType';
import { CollisionContact } from './CollisionContact';
import { CollisionProcessor } from './CollisionProcessor';
import { Pair } from './Pair';
import { RayCastHit } from './RayCastHit';
import { RayCastOptions } from './RayCastOptions';
import { HashGridCell, HashGridProxy, SparseHashGrid } from './SparseHashGrid';
/**
 * Proxy type to stash collision info
 */
export declare class HashColliderProxy extends HashGridProxy<Collider> {
    collider: Collider;
    id: number;
    owner: Entity;
    body: BodyComponent;
    collisionType: CollisionType;
    hasZeroBounds: boolean;
    /**
     * left bounds x hash coordinate
     */
    leftX: number;
    /**
     * right bounds x hash coordinate
     */
    rightX: number;
    /**
     * bottom bounds y hash coordinate
     */
    bottomY: number;
    /**
     * top bounds y hash coordinate
     */
    topY: number;
    /**
     * References to the hash cell the collider is a current member of
     */
    cells: HashGridCell<Collider, HashColliderProxy>[];
    /**
     * Grid size in pixels
     */
    readonly gridSize: number;
    constructor(collider: Collider, gridSize: number);
    /**
     * Updates the hashed bounds coordinates
     */
    update(): void;
}
/**
 * This collision processor uses a sparsely populated grid of uniform cells to bucket potential
 * colliders together for the purpose of detecting collision pairs and collisions.
 */
export declare class SparseHashGridCollisionProcessor implements CollisionProcessor {
    readonly gridSize: number;
    readonly hashGrid: SparseHashGrid<Collider, HashColliderProxy>;
    private _pairs;
    private _nonPairs;
    _pairPool: Pool<Pair>;
    constructor(options: {
        size: number;
    });
    getColliders(): readonly Collider[];
    query(point: Vector): Collider[];
    query(bound: BoundingBox): Collider[];
    rayCast(ray: Ray, options?: RayCastOptions): RayCastHit[];
    /**
     * Adds the collider to the internal data structure for collision tracking
     * @param target
     */
    track(target: Collider): void;
    /**
     * Removes a collider from the internal data structure for tracking collisions
     * @param target
     */
    untrack(target: Collider): void;
    private _canCollide;
    /**
     * Runs the broadphase sweep over tracked colliders and returns possible collision pairs
     * @param targets
     * @param elapsed
     */
    broadphase(targets: Collider[], elapsed: number): Pair[];
    /**
     * Runs a fine grain pass on collision pairs and does geometry intersection tests producing any contacts
     * @param pairs
     * @param stats
     */
    narrowphase(pairs: Pair[], stats?: FrameStats): CollisionContact[];
    /**
     * Perform data structure maintenance, returns number of colliders updated
     */
    update(targets: Collider[], elapsed: number): number;
    /**
     * Draws the internal data structure
     * @param ex
     * @param elapsed
     */
    debug(ex: ExcaliburGraphicsContext, elapsed: number): void;
}
