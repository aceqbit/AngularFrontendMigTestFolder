import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSection: string = 'dashboard';
  
  sections = [
    { id: 'dashboard', label: 'Main Dashboard', icon: '📊' },
    { id: 'workflow', label: 'Workflow Designer', icon: '🔗' },
    { id: 'calendar', label: 'Enterprise Calendar', icon: '📅' },
    { id: 'scheduler', label: 'Event Scheduler', icon: '⏱️' },
    { id: 'grid', label: 'Advanced Data Grid', icon: '🔠' },
    { id: 'explorer', label: 'File Explorer', icon: '📁' },
    { id: 'stepper', label: 'Provisioning Wizard', icon: '⚡' },
    { id: 'tree', label: 'Taxonomy Tree', icon: '🌳' },
    { id: 'notes', label: 'Sticky Board', icon: '📌' },
    { id: 'notifications', label: 'Alert Hub', icon: '🔔' },
    { id: 'monitor', label: 'Resource Monitor', icon: '💻' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' }
  ];

  setSection(id: string) {
    this.activeSection = id;
  }
}
