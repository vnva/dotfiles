declare const SRC: string;

declare module 'inline:*' {
  const content: string;
  export default content;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.blp' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}
