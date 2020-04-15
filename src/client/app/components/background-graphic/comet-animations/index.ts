import {
  ctx,
  addNewCometIntervalMs,
  drawIntervalMs,
  canvasWidth,
  canvasHeight,
  initContext
} from './constants';
import { Comet } from './comet';
import { getAngleBetweenTwoPoints } from './utils';

let t = 0;
const comets: (Comet | null)[] = [];
// addCometOnEdge();

function addCometOnEdge() {
  const radius = 2 + Math.ceil(Math.random() * 2);
  // Logic to launch comets from alternate sides of canvas
  const isLeftEdge = comets.length % 2 === 0;
  const x0 = isLeftEdge ? 0 : canvasWidth;
  const y0 = (Math.random() * canvasHeight) / 2;
  const x1 = isLeftEdge ? canvasWidth : 0;
  const y1 = Math.random() * canvasHeight;
  const angle = getAngleBetweenTwoPoints(x0, y0, x1, y1) + Math.PI;
  comets.push(new Comet(x0, y0, radius, angle));

  // Remove comet if beyond boundaries
  comets.forEach((comet, ind, arr) => {
    if (!!comet && (comet.x < 0 || comet.x > canvasWidth)) arr[ind] = null;
  });
}

function draw() {
  t += drawIntervalMs;
  if (t % (addNewCometIntervalMs / 1) === 0) addCometOnEdge();
  if (t % 1000 === 0) {
    // console.log('-------------');
    // console.log(comets.length);
    // console.log(
    //   comets.reduce((acc, el, ind, arr) => (!!el ? (acc += Math.round(el.x) + '; ') : ''), '')
    // );
  }
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  comets.forEach(comet => {
    if (!!comet) comet.draw(drawIntervalMs);
  });
}

let animInterval: any;
let isBegun = false;

export const CometAnimation = {
  start: () => {
    if (!ctx) initContext();
    if (!isBegun) {
      isBegun = true;
      addCometOnEdge();
      addCometOnEdge();
    }
    animInterval = setInterval(draw, drawIntervalMs);
  },
  stop: () => {
    clearInterval(animInterval);
    animInterval = null;
  }
};
