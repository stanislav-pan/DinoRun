export class CanvasText {
  constructor(
    public title: string,
    public x: number,
    public y: number,
    public textAlign: CanvasTextAlign,
    public color: string,
    public isSmall: boolean
  ) {
    this.title = title;
    this.x = x;
    this.y = y;
    this.textAlign = textAlign;
    this.color = color;
    this.isSmall = isSmall;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.fillStyle = this.color;
    context.font = `${this.isSmall ? 38 : 68}px sans-serif`;
    context.textAlign = this.textAlign;
    context.fillText(this.title, this.x, this.y);
    context.closePath();
  }
}
