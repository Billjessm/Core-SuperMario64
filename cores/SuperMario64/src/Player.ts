import * as API from '../API/Imports';

export class Player extends API.BaseObj implements API.IPlayer {
    private instance: number = global.ModLoader[API.AddressType.PLAYER];
    private anim_addr = 0x3C;
    private anim_frame_addr = 0x40;
    private pos_x_addr = 0xA0;
    private pos_y_addr = 0xA4;
    private pos_z_addr = 0xA8;
    private rot_x_addr = 0xD0;
    private rot_y_addr = 0xD4;
    private rot_z_addr = 0xD8;
    private translucency_addr = 0x017c;
    private visible_addr = 0x02;

    get exists(): boolean {
        return this.emulator.rdramRead32(this.instance) !== 0x0;
    }

    get animation(): Buffer {
        return Buffer.alloc(0);
    }
    set animation(val: Buffer) {
        // Do nothing until further notice
    }

    get animation_frame(): Buffer {
        return this.emulator.rdramReadPtrBuffer(this.instance, this.anim_frame_addr, 8);
    }
    set animation_frame(val: Buffer) {
        this.emulator.rdramWritePtrBuffer(this.instance, this.anim_frame_addr, val);
    }

    get cap(): number {
        return 0;
    }
    set cap(val: number) {
        return;
    }

    get position(): Buffer {
        let buf: Buffer = Buffer.alloc(12);
        buf.writeUInt32BE(this.emulator.rdramReadPtr32(this.instance, this.pos_x_addr), 0);
        buf.writeUInt32BE(this.emulator.rdramReadPtr32(this.instance, this.pos_y_addr), 4);
        buf.writeUInt32BE(this.emulator.rdramReadPtr32(this.instance, this.pos_z_addr), 8);
        return buf;
    }
    set position(val: Buffer) {
        this.emulator.rdramWritePtrBuffer(this.instance, this.pos_x_addr, val.slice(0, 4));
        this.emulator.rdramWritePtrBuffer(this.instance, this.pos_y_addr, val.slice(4, 8));
        this.emulator.rdramWritePtrBuffer(this.instance, this.pos_z_addr, val.slice(8, 12));
    }

    get pos_x(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.pos_x_addr);
    }
    set pos_x(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.pos_x_addr, val);
    }

    get pos_y(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.pos_y_addr);
    }
    set pos_y(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.pos_y_addr, val);
    }

    get pos_z(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.pos_z_addr);
    }
    set pos_z(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.pos_z_addr, val);
    }

    get rotation(): Buffer {
        let buf: Buffer = Buffer.alloc(12);
        buf.writeUInt32BE(this.emulator.rdramReadPtr32(this.instance, this.rot_x_addr), 0);
        buf.writeUInt32BE(this.emulator.rdramReadPtr32(this.instance, this.rot_y_addr), 4);
        buf.writeUInt32BE(this.emulator.rdramReadPtr32(this.instance, this.rot_z_addr), 8);
        return buf;
    }
    set rotation(val: Buffer) {
        this.emulator.rdramWritePtrBuffer(this.instance, this.rot_x_addr, val.slice(0, 4));
        this.emulator.rdramWritePtrBuffer(this.instance, this.rot_y_addr, val.slice(4, 8));
        this.emulator.rdramWritePtrBuffer(this.instance, this.rot_z_addr, val.slice(8, 12));
    }

    get rot_x(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.rot_x_addr);
    }
    set rot_x(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.rot_x_addr, val);
    }

    get rot_y(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.rot_y_addr);
    }
    set rot_y(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.rot_y_addr, val);
    }

    get rot_z(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.rot_z_addr);
    }
    set rot_z(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.rot_z_addr, val);
    }

    get translucency(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.translucency_addr);
    }
    set translucency(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.translucency_addr, val);
    }

    get visible(): boolean {
        return this.emulator.rdramReadPtr16(this.instance, this.visible_addr) === 0x21;
    }
    set visible(val: boolean) {
        this.emulator.rdramWritePtr16(this.instance, this.visible_addr, val ? 0x21 : 0x20)
    }    
}