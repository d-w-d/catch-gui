export interface IMyContext extends CanvasRenderingContext2D {
  pinchRect: (
    x: number,
    y: number,
    w: number,
    h: number,
    pf?: number, // "pinch factor",
    ho?: number // "height Offset"
  ) => void;
}
