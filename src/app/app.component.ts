import { Component } from '@angular/core';
import { CommonhttpService } from './shared/commonhttp.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private commonHttp: CommonhttpService)
    {
        this.commonHttp.alreadyAuthinticate();
    }
    
}
