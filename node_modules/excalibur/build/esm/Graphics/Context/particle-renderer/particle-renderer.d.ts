import { ExcaliburGraphicsContextWebGL } from '../ExcaliburGraphicsContextWebGL';
import { RendererPlugin } from '../renderer';
import { GpuParticleRenderer } from '../../../Particles/GpuParticleRenderer';
export declare class ParticleRenderer implements RendererPlugin {
    readonly type: "ex.particle";
    priority: number;
    private _gl;
    private _context;
    private _shader;
    initialize(gl: WebGL2RenderingContext, context: ExcaliburGraphicsContextWebGL): void;
    private _getTexture;
    draw(renderer: GpuParticleRenderer, elapsed: number): void;
    hasPendingDraws(): boolean;
    flush(): void;
    dispose(): void;
}
