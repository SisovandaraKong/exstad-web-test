declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
// For CSS Modules (*.module.css)
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS Modules if you use them
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// For Swiper CSS
declare module "swiper/css";
declare module "swiper/css/pagination";
declare module "swiper/css/navigation";
declare module "swiper/css/scrollbar";
// Add other swiper CSS modules as needed

// For AOS CSS
declare module "aos/dist/aos.css";
