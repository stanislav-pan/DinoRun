import dinosaur from "./img/dinosaur.png";

export class Player {
  dy: number;
  jumpForce: number;
  originalHeight: number;
  grounded = false;
  jumpTimer: number;

  keys: { [x: string]: boolean };

  gameSpeed: number;
  spawnTimer: number;
  score: number;

  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public color: string,
    public playJumpSound: () => void
  ) {
    this.dy = 0;
    this.jumpForce = 20;
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;
    this.keys = {};
    this.playJumpSound = playJumpSound;

    this.gameSpeed = 3;
    this.spawnTimer = 200;
    this.score = 0;
  }

  setKeys({ code, value }: { code: string; value: boolean }): void {
    this.keys[code] = value;
  }

  animate(
    canvas: HTMLCanvasElement,
    gravity: number,
    context: CanvasRenderingContext2D
  ): void {
    if (this.keys.ArrowUp) {
      this.jumpUp();
    } else {
      this.jumpTimer = 0;
    }

    if (this.keys.ArrowDown) {
      this.h = this.originalHeight / 2;
    } else {
      this.h = this.originalHeight;
    }
    this.y += this.dy;

    if (this.y + this.h < canvas.height) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h;
    }

    this.draw(context);
  }

  jumpUp(): void {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
      this.playJumpSound();
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    const img = new Image();
    img.src = dinosaur;
    context.drawImage(img, this.x, this.y, this.w, this.h);
  }
}
