import * as API from '../API/Imports';

export class Player extends API.BaseObj implements API.IPlayer {
    private instance: number = global.ModLoader[API.AddressType.PLAYER];
    private height_addr = 0x3A;
    private pos_x_addr = 0xA0;
    private pos_y_addr = 0xA4;
    private pos_z_addr = 0xA8;
    private rot_x_addr = 0xD0;
    private rot_y_addr = 0xD4;
    private rot_z_addr = 0xD8;

    get exists(): boolean {
        return this.emulator.rdramRead32(this.instance) !== 0x0;
    }

    get animation(): Buffer {
        return Buffer.from([this.anim_frame, this.anim_id]);
    }
    set animation(val: Buffer) {
        this.anim_frame = val[0];
        this.anim_id = val[1];
    }

    get anim_frame(): number {
        return 0;
    }
    set anim_frame(val: number) {
        return;
    }

    get anim_id(): number {
        return 0;
    }
    set anim_id(val: number) {
        return;
    }

    get height(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.height_addr);
    }
    set height(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.height_addr, val);
    }

    get position(): Buffer {
        let buf: Buffer = Buffer.alloc(12);
        buf.writeFloatBE(this.emulator.rdramReadPtrF32(this.instance, this.pos_x_addr), 0);
        buf.writeFloatBE(this.emulator.rdramReadPtrF32(this.instance, this.pos_y_addr), 4);
        buf.writeFloatBE(this.emulator.rdramReadPtrF32(this.instance, this.pos_z_addr), 8);
        return buf;
    }
    set position(val: Buffer) {
        this.emulator.rdramWritePtrBuffer(this.instance, this.pos_x_addr, val.slice(0, 4));
        this.emulator.rdramWritePtrBuffer(this.instance, this.pos_y_addr, val.slice(4, 8));
        this.emulator.rdramWritePtrBuffer(this.instance, this.pos_z_addr, val.slice(8, 12));
    }

    get pos_x(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.pos_x_addr);
    }
    set pos_x(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.pos_x_addr, val);
    }

    get pos_y(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.pos_y_addr);
    }
    set pos_y(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.pos_y_addr, val);
    }

    get pos_z(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.pos_z_addr);
    }
    set pos_z(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.pos_z_addr, val);
    }

    get rotation(): Buffer {
        let buf: Buffer = Buffer.alloc(12);
        buf.writeFloatBE(this.emulator.rdramReadPtrF32(this.instance, this.rot_x_addr), 0);
        buf.writeFloatBE(this.emulator.rdramReadPtrF32(this.instance, this.rot_y_addr), 4);
        buf.writeFloatBE(this.emulator.rdramReadPtrF32(this.instance, this.rot_z_addr), 8);
        return buf;
    }
    set rotation(val: Buffer) {
        this.emulator.rdramWritePtrBuffer(this.instance, this.rot_x_addr, val.slice(0, 4));
        this.emulator.rdramWritePtrBuffer(this.instance, this.rot_y_addr, val.slice(4, 8));
        this.emulator.rdramWritePtrBuffer(this.instance, this.rot_z_addr, val.slice(8, 12));
    }

    get rot_x(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.rot_x_addr);
    }
    set rot_x(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.rot_x_addr, val);
    }

    get rot_y(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.rot_y_addr);
    }
    set rot_y(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.rot_y_addr, val);
    }

    get rot_z(): number {
        return this.emulator.rdramReadPtrF32(this.instance, this.rot_z_addr);
    }
    set rot_z(val: number) {
        this.emulator.rdramWritePtrF32(this.instance, this.rot_z_addr, val);
    }

    get cap(): number {
        return 0;
    }
    set cap(val: number) {
        return;
    }
}  