import { Component, HostListener } from '@angular/core';

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  type: string;
}

interface Connection {
  fromId: string;
  toId: string;
}

@Component({
  selector: 'app-workflow-designer',
  templateUrl: './workflow-designer.component.html',
  styleUrls: ['./workflow-designer.component.css']
})
export class WorkflowDesignerComponent {
  nodes: Node[] = [
    { id: '1', name: 'Source Data', x: 50, y: 50, type: 'trigger' },
    { id: '2', name: 'Transform 1', x: 300, y: 150, type: 'action' },
    { id: '3', name: 'Output Sink', x: 550, y: 50, type: 'action' }
  ];

  connections: Connection[] = [
    { fromId: '1', toId: '2' },
    { fromId: '2', toId: '3' }
  ];

  draggingNode: Node | null = null;
  dragOffset = { x: 0, y: 0 };

  startDrag(event: MouseEvent, node: Node) {
    this.draggingNode = node;
    this.dragOffset.x = event.clientX - node.x;
    this.dragOffset.y = event.clientY - node.y;
    event.stopPropagation();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggingNode) {
      this.draggingNode.x = event.clientX - this.dragOffset.x;
      this.draggingNode.y = event.clientY - this.dragOffset.y;
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.draggingNode = null;
  }

  getConnectionPath(conn: Connection): string {
    const fromNode = this.nodes.find(n => n.id === conn.fromId);
    const toNode = this.nodes.find(n => n.id === conn.toId);
    
    if (!fromNode || !toNode) return '';
    
    const x1 = fromNode.x + 180; // Output port
    const y1 = fromNode.y + 50;
    const x2 = toNode.x; // Input port
    const y2 = toNode.y + 50;
    
    const cp1x = x1 + (x2 - x1) / 2;
    const cp2x = x1 + (x2 - x1) / 2;
    
    return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
  }
}
