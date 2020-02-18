
//% color="#AA278D" iconWidth=50 iconHeight=40
namespace GestureTouch {

    //% block="Gesture_Touch init [SSR] pin RX[RX] TX[TX]" blockType="command"
    //% SSR.shadow="dropdown" SSR.options="SSR" 
    //% RX.shadow="dropdown" RX.options="RX"
    //% TX.shadow="dropdown" TX.options="TX"
    export function GestureInit(parameter: any, block: any) {
        let ssr=parameter.SSR.code;
        let rx=parameter.RX.code;
        let tx=parameter.TX.code;
        Generator.addInclude("GestureInitInclude","#include <DFRobot_Gesture_Touch.h>");
        Generator.addInclude("GestureInitSFInclude","#include <SoftwareSerial.h>");        
        Generator.addObject(`GestureInitSFObject${ssr}`,"SoftwareSerial",`${ssr}(${rx}, ${tx});`);
        Generator.addObject("GestureInitObject","DFRobot_Gesture_Touch",`DFGT(&${ssr});`);
        Generator.addObject("GestureInitVailable","int8_t","Gesture_rslt");

        Generator.addSetup(`GestureInitSFSetup${ssr}`,`${ssr}.begin(9600);`);
        Generator.addSetup("GestureInitSetup","DFGT.setGestureDistance(20);");
    }

    //% board="esp32,microbit"
    //% block="Gesture_Touch init [SR] pin RX[SRX] TX[STX]" blockType="command"
    //% SR.shadow="dropdown" SR.options="SR" 
    //% SRX.shadow="dropdown" SRX.options="SRX"
    //% STX.shadow="dropdown" STX.options="STX"
    export function GestureInitSR(parameter: any, block: any) {
        let sr=parameter.SR.code;
        let srx=parameter.SRX.code;
        let stx=parameter.STX.code;
        Generator.addInclude("GestureInitInclude","#include <DFRobot_Gesture_Touch.h>");
        Generator.addObject("GestureInitObject","DFRobot_Gesture_Touch",`DFGT(&${sr})`);
        Generator.addObject("GestureInitVailable","int8_t","Gesture_rslt");
        if(Generator.board=="arduino")
        {
            Generator.addSetup(`GestureInitSRSetup${sr}`,`${sr}.begin(9600);`);
        }    
        if(Generator.board=="esp32" || Generator.board=="microbit")
        {
            Generator.addSetup(`GestureInitSRSetup${sr}`,`${sr}.begin(9600,${srx},${stx});`);
        }    

       
        
        Generator.addSetup("GestureInitSetup","DFGT.setGestureDistance(20);");
    }
    
    //% block="Gesture_Touch get once data" blockType="command"
    export function GestureGetOnceData(parameter: any, block: any) {
        Generator.addCode("Gesture_rslt test= DFGT.getAnEvent();");

    }

    //% block="Gesture_Touch set distance [DIS]" blockType="command"
    //% DIS.shadow="number" DIS.defl="45"
    export function GestureSetDistance(parameter: any, block: any) {
        let dis=parameter.DIS.code;
        Generator.addSetup("GestureInitSetup",`DFGT.setGestureDistance(${dis});`,true);

    }
    //% block="Gesture_Touch get direction [DIREC]" blockType="boolean"
    //%DIREC.shadow="dropdown" DIREC.options="DIREC"
    export function GestureGetDirec(parameter: any, block: any) {
        let direc=parameter.DIREC.code;
        Generator.addCode([`Gesture_rslt == ${direc}`,Generator.ORDER_UNARY_POSTFIX]);

    }

    

    //% block="Gesture_Touch [ABLE] function [FUN]" blockType="command"
    //% FUN.shadow="dropdown" FUN.options="DFGT_FUN"
    //% ABLE.shadow="dropdown" ABLE.options="ABLE"
    export function GestureAbleAll(parameter: any, block: any) {
        let fun=parameter.FUN.code;
        let able=parameter.ABLE.code;
        Generator.addCode(`DFGT.${able}Function(${fun});`);

    }
    

    //% block="Gesture_Touch sleep [SEC]" blockType="command"
    //% SEC.shadow="number" SEC.defl="4"
    export function GestureSleep(parameter: any, block: any) {
        let sec=parameter.SEC.code;
        Generator.addCode(`DFGT.setSleep(${sec});`);

    }

}
