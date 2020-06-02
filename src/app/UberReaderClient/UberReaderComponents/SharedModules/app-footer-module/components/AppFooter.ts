import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { VisualComponent } from 'app/UberReaderClient/UberReaderComponents/VisualComponent';
import { AppSettings } from 'app/UberReaderData/AppSettings';

@Component({
    selector: 'app-footer',
    styleUrls: ['./AppFooter.css'],
    template: `
<footer class="app-footer-style mdl-mega-footer">
    <div class="mdl-mega-footer--top-section">
        <div class="mdl-mega-footer--left-section">
            <p class="mdl-typography--font-light mdl-color-text--white">Copyright © {{ currentFooterData.productName }} Pty Ltd 2006 - {{ yearUpdated }}. Site last updated {{ monthUpdated }} {{ yearUpdated }}.</p>
            <div>
                <a [href]="currentFooterData.home" externalLink class="footer-links">Home</a>
                <a [href]="currentFooterData.blog" externalLink class="footer-links">Blog</a>
                <a *ngIf="currentFooterData?.team?.length > 0" [href]="currentFooterData.team" externalLink class="footer-links">Team</a>
                <a [href]="currentFooterData.contact" externalLink class="footer-links">Contact</a>
                <a [href]="currentFooterData.help" externalLink class="footer-links">Help desk</a>
                <a [href]="currentFooterData.terms" externalLink class="footer-links">Terms of Service</a>                
            </div>
        </div>
        <div class="mdl-mega-footer--right-section">
            <a [href]="currentFooterData.facebook" externalLink><!-- Facebook --><img [src]="'assets/icon/fb.svg' | resourceLoc" style="float:left;border:none;width:50px;height:50px;"/></a>
            <a [href]="currentFooterData.twitter" externalLink><!-- Twitter --><img [src]="'assets/icon/twitter.svg' | resourceLoc" style="float:left;border:none;width:50px;height:50px;"/></a>
            <a [href]="currentFooterData.youtube" externalLink><!-- Youtube --><img [src]="'assets/icon/youtube.svg' | resourceLoc" style="float:left; border:none; width:50px;height:50px;"/></a>
            <a *ngIf="currentFooterData?.googlePlus?.length > 0" [href]="currentFooterData.googlePlus" externalLink><!-- Google Plus --><img [src]="'assets/icon/gplus.svg' | resourceLoc" style="float:left; border:none; width:50px;height:50px;"/></a>
        </div>
    </div>
</footer>
`
})

export class AppFooter extends VisualComponent
{
    private prepEdFooterData = {
        'productName': 'PrepEd',
        'home': 'https://www.preped.com',
        'blog': 'https://www.preped.com/blog',
        'team': 'https://www.preped.com/the-team',
        'contact': 'https://www.preped.com/contact',
        'help': 'https://helpdesk.ereflect.com',        
        'terms': 'https://www.preped.com/terms-and-conditions',
        'facebook': 'https://www.facebook.com/prepedapps/',
        'twitter': 'https://twitter.com/prepedapps',
        'youtube': 'https://www.youtube.com/c/Preped',
        'googlePlus' : ''
    };

    private typesyFooterData = {
        'productName': 'Typesy',
        'home': 'https://www.typesy.com',
        'blog': 'https://www.typesy.com/blog',
        'team': '',
        'contact': 'https://www.typesy.com/contact-us',
        'help': 'https://helpdesk.ereflect.com',
        'terms': 'https://www.typesy.com/terms-and-conditions',        
        'facebook': 'https://www.facebook.com/Typesy/',
        'twitter': 'https://twitter.com/TypesyApp/',
        'youtube': 'https://www.youtube.com/ereflect',
        'googlePlus' : 'https://plus.google.com/+Ultimatetyping'
    };

    public currentFooterData = this.prepEdFooterData;
    public monthUpdated: string;
    public yearUpdated: string;

    /*
    public homeLink: string;    
    public blogLink: string;
    public teamLink: string;
    public contactLink: string;
    public helpLink: string;
    public termsLink: string;
    public facebookLink: string;
    public twitterLink: string;
    public youtubeLink: string;
    public googlePlusLink: string;
    */

    private monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    ngOnInit() {
        let productId = AppSettings.CurrentProductId;
        let date: Date = new Date();

        this.monthUpdated = this.monthNames[date.getMonth()];
        this.yearUpdated = date.getFullYear() + "";

        switch (productId) {
            case AppSettings.PREP_ED:
                this.currentFooterData = this.prepEdFooterData;                
                break;
            case AppSettings.TYPESY:
                this.currentFooterData = this.typesyFooterData;                
                break;
        }

        /*
        this.homeLink = footerData.home;
        this.blogLink = footerData.blog;
        this.teamLink = footerData.team;
        this.contactLink = footerData.contact;
        this.helpLink = footerData.help;
        this.termsLink = footerData.terms;
        this.facebookLink = footerData.facebook;
        this.twitterLink = footerData.twitter;
        this.youtubeLink = footerData.youtube;
        this.googlePlusLink = footerData.googlePlus;
        */
    }
}