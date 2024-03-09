import WidgetWorklog from './WidgetWorklog';
import WidgetInstances from './WidgetInstances';
import StateManagement from './StateManagement';

const instancesBlock = document.querySelector('.conteiner-instances');
const worklogBlock = document.querySelector('.conteiner-worklog');

const instances = new WidgetInstances(instancesBlock);
const worklog = new WidgetWorklog(worklogBlock);

const port = 9000;
const controller = new StateManagement(instances, worklog, port);
controller.init();
