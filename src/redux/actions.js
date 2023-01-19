import {
  SHOW_HIDDEN_MENU,
  COLOR_MENU_ITEM
} from './types';


export function showHiddenMenu(id) {
  return {
    type: SHOW_HIDDEN_MENU,
    data: { id },
  };
}

export function colorMenuItem(id) {
  return {
    type: COLOR_MENU_ITEM,
    data: { id },
  };
}