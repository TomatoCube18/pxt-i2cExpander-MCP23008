
/**
 *  MCP23008-control blocks
 */

let inputABuffer = 0;
let _addr = 0x20;

enum PINS {
    //% block=PIN0
    PIN0 = 0,
    //% block=PIN1
    PIN1,
    //% block=PIN2
    PIN2,
    //% block=PIN3
    PIN3,
    //% block=PIN4
    PIN4,
    //% block=PIN5
    PIN5,
    //% block=PIN6
    PIN6,
    //% block=PIN7
    PIN7,

}


enum MCP23008REG {
    //% block=IODIR
    IODIR = 0,
    //% block=IPOL
    IPOL,
    //% block=GPINTEN
    GPINTEN,
    //% block=DEFVAL
    DEFVAL,
    //% block=INTCON
    INTCON,
    //% block=IOCON
    IOCON,
    //% block=GPPU
    GPPU,
    //% block=INTF
    INTF,
    //% block=INTCAP
    INTCAP,
    //% block=GPIO
    GPIO,
    //% block=OLAT
    OLAT 
}

enum ADDRESS {                     // address for MCP23008 (configurable by tying pins 5,4,3 on the mcp23008 high or low)
    //% block=0x20
    A20 = 0x20,               // 
    //% block=0x21
    A21 = 0x21,                // 
    //% block=0x22
    A22 = 0x22,                // 
    //% block=0x23
    A23 = 0x23,                // 
    //% block=0x24
    A24 = 0x24,                // 
    //% block=0x25
    A25 = 0x25,                // 
    //% block=0x26
    A26 = 0x26,                // 
    //% block=0x27
    A27 = 0x27                // 
}

/**
 * Blocks
 */
"//% weight=100 color=#0fbc12 icon="
namespace MCP23008 {
    //% block="Set the i2c Address |addr %addr" 
    export function setAddr(addr: ADDRESS) {
        _addr = addr;
    }

    //% block="GPIO Change Input/Output GPIO %val"
    export function SetIoDir(val: number) {
        writeReg(MCP23008REG.IODIR, val)
    }

    //% block="GPIO Setup Pull-ups GPIO %val"
    export function SetPullUp(val: number) {
        writeReg(MCP23008REG.GPPU, val)
    }

    //% block="Read value input buffer"
    export function ReadToBuffer() {
        inputABuffer = readReg(MCP23008REG.GPIO)
    }

    //% block
    export function ReadPin(pin: PINS): number {
        if (inputABuffer & (0x01 << pin)) {
            return 1
        }
        else {
            return 0
        }
    }

    //% block
    export function WritePin(pin: PINS, val: number) {
        if (number == 1) {
            inputABuffer = inputABuffer | (0x01 << pin)
        }
        else {
            inputABuffer = inputABuffer & (~(0x01 << pin))
        }
        writeReg(MCP23008REG.GPIO, inputABuffer)

    }

    //% block
    export function readReg(reg: MCP23008REG): number {
        pins.i2cWriteNumber(
            _addr,
            reg,
            NumberFormat.Int8LE,
            true
        )
        return pins.i2cReadNumber(_addr, NumberFormat.Int8LE, false)
    }

    //% block
    export function writeReg(reg: MCP23008REG, val: number) {
        pins.i2cWriteNumber(
            _addr,
            reg,
            NumberFormat.Int8LE,
            true
        )
        pins.i2cWriteNumber(
            _addr,
            val,
            NumberFormat.Int8LE,
            false
        )
    }


}
