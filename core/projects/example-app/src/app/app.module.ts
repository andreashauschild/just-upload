import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BasicChunkedUploadExampleComponent} from './examples/basic-chunked-upload-example/basic-chunked-upload-example.component';
import {BasicUploadExampleComponent} from './examples/basic-upload-example/basic-upload-example.component';
import {BasicMultipartExampleComponent} from './examples/basic-multipart-example/basic-multipart-example.component';
import {JustUploadModule} from 'just-upload';
import { Documentation1Component } from './examples/documentation1/documentation1.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicChunkedUploadExampleComponent,
    BasicUploadExampleComponent,
    BasicMultipartExampleComponent,
    Documentation1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JustUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
