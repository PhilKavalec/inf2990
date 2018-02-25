import { AbstractLightingConfig } from "./abstractConfig";

export class NightConfig extends AbstractLightingConfig {
    public readonly AMBIENT_LIGHT_INTENSITY: number = 0.05;
    public readonly DIRECTIONAL_LIGHT_INTENSITY: number = 0.2;
}
