import { Component, OnInit } from '@angular/core';

interface CalendarDay {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: any[];
}

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    standalone: false
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  days: CalendarDay[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  mockEvents: any = {
    '2026-05-15': [{ title: 'Design Review', type: 'blue' }],
    '2026-05-18': [{ title: 'Sync Meeting', type: 'purple' }, { title: 'Code Push', type: 'blue' }],
    '2026-05-22': [{ title: 'Deployment', type: 'blue' }]
  };

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Padding for previous month
    const startPadding = firstDay.getDay();
    for (let i = startPadding; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      this.days.push(this.createDay(date, false));
    }
    
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      this.days.push(this.createDay(date, true));
    }
    
    // Padding for next month
    const endPadding = 42 - this.days.length; // 6 rows of 7 days
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(year, month + 1, i);
      this.days.push(this.createDay(date, false));
    }
  }

  createDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const dateStr = date.toISOString().split('T')[0];
    const today = new Date();
    return {
      date,
      isToday: date.toDateString() === today.toDateString(),
      isCurrentMonth,
      events: this.mockEvents[dateStr] || []
    };
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getMonthName(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
