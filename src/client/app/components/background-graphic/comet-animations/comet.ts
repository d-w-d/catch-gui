import { ctx, pxlPerMs } from './constants';

let xxx: any;

class CometShell {
  public numTails: number;
  public tailSeeds: number[];

  constructor(
    public cometShell: 'inner' | 'outer',
    public x = 0,
    public y = 0,
    public radius = 100,
    public angle = 0,
    public rgb = '255,255,255'
  ) {
    // Number of tails depends on the 'shell'
    this.numTails = cometShell === 'inner' ? 1 : 1;
    // this.numTails = cometShell === 'inner' ? 4 : 4;
    // Each tail needs to have a random seed
    this.tailSeeds = [...new Array(this.numTails)].map(_ => Math.random());
    // this.tailSeeds = [...new Array(this.numTails)].map(_ => 1);
  }

  draw() {
    if (!ctx) {
      console.log('Hmmm');
      return;
    }

    // Define params for this frame
    const { cometShell, radius, angle, rgb, numTails, tailSeeds } = this;
    const bodyLengthParam = 1;
    const tailBaseWidth = cometShell === 'inner' ? radius * 12 : radius * 40;
    const tailHeight = (2 * radius) / numTails;
    const pf = cometShell === 'inner' ? 0.5 : 2; // pf = "pinch factor"

    // Rotate coord system
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    const x = 0;
    const y = 0;

    // Draw Comet Head
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.fillStyle = `rgba(${rgb})`;
    ctx.fill();
    ctx.closePath();

    // Draw "Body"
    ctx.beginPath();
    ctx.rect(x - 1, y - radius, bodyLengthParam * radius + 2, 2 * radius);
    // ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();
    ctx.closePath();

    // Draw "Tails"
    for (let i = 0; i < numTails; i++) {
      const r = tailSeeds[i];
      const t = this.x + this.y; // Let position be proxy for time
      const theta = r + r * t * pxlPerMs * 1.05;
      const tailWidth = tailBaseWidth * (1 + 0.23 * Math.sin(theta) * Math.sin(theta));
      // if (!xxx) xxx = this;
      // if (xxx === this) console.log('tailWidth', tailWidth);

      // Tail body
      ctx.beginPath();
      const ho = ((numTails - 1) / 2 - i) * tailHeight * (1 - pf); // ho = "height offset"
      ctx.pinchRect(
        x + bodyLengthParam * radius,
        y - radius + tailHeight * i,
        tailWidth,
        tailHeight,
        pf,
        ho
      );
      // Fill with gradient
      const grd = ctx.createLinearGradient(
        x + bodyLengthParam * radius,
        y - radius + tailHeight * i,
        x + bodyLengthParam * radius + tailWidth,
        y - radius + tailHeight * i + tailHeight
      );
      grd.addColorStop(0, `rgba(${rgb},1)`);
      grd.addColorStop(1.0, `rgba(${rgb},0)`);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.closePath();
    }

    // Draw Comet Head
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();
    ctx.closePath();

    // Undo rotation
    ctx.restore();
  }
}

export class Comet {
  public innerCometShell: CometShell;
  public outerCometShell: CometShell;

  constructor(
    //
    public x = 0,
    public y = 0,
    public radius = 100,
    public angle = 0
  ) {
    this.outerCometShell = new CometShell(
      'outer',
      x,
      y,
      radius * 2,
      angle,
      `${(7 / 100) * 255},${(25 / 100) * 255},${(41 / 100) * 255}`
    );
    this.innerCometShell = new CometShell(
      'inner',
      x,
      y,
      radius,
      angle,
      `${(46 / 100) * 255},${(95 / 100) * 255},${(100 / 100) * 255}`
    );
  }
  draw(dt = 0) {
    // Update comet position
    this.x = this.x - 1 * dt * pxlPerMs * Math.cos(this.angle);
    this.y = this.y - 1 * dt * pxlPerMs * Math.sin(this.angle);

    // Update child shells' position
    this.outerCometShell.x = this.x;
    this.outerCometShell.y = this.y;
    this.innerCometShell.x = this.x;
    this.innerCometShell.y = this.y;

    // Draw child shells
    this.outerCometShell.draw();
    this.innerCometShell.draw();
  }
}
