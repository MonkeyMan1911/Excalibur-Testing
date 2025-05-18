import { ImageFiltering } from './Filtering';
import { ImageWrapConfiguration } from './ImageSource';
import { SourceView } from './Sprite';
import { ImageWrapping } from './Wrapping';
import { Animation, AnimationOptions } from './Animation';
import { GraphicOptions } from './Graphic';
export interface TiledAnimationOptions {
    /**
     * Animation to tile
     */
    animation: Animation;
    /**
     * Optionally override source view on frame graphics
     */
    sourceView?: Partial<SourceView>;
    /**
     * Optionally override filtering options
     */
    filtering?: ImageFiltering;
    /**
     * Default wrapping is Repeat for TiledAnimation
     */
    wrapping?: ImageWrapConfiguration | ImageWrapping;
    /**
     * Total width in pixels for the tiling to take place
     */
    width: number;
    /**
     * Total height in pixels for the tiling to take place
     */
    height: number;
}
export declare class TiledAnimation extends Animation {
    private _ready;
    ready: Promise<void>;
    private _tiledWidth;
    private _tiledHeight;
    private _sourceView;
    constructor(options: GraphicOptions & Omit<AnimationOptions, 'frames'> & TiledAnimationOptions);
    static fromAnimation(animation: Animation, options?: Omit<TiledAnimationOptions, 'animation'>): TiledAnimation;
    private _updateSourceView;
    get sourceView(): Partial<SourceView>;
    set sourceView(sourceView: Partial<SourceView>);
    private _updateWidthHeight;
    get width(): number;
    get height(): number;
    set width(width: number);
    set height(height: number);
}
