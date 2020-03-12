mario_behavior equ 0x00800000 //ram offset of mario behav. do not include 0x80 at beginning!

.n64
.create "0x803000.bin",0
.headersize 0x80245000

pointer_code:
ADDIU SP, SP, 0xFFE8
SW RA, 0x14(SP)

LI T0, 0x80803000

cmdLoop:

LW T1, 0x0000(T0)
SUBIU T2, R0, 0x01
BNE T1, T2, afterSpawnMario

LW T3, 0x0004(T0)
BEQZ T3, afterRespawnMario
NOP

SH R0, 0x74(T3)

afterRespawnMario:
SW T0, 0x10(SP)
SW R0, 0x0000(T0)

LUI A0, 0x8036
LW A0, 0x1158(A0)
LI A2, mario_behavior
JAL 0x8029EDCC
ORI A1, R0, 0x01

LW T0, 0x10(SP)
SW V0, 0x4(T0)

LI T1, 0x80060030
SW T1, 0x3C(V0)

afterSpawnMario:

LW T1, 0x0000(T0)
SUBIU T2, R0, 0x02
BNE T1, T2, afterDespawnMario

LW T3, 0x0004(T0)
BNEZ T3, afterReDespawnMario
NOP

B afterDespawnMario

afterReDespawnMario:

SW R0, 0x0000(T0)
LW A0, 0x0004(T0)
SH R0, 0x74(A0)
SW R0, 0x0004(T0)

afterDespawnMario:

ADDIU T0, T0, 0x0008
LI T2, 0x808030B0
BLT T0, T2, cmdLoop
NOP

end:

LW RA, 0x14(SP)
JR RA
ADDIU SP, SP, 0x18
