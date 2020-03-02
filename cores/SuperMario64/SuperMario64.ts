import { EventHandler, EventsClient } from 'modloader64_api/EventHandler';
import {
    IModLoaderAPI,
    ICore,
    ModLoaderEvents,
} from 'modloader64_api/IModLoaderAPI';
import { IRomHeader } from 'modloader64_api/IRomHeader';
import * as API from './API/Imports';
import * as CORE from './src/Imports';

export class SuperMario64 implements ICore, API.ISM64Core {
    header = 'SUPER MARIO 64';
    ModLoader: IModLoaderAPI = {} as IModLoaderAPI;
    eventTicks: Map<string, Function> = new Map<string, Function>();
    rom_header!: IRomHeader;

    player!: API.IPlayer;
    runtime!: API.IRuntime;
    save!: API.IBuffered[];
    version!: API.GameVersion;

    preinit(): void {
        switch (this.rom_header.country_code) {
            case 'J':
                this.version = API.GameVersion.JP_1_0;
                CORE.VersionHandler.load_jp_1_0();
                break;
            case 'P':
                this.version = API.GameVersion.PAL_1_0;
                CORE.VersionHandler.load_pal_1_0();
                break;
            case 'E':
                this.version = API.GameVersion.USA_1_0;
                CORE.VersionHandler.load_usa_1_0();
                break;
            default:
                this.version = API.GameVersion.USA_1_0;
                CORE.VersionHandler.load_usa_1_0();
                break;
        }
    }

    init(): void { }

    postinit(): void {
        this.player = new CORE.Player(this.ModLoader.emulator);
        this.runtime = new CORE.Runtime(this.ModLoader.emulator);
        this.save = [
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_A]),
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_B]),
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_C]),
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_D]),
        ];
    }

    onTick(): void {
        this.eventTicks.forEach((value: Function, key: string) => {
            value();
        });
    }

    @EventHandler(ModLoaderEvents.ON_ROM_HEADER_PARSED)
    onModLoader_RomHeaderParsed(header: Buffer) { }

    @EventHandler(EventsClient.ON_INJECT_FINISHED)
    onCore_InjectFinished(evt: any) { }
}

export default SuperMario64;
