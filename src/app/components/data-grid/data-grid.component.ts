import { Component } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {
  users = [
    { id: '001', name: 'Alex Rivera', email: 'alex.r@neural.io', status: 'online', role: 'System Architect' },
    { id: '002', name: 'Sarah Chen', email: 's.chen@cloud.io', status: 'busy', role: 'Security Lead' },
    { id: '003', name: 'Marcus Thorne', email: 'm.thorne@vault.io', status: 'offline', role: 'Data Scientist' },
    { id: '004', name: 'Elena Vance', email: 'e.vance@analytics.io', status: 'online', role: 'UX Researcher' },
    { id: '005', name: 'David Miller', email: 'd.miller@cdn.io', status: 'online', role: 'DevOps Engineer' },
    { id: '006', name: 'Sophia Lee', email: 's.lee@flow.io', status: 'busy', role: 'Frontend Expert' }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
