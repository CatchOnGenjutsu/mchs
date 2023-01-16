import {
  SHOW_HIDDEN_MENU
} from './types';


export function showHiddenMenu(id) {
  return {
    type: SHOW_HIDDEN_MENU,
    data: { id },
  };
}