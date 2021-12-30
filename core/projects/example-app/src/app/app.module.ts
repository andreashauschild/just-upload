import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BasicChunkedUploadExampleComponent} from './examples/basic-chunked-upload-example/basic-chunked-upload-example.component';
import {BasicUploadExampleComponent} from './examples/basic-upload-example/basic-upload-example.component';
import {BasicMultipartExampleComponent} from './examples/basic-multipart-example/basic-multipart-example.component';
import {JustUploadModule} from 'just-upload';

@NgModule({
  declarations: [
    AppComponent,
    BasicChunkedUploadExampleComponent,
    BasicUploadExampleComponent,
    BasicMultipartExampleComponent,
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
