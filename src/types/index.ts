/* eslint-disable @typescript-eslint/no-explicit-any */
export type TObject = {
  [index: string]: any;
};

export interface IToggleObjectValue extends TObject {
  [index: string]: boolean;
}