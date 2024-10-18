import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import {
  FileManagerComponent,
  NavigationPaneService,
  ToolbarService,
  DetailsViewService
} from "@syncfusion/ej2-angular-filemanager";
import { UploaderComponent } from "@syncfusion/ej2-angular-inputs";
/**
 * File Manager full functionalities sample
 */
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [NavigationPaneService, ToolbarService, DetailsViewService]
})
export class AppComponent {
  @ViewChild("file") file: FileManagerComponent;
  @ViewChild("defaultupload") uploadObj: UploaderComponent;
  public path: Object = {
    saveUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://ej2.syncfusion.com/services/api/uploadbox/Remove"
  };
  public ajaxSettings: object;
  public allowDrag: boolean = true;
  public view: string;
  public hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + "api/FileManager/FileOperations",
      getImageUrl: this.hostUrl + "api/FileManager/GetImage",
      uploadUrl: this.hostUrl + "api/FileManager/Upload",
      downloadUrl: this.hostUrl + "api/FileManager/Download"
    };
  }
  created(args) {}
  success(args) {
    (this.file as any).largeiconsviewModule.dragObj.dragArea =
      ".sample-container";
  }
  filedragStop(args) {
    if (args.event.target.closest(".e-upload") != null) {
      var fileDetails = args.fileDetails;
      var a = [];
      for (var i = 0; i < fileDetails.length; i++) {
        a.push({
          name: args.fileDetails[i].name,
          type: args.fileDetails[i].type,
          size: args.fileDetails[i].size
        });
      }
      this.uploadObj.files = a;
    }
  }
}
