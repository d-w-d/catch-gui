import './global.scss';
import { IMyContext } from './models';

// Free params
export const pxlPerSec = 50; // Speed of comets
export const fps = 71; //
export const addNewCometIntervalMs = Math.round(10000);

// Derived Params
export let drawIntervalMs = Math.round(1000 / fps);
// Ensure drawInterval goes into addNewCometIntervalMs
while (addNewCometIntervalMs % drawIntervalMs !== 0 && drawIntervalMs < addNewCometIntervalMs) {
  drawIntervalMs++;
  if (drawIntervalMs >= addNewCometIntervalMs) drawIntervalMs = addNewCometIntervalMs;
}
export const pxlPerMs = pxlPerSec / drawIntervalMs / fps;

export let canvasWidth;
export let canvasHeight;

// Create canvas and context
export function initContext() {
  const containerId = 'canvas-container';
  const canvasContainer: HTMLDivElement | null = document.getElementById('canvas-container') as any;
  if (!canvasContainer) throw new Error('CANT FIND DIV!!!');
  const canvas = document.createElement('canvas');
  canvasWidth = canvas.width = canvasContainer.offsetWidth;
  canvasHeight = canvas.height = canvasContainer.offsetHeight;
  canvasContainer.appendChild(canvas);
  let context: IMyContext;
  if (!!canvasContainer) {
    context = canvas.getContext('2d') as any;
  } else {
    throw new Error('No container with id ' + containerId + ' found!!!');
  }

  /**
   * Define method to be used in place of .rect()
   * If you supply pinchFactor, then the right side of rectangle gets stretched
   */
  context.pinchRect = function pinchRect(
    x: number,
    y: number,
    w: number,
    h: number,
    pf = 1,
    ho = 0
  ) {
    this.moveTo(x, y); // give the (x,y) coordinates
    this.lineTo(x + w, y + ho + (h * (1 - pf)) / 2);
    this.lineTo(x + w, y + ho + (h * (1 + pf)) / 2 + 0);
    this.lineTo(x, y + h);
    this.lineTo(x, y);
  };

  ctx = context;
}

export let ctx: IMyContext;
