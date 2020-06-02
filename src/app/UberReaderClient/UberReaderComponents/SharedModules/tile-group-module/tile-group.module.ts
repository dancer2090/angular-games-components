import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileGroup } from './components/tile-group.component';
import { TileItem } from './components/tile-item.component';
import { TileGroupThemeIsland } from './components/tile-group-theme-island.component';
import { TileItemThemeIsland } from './components/tile-item-theme-island.component';
import { MdlModule } from '@angular-mdl/core';
import { MatTooltipModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { ResourceLocationModule } from '../resource-location-module/resource-location.module';
import { TypesyCertificateModule } from '../typesy-certificate-module/typesy-certificate.module';
import { LazyLoadImageModule } from '../lazy-load-image-module/lazy-load-image.module';
import { ExpandedTileItem } from './components/expanded-tile-item.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        TileGroup,
        TileItem,
        TileGroupThemeIsland,
        TileItemThemeIsland,
        ExpandedTileItem
    ],
    imports: [
        CommonModule,
        MdlModule,
        LazyLoadImageModule,    
        MatTooltipModule,
        ResourceLocationModule,
        TypesyCertificateModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule
    ],
    exports: [
        TileGroup,
        TileGroupThemeIsland,
        ExpandedTileItem
    ]
})
export class TileGroupModule { }
