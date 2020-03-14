import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverId: number;
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // use only if params changes happen outside of this component
    // console.log('params', this.route.snapshot.params);
    // console.log('queryParams', this.route.snapshot.queryParams);
    // console.log('fragment', this.route.snapshot.fragment);
    this.serverId = +this.route.snapshot.params['id'];
    // reactive changes: use if params changes happen within this component
    this.route.params.subscribe(params => {
      // console.log('reactive params', params);
      this.serverId = +params['id'];
    });
    this.route.queryParams.subscribe((queryParams: Params) => {
      // console.log('reactive queryParams', queryParams);
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    // this.route.fragment.subscribe(fragment =>
    //   console.log('reactive fragment', fragment)
    // );

    this.server = this.serversService.getServer(this.serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if (
      this.serverName === this.server.name &&
      this.serverStatus === this.server.status
    ) {
      return true;
    } else {
      return confirm('Are you really discard changes?');
    }
  }
}
