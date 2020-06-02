import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

const TYPEAHEAD_DELAY: number = 200;

export class TableModel<T> {    
    public columns: string[];
    public source: MatTableDataSource<T>;
    public search$: Subject<string>;
    public selection: SelectionModel<T>;
    public lastSelected: T;
    public pageSizeOptions: number[];
    public pageSize: number;
    public searchInput: string;

    constructor(columns: string[], onDestroy$: Subject<void>, allowSearch: boolean = true, pageSizeOptions?: number[], pageSize?: number) {
        this.source = new MatTableDataSource();
        this.selection = new SelectionModel<T>(true, []);        
        this.columns = columns;
        this.pageSizeOptions = pageSizeOptions ? pageSizeOptions : [10, 25, 50, 100];
        this.pageSize = pageSize ? pageSize : 10;        

        this.source.sortingDataAccessor = (item, property) => {
            let val = item[property];
            return typeof val === 'string' ? val.toLowerCase() : val;            
        };

        if (allowSearch) {
            this.searchInput = '';
            this.search$ = new Subject<string>();
            this.search$.pipe(
                debounceTime(TYPEAHEAD_DELAY),
                distinctUntilChanged(),
                takeUntil(onDestroy$)
            ).subscribe(filter => {            
                this.applyFilter(filter);
            });
        }
    }

    public overrideFilter(filterFunc: (data: T, filter: string) => boolean) {
        this.source.filterPredicate = filterFunc;
    }

    public search(value: string) { 
        this.search$.next(value);
    }

    public applyFilter(filter: string) {        
        this.source.filter = filter.trim().toLowerCase();
    }

    public clearFilter() {
        this.searchInput = '';
        this.applyFilter(this.searchInput);
    }

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.source.filteredData.length;
        return numSelected === numRows;
    }
        
    public masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.source.filteredData.forEach(data => this.selection.select(data));
    }

    public toggleSelection(event: any, selectedData: T): void {
        if (event) {
            event.stopPropagation();
        }

        if (event.shiftKey) {
            let selected = this.getSelected(this.source.filteredData, this.lastSelected, selectedData);            
            if (this.selection.isSelected(selectedData)) {
                selected.forEach(item => item == selectedData ? null : this.selection.deselect(item));
            }
            else {
                selected.forEach(item => item == selectedData ? null : this.selection.select(item));
            }
            this.lastSelected = selectedData;
        }
        else {
            /* this.selection.toggle(user);
            this.lastSelected = user; */
        }
    }

    public toggleChange(selectedData: T) {
        this.selection.toggle(selectedData);
        this.lastSelected = selectedData;
    }

    private getSelected<T>(list: T[], lastSelected: T, newSelected: T): T[]
    {
        if (lastSelected == null || lastSelected == newSelected)
        {
            return [newSelected];
        }
        let lastIndex = list.indexOf(lastSelected);
        let newIndex = list.indexOf(newSelected);
        let lowIndex = Math.min(lastIndex, newIndex);
        let highIndex = Math.max(lastIndex, newIndex);

        /* let selectedItems = [];
        for (let i = lowIndex; i <= highIndex; i++)
        {
            selectedItems.push(list[i]);
        } */
        
        return list.slice(lowIndex, highIndex + 1);
    }
}
