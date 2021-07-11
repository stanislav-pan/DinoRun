declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.svg" {
  const value: string;
  export = value;
}

declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.jpg" {
  const value: string;
  export = value;
}

declare module "*.jpeg" {
  const value: string;
  export = value;
}
