import spacing from "./Spacing";

export interface IBreakpoints {
  smallPhone?: keyof typeof spacing;
  phone?: keyof typeof spacing;
  retina?: keyof typeof spacing;
}

const breakpoints = {
  smallPhone: 0,
  phone: 321,
  retina: 812,
};

export default breakpoints;
