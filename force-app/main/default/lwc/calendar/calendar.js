import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FULL_CALENDAR from '@salesforce/resourceUrl/fullCalendar';

export default class Calendar extends LightningElement {
  isCalInitialized = false;

  renderedCallback() {
    if (this.isCalInitialized) {
      return;
    }
    this.isCalInitialized = true;

    Promise.all([
      loadScript(this, FULL_CALENDAR + '/main.min.js'),
      loadStyle(this, FULL_CALENDAR + '/main.min.css')
    ])
      .then(() => {
        this.initializeCalendar();
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error loading calendar',
            message: error.message,
            variant: 'error'
          })
        );
      });
  }

  initializeCalendar() {
    const calendarEl = this.template.querySelector('.calendar');
    // eslint-disable-next-line no-undef
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  }
}
