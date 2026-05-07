import { Component } from '@angular/core';

@Component({
    selector: 'app-layout-manager',
    templateUrl: './layout-manager.component.html',
    styleUrls: ['./layout-manager.component.css'],
    standalone: false
})
export class LayoutManagerComponent {
  layoutMode: 'grid' | 'flex' = 'grid';

  cards = [
    { title: 'Neural Engine', content: 'Processing real-time data streams with advanced heuristics.', type: 'blue' },
    { title: 'Cloud Sync', content: 'Seamlessly synchronizing state across multiple edge locations.', type: 'purple' },
    { title: 'Security Vault', content: 'End-to-end encryption with quantum-resistant algorithms.', type: 'blue' },
    { title: 'Analytics Pro', content: 'Deep insights powered by machine learning models.', type: 'purple' },
    { title: 'Global CDN', content: 'Ultra-low latency content delivery at the edge.', type: 'blue' },
    { title: 'DevOps Flow', content: 'Automated CI/CD pipelines with zero-downtime deploys.', type: 'purple' }
  ];

  setLayout(mode: 'grid' | 'flex') {
    this.layoutMode = mode;
  }
}
