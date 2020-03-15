import { EventHandler, EventsClient } from 'modloader64_api/EventHandler';
import {
    IModLoaderAPI,
    ICore,
    ModLoaderEvents,
} from 'modloader64_api/IModLoaderAPI';
import { CommandBuffer } from './src/CommandBuffer';
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

    commandBuffer!: CommandBuffer;
    payloads: string[] = new Array<string>();

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

    init(): void { 
        this.payloads.push(__dirname + '/src/asm/Hooks.payload');
        this.payloads.push(__dirname + '/src/asm/SuperMario64.payload');
    }

    postinit(): void {
        this.player = new CORE.Player(this.ModLoader.emulator);
        this.runtime = new CORE.Runtime(this.ModLoader.emulator);
        this.save = [
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_A]),
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_B]),
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_C]),
            new CORE.SaveFile(this.ModLoader.emulator, global.ModLoader[API.AddressType.FILE_D]),
        ];
        this.commandBuffer = new CommandBuffer(this.ModLoader.emulator);
        this.eventTicks.set('coreCommandBuffer', () => {
            this.commandBuffer.onTick();
        });
    }

    onTick(): void {
        this.eventTicks.forEach((value: Function, key: string) => {
            value();
        });
    }

    @EventHandler(ModLoaderEvents.ON_ROM_HEADER_PARSED)
    onModLoader_RomHeaderParsed(header: Buffer) { }

    @EventHandler(EventsClient.ON_INJECT_FINISHED)
    onCore_InjectFinished(evt: any) {
        // Clone old game-logic function to hook space (Romhack compatibility)
        let funLogic = this.ModLoader.emulator.rdramReadBuffer(0x2CB1C0, 0x1000);
        this.ModLoader.emulator.rdramWriteBuffer(0x801000, funLogic);
        
        // Inject puppet behavior
        this.ModLoader.emulator.rdramWrite32(0x800000, 0x00000000);
        this.ModLoader.emulator.rdramWrite32(0x800004, 0x11010001);
        this.ModLoader.emulator.rdramWrite32(0x800008, 0x23000000);
        this.ModLoader.emulator.rdramWrite32(0x80000C, 0x002500a0);
        this.ModLoader.emulator.rdramWrite32(0x800010, 0x0e2a0002);
        this.ModLoader.emulator.rdramWrite32(0x800014, 0x08000000);
        this.ModLoader.emulator.rdramWrite32(0x800018, 0x10050000);
        this.ModLoader.emulator.rdramWrite32(0x80001C, 0x102b0000);
        this.ModLoader.emulator.rdramWrite32(0x800020, 0x09000000);
        
        // Inject commandBuffer and hooks
        for (let i = 0; i < this.payloads.length; i++) {
            this.ModLoader.payloadManager.parseFile(this.payloads[i]);
        }
    }
}

export default SuperMario64;
