/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-resizable-panels';
declare module 'tailwind-merge' {
    export function twMerge(...inputs: any[]): string;
    export function extendTailwindMerge(...args: any[]): (...inputs: any[]) => string;
    export function createTailwindMerge(...args: any[]): (...inputs: any[]) => string;
    export function mergeConfigs(...args: any[]): any;
    export function getDefaultConfig(): any;
    export function fromTheme(key: string): any;
}
