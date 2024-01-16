import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FULL_CALENDAR from '@salesforce/resourceUrl/fullCalendar';

export default class Calendar extends LightningElement {
    isCalInitialized = false;

    async renderedCallback() {
        if (this.isCalInitialized) {
            return;
        }
        this.isCalInitialized = true;

        try {
            await Promise.all([
                loadScript(this, FULL_CALENDAR + '/main.min.js'),
                loadStyle(this, FULL_CALENDAR + '/main.min.css')
            ]);
            this.initializeCalendar();
        } catch (error) {
            console.error('Failed to load FullCalendar lib: ', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading calendar',
                    message: error.message,
                    variant: 'error'
                })
            );
        }
    }

    initializeCalendar() {
        const calendarEl = this.template.querySelector('.calendar');
        if (!window.FullCalendar) {
            throw new Error('FullCalendar is not loaded in window contex.');
        }
        // eslint-disable-next-line no-undef
        const calendar = new window.FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth'
        });
        calendar.render();
    }
}
