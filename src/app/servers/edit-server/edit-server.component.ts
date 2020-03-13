import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // use only if params changes happen outside of this component
    console.log('params', this.route.snapshot.params);
    console.log('queryParams', this.route.snapshot.queryParams);
    console.log('fragment', this.route.snapshot.fragment);
    // reactive changes: use if params changes happen within this component
    this.route.params.subscribe(params =>
      console.log('reactive params', params)
    );
    this.route.queryParams.subscribe(params =>
      console.log('reactive queryParams', params)
    );
    this.route.fragment.subscribe(fragment =>
      console.log('reactive fragment', fragment)
    );

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
  }
}
