import { DOMAttributes } from "react";

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        /** 移入手指 */
        __cursorPointer?: boolean
    }
}