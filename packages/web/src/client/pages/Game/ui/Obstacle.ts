import cactus from "./img/cactus.png";
import obstacle from "./img/obstacle.png";

export class Obstacle {
  gameSpeed: number;
  dx: number;

  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public color: string,
    gameSpeed: number,
    public typeObstacle: number
  ) {
    this.gameSpeed = gameSpeed;
    this.dx = -this.gameSpeed;
    this.typeObstacle = typeObstacle;
  }

  update(context: CanvasRenderingContext2D): void {
    this.x += this.dx;
    this.draw(context);
    this.dx = -this.gameSpeed;
  }

  draw(context: CanvasRenderingContext2D): void {
    const img = new Image();
    img.src = this.typeObstacle === 1 ? cactus : obstacle;
    context.drawImage(img, this.x, this.y, this.w, this.h);
  }
}
