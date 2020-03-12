import * as API from '../API/Imports';

export class Player extends API.BaseObj implements API.IPlayer {
    private instance: number = global.ModLoader[API.AddressType.PLAYER];
    private pos_x_addr = 0xA0;
    private pos_y_addr = 0xA4;
    private pos_z_addr = 0xA8;
    private rot_x_addr = 0x54;
    private rot_y_addr = 0x58;
    private rot_z_addr = 0x5c;

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

    get position(): Buffer {
        return Buffer.from([this.pos_x, this.pos_y, this.pos_z]);
    }
    set position(val: Buffer) {
        this.pos_x = val[0];
        this.pos_y = val[1];
        this.pos_z = val[2];
    }

    get pos_x(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.pos_x_addr);
    }
    set pos_x(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.pos_x_addr, val);
    }

    get pos_y(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.pos_y_addr);
    }
    set pos_y(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.pos_y_addr, val);
    }

    get pos_z(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.pos_z_addr);
    }
    set pos_z(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.pos_z_addr, val);
    }

    get rotation(): Buffer {
        return Buffer.from([this.rot_x, this.rot_y, this.rot_z]);
    }
    set rotation(val: Buffer) {
        this.rot_x = val[0];
        this.rot_y = val[1];
        this.rot_z = val[2];
    }

    get rot_x(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.rot_x_addr);
    }
    set rot_x(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.rot_x_addr, val);
    }

    get rot_y(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.rot_y_addr);
    }
    set rot_y(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.rot_y_addr, val);
    }

    get rot_z(): number {
        return this.emulator.rdramReadPtr32(this.instance, this.rot_z_addr);
    }
    set rot_z(val: number) {
        this.emulator.rdramWritePtr32(this.instance, this.rot_z_addr, val);
    }

    get cap(): number {
        return 0;
    }
    set cap(val: number) {
        return;
    }
}  