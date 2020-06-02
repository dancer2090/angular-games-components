import { isUndefined } from 'util';
import { of } from 'rxjs/observable/of';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';

declare type Data = {
    [name: string]: any;
};

export class PreloadSelectedModulesList implements PreloadingStrategy {
  public routeData:Data = {};
  private hasPreloaded:boolean = false;

  preload(route: Route, load: Function): Observable<any> {    
    if (route.data && route.data.preload == true) {
      if (route.data.name) {
        this.routeData[route.data.name] = {route: route, loadFunction: load};
      }
    }
    
    return /*route.data && route.data['preload'] ? Observable.of(true).delay(route.data['delay']).flatMap(_ => load()) :*/ of(null);
  }

  preloadManually(routeName: string): Observable<any> {
    let routeData:any = this.routeData[routeName];
    return routeData ? routeData.loadFunction() : of(null);
  }

  preloadAllManually(): void {
    Object.keys(this.routeData).forEach(key => {        
        this.preloadManually(key);
    });
    this.hasPreloaded = true;
  }

  public get HasPreloaded(): boolean {
    return this.hasPreloaded;
  }
}