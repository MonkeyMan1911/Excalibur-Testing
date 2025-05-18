import { Ray } from '../Math/ray';
import { DeepRequired } from '../Util/Required';
import { Observable } from '../Util/Observable';
import { BoundingBox, Collider, CollisionProcessor, RayCastHit, RayCastOptions } from './Index';
import { PhysicsConfig } from './PhysicsConfig';
import { Vector } from '../Math/vector';
import { SpatialPartitionStrategy } from './Detection/SpatialPartitionStrategy';
export declare class PhysicsWorld {
    $configUpdate: Observable<Required<{
        enabled?: boolean;
        gravity?: Vector;
        solver?: import("./SolverStrategy").SolverStrategy;
        substep?: number;
        colliders?: Required<{
            compositeStrategy?: "separate" | "together";
        }>;
        continuous?: Required<{
            checkForFastBodies?: boolean;
            disableMinimumSpeedForFastBody?: boolean;
            surfaceEpsilon?: number;
        }>;
        bodies?: Required<{
            defaultMass?: number;
            sleepEpsilon?: number;
            wakeThreshold?: number;
            sleepBias?: number;
            canSleepByDefault?: boolean;
        }>;
        spatialPartition?: SpatialPartitionStrategy;
        sparseHashGrid?: import("./PhysicsConfig").SparseHashGridConfig;
        dynamicTree?: Required<{
            boundsPadding?: number;
            velocityMultiplier?: number;
        }>;
        arcade?: Required<{
            contactSolveBias?: import("./Index").ContactSolveBias;
        }>;
        realistic?: Required<{
            contactSolveBias?: import("./Index").ContactSolveBias;
            positionIterations?: number;
            velocityIterations?: number;
            slop?: number;
            steeringFactor?: number;
            warmStart?: boolean;
        }>;
    }>>;
    private _configDirty;
    private _config;
    get config(): DeepRequired<PhysicsConfig>;
    set config(newConfig: DeepRequired<PhysicsConfig>);
    private _collisionProcessor;
    /**
     * Spatial data structure for locating potential collision pairs and ray casts
     */
    get collisionProcessor(): CollisionProcessor;
    constructor(config: DeepRequired<PhysicsConfig>);
    /**
     * Raycast into the scene's physics world
     * @param ray
     * @param options
     */
    rayCast(ray: Ray, options?: RayCastOptions): RayCastHit[];
    /**
     * Query for colliders in the scene's physics world
     * @param point
     */
    query(point: Vector): Collider[];
    query(bounds: BoundingBox): Collider[];
}
