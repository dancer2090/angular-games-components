import { Injectable } from '@angular/core';
import { ExternalResourceLoaderService } from '../UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { AppSettings } from 'app/UberReaderData/AppSettings';
import { Observable } from 'rxjs/Rx';
import { take, map, mergeMap, tap, retry } from 'rxjs/operators';
import { of } from 'rxjs';

declare var google;

@Injectable()
export class GoogleChartsService {
    private jsSourceFile = AppSettings.GetAssetLocation() + 'assets/script/loader.js';
    private isLoaded: boolean = false;
    private gaugeChartLoaded: boolean = false;

    constructor(private resourceLoader: ExternalResourceLoaderService) {
        //this.loadLibrary();
    }

    private loadLibrary() {
        if (this.isLoaded) return;
        this.resourceLoader.loadMultipleResources([this.jsSourceFile], [], () => {
        google.charts.load('current', { packages:['corechart', 'bar', 'gauge'] });
        google.charts.setOnLoadCallback(() => {
            console.log('GOOGLE CHARTS LOADED!!!!! (GoogleChartsService)');
            this.isLoaded = true;
        });
        });
    }

    public ArrayToDataTable(array: any[]): any {
        return google.visualization.arrayToDataTable(array);
    }

    public CreateGaugeChart(element: any): Observable<any> {    
        return Observable.create(observer => {
            this.resourceLoader.loadMultipleResources2([this.jsSourceFile], []).subscribe(() => {
                let initGauge = () => {
                    let gaugeChart = new google.visualization.Gauge(element.nativeElement);
                    observer.next(gaugeChart);
                }
                if (this.gaugeChartLoaded) {
                    initGauge();
                }
                else {
                    google.charts.load('current', { packages: ['gauge'] });
                    google.charts.setOnLoadCallback(() => {
                        this.gaugeChartLoaded = true;
                        initGauge();        
                    });
                }        
            })
        });
    }

    public LoadPackages(packages: string[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.resourceLoader.loadMultipleResources2([this.jsSourceFile], [])
                .pipe(take(1))
                .subscribe(() => {
                    google.charts.load('current', { packages: packages });
                    google.charts.setOnLoadCallback(() => {
                        resolve(google);
                    });
                });
            });
    }

    public loadPackages(packages: string[]): Observable<any> {
        let load$ = new Observable<any>(observer => {
            google.charts.load('current', { packages: packages });
            google.charts.setOnLoadCallback(() => {
                observer.next(google);
                observer.complete();
            });
        });
        return this.resourceLoader.loadMultipleResources2([this.jsSourceFile], []).pipe(
            mergeMap(() => load$)
        );
    }
}
