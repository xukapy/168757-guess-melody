/*
import mainWelcome from './windows/main-welcome';
import showWindow from './template-render';

showWindow(mainWelcome());
*/

import welcome from './windows/welcome/welcome';
import changeView from './template-render';

changeView(welcome().element);
