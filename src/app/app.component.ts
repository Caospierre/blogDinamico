import { Entrada } from '../models/entrada';
import { Component,ElementRef ,OnInit,HostListener  } from '@angular/core';
import { Location } from '@angular/common';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { throwServerError } from '@apollo/client/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status=false;
  verticalOffset=0;
  entradas : Entrada []=[];

  entradasx :Entrada[]=[
    {id:0,link:"0",title:"0",description:"0",status:false},
    {id:1,link:"1",title:"1",description:"0",status:false},
    {id:2,link:"2",title:"2",description:"0",status:false},
    {id:3,link:"3",title:"3",description:"0",status:false},
                      ]; 
  activeLink:String ='';
  temporlalink:String='';
  title = 'blogTest';
  loading = true;
  error: any;


  constructor(private location: Location ,private myElement: ElementRef,private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.subscribe<any>({
        query: gql`
        {

          Entrada {
            id
            link
            title
            description
            status
          }
        }
        `
      })
      .subscribe(
        ({ data}) => {
          this.entradas = data.Entrada ;
         // this.entradas=this.entradasx;

          console.log("**************");
          console.log(data.Entrada);
          this.activeLink="caso-furukawa"

        },
        error => {
          this.loading = false;
          this.error = error;

        }
      );
  }

 
  

  public readonly items: number[] = Array(100).fill(1).map((item, index) => item + index);

  public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
      console.log(target.scrollTo);
 //   console.log(target.id);

      if(visible &&this.status==false ){

          console.log("Entro"); 
          console.log(target.id);
          this.onSwitch(target.id);
          
       }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // do some stuff here when the window is scrolled
     this.verticalOffset = window.pageYOffset 
          || document.documentElement.scrollTop 
          || document.body.scrollTop || 0;
      console.log("move"+this.verticalOffset);

      
  } 

  onScrollTo(link:string) {

    try{
    this.myElement.nativeElement.ownerDocument.getElementById(link).scrollIntoView(); 
      this.status=true;
    this.onSwitch(link); 
        
     } catch (error) {
      console.error(error);

    }
 

  } 
  onSwitch(link:string){
    this.location.replaceState('/'+link);
    this.temporlalink=link;
    this.activeLink=this.temporlalink;
  }
 

}
