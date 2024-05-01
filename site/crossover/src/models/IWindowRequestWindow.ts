import IWindowSection from "./IWindowSection";

export default interface IWindow{
    height: number;
    width: number;
    color: number;
    packet: number;
    windowType: number;
    hasWindowsill: boolean;
    hasLattice: boolean;
    windowSections: IWindowSection[];
}